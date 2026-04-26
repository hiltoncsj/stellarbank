import { Router } from 'express';
import { randomUUID } from 'crypto';
import { db } from '../db.js';
import { authMiddleware, type AuthRequest } from '../middleware/auth.js';
import { getXlmPrice, sendPayment } from '../../stellar/index.js';

const router = Router();
router.use(authMiddleware);

async function resolveRecipient(recipientAddress: string) {
  const normalizedRecipient = recipientAddress.trim();
  const directUser = await db.execute({
    sql: `
      SELECT id, name, email, phone, stellar_public_key
      FROM users
      WHERE lower(email) = lower(?)
         OR phone = ?
         OR stellar_public_key = ?
      LIMIT 1
    `,
    args: [normalizedRecipient, normalizedRecipient, normalizedRecipient],
  });

  if (directUser.rows[0]) return directUser.rows[0] as any;

  const keyUser = await db.execute({
    sql: `
      SELECT u.id, u.name, u.email, u.phone, u.stellar_public_key
      FROM payment_keys pk
      JOIN users u ON u.id = pk.user_id
      WHERE pk.key_value = ?
      LIMIT 1
    `,
    args: [normalizedRecipient],
  });

  return (keyUser.rows[0] as any) || null;
}

router.get('/', async (req: AuthRequest, res) => {
  const result = await db.execute({
    sql: 'SELECT * FROM transactions WHERE user_id = ? ORDER BY created_at DESC LIMIT 50',
    args: [req.userId!],
  });

  const formatted = result.rows.map((tx: any) => ({
    id: tx.id,
    type: tx.type,
    amount: Number(tx.amount),
    currency: tx.currency,
    counterparty: tx.counterparty,
    timestamp: new Date(tx.created_at as string).getTime(),
    status: tx.status,
    stellarTxHash: tx.stellar_tx_hash,
    usdPriceAtTime: tx.usd_price_at_time != null ? Number(tx.usd_price_at_time) : undefined,
  }));

  res.json(formatted);
});

router.post('/send', async (req: AuthRequest, res) => {
  const { amount, currency, recipientAddress, recipientName } = req.body;
  const numericAmount = Number(amount);
  const normalizedCurrency = String(currency || '').toUpperCase();
  const destination = String(recipientAddress || '').trim();

  if (!Number.isFinite(numericAmount) || numericAmount <= 0 || !normalizedCurrency || !destination) {
    res.status(400).json({ error: 'amount, currency e recipientAddress sao obrigatorios' });
    return;
  }

  const senderResult = await db.execute({ sql: 'SELECT * FROM users WHERE id = ?', args: [req.userId!] });
  const sender = senderResult.rows[0] as any;

  if (!sender) {
    res.status(404).json({ error: 'Usuario nao encontrado' });
    return;
  }

  let usdPriceAtTime: number | null = null;
  let balanceDebit = numericAmount;

  if (normalizedCurrency === 'XLM') {
    usdPriceAtTime = await getXlmPrice();
    if (usdPriceAtTime > 0) {
      balanceDebit = numericAmount * usdPriceAtTime;
    }
  }

  if (Number(sender.balance) < balanceDebit) {
    res.status(400).json({ error: 'Saldo insuficiente' });
    return;
  }

  const recipientUser = await resolveRecipient(destination);
  const isInternal = recipientUser && Number(recipientUser.id) !== Number(req.userId!);

  let stellarTxHash = '';
  let status = 'completed';

  if (!isInternal) {
    const looksLikeStellarKey = destination.startsWith('G');

    if (!looksLikeStellarKey) {
      res.status(404).json({ error: 'Destinatario nao encontrado' });
      return;
    }

    if (!sender.stellar_secret_key) {
      res.status(400).json({ error: 'Carteira Stellar do usuario nao possui chave privada para envio externo' });
      return;
    }

    try {
      const result = await sendPayment({
        sourceSecretKey: sender.stellar_secret_key as string,
        destinationPublicKey: destination,
        amount: numericAmount.toString(),
        asset: normalizedCurrency,
      });
      stellarTxHash = result.hash;
    } catch (err) {
      console.error('Stellar send failed:', err);
      status = 'failed';
      res.status(500).json({ error: 'Falha ao processar transacao na rede Stellar' });
      return;
    }
  }

  await db.execute({
    sql: 'UPDATE users SET balance = balance - ? WHERE id = ?',
    args: [balanceDebit, req.userId!],
  });

  const senderTxId = randomUUID();
  await db.execute({
    sql: `INSERT INTO transactions (id, user_id, type, amount, currency, counterparty, counterparty_address, stellar_tx_hash, status, usd_price_at_time)
          VALUES (?, ?, 'send', ?, ?, ?, ?, ?, ?, ?)`,
    args: [
      senderTxId,
      req.userId!,
      numericAmount,
      normalizedCurrency,
      recipientName || recipientUser?.name || destination,
      recipientUser?.stellar_public_key || destination,
      stellarTxHash,
      status,
      usdPriceAtTime,
    ],
  });

  if (isInternal) {
    const shouldCreditRecipientBalance = ['USDC', 'USDT', 'USD'].includes(normalizedCurrency);

    if (shouldCreditRecipientBalance) {
      await db.execute({
        sql: 'UPDATE users SET balance = balance + ? WHERE id = ?',
        args: [numericAmount, Number(recipientUser.id)],
      });
    }

    const receiveTxId = randomUUID();
    await db.execute({
      sql: `INSERT INTO transactions (id, user_id, type, amount, currency, counterparty, counterparty_address, stellar_tx_hash, status, usd_price_at_time)
            VALUES (?, ?, 'receive', ?, ?, ?, ?, ?, 'completed', ?)`,
      args: [
        receiveTxId,
        Number(recipientUser.id),
        numericAmount,
        normalizedCurrency,
        sender.name || sender.email,
        sender.stellar_public_key || '',
        stellarTxHash,
        usdPriceAtTime,
      ],
    });
  }

  res.json({
    id: senderTxId,
    type: 'send',
    amount: numericAmount,
    currency: normalizedCurrency,
    counterparty: recipientName || recipientUser?.name || destination,
    timestamp: Date.now(),
    status,
    stellarTxHash,
    usdPriceAtTime,
    internalTransfer: Boolean(isInternal),
  });
});

export default router;

import { useState, useEffect, useCallback } from 'react';
import {
  Users, ArrowUpDown, DollarSign, Activity,
  LogOut, RefreshCw, ExternalLink, ChevronDown, ChevronUp,
  Send, X, Check, AlertCircle, Wallet, Database,
} from 'lucide-react';

interface Stats {
  totalUsers: number;
  totalBalance: number;
  totalTransactions: number;
  totalVolume: number;
}

interface AdminUser {
  id: number;
  name: string;
  email: string;
  phone: string;
  balance: number;
  currency: string;
  stellarPublicKey: string;
  createdAt: string;
}

interface AdminTx {
  id: string;
  userId: number;
  userName: string;
  userEmail: string;
  type: string;
  amount: number;
  currency: string;
  counterparty: string;
  counterpartyAddress: string;
  stellarTxHash: string;
  status: string;
  createdAt: string;
}

interface MasterBalance {
  publicKey: string | null;
  balances: { assetCode: string; balance: string }[];
  error?: string;
}

interface CreditForm {
  userId: number;
  userName: string;
  amount: string;
  asset: string;
  onChain: boolean;
}

interface DbSchemaResponse {
  tables: string[];
  schema: Record<string, Array<{ name: string; type: string }>>;
}

const STELLAR_EXPLORER_TESTNET = 'https://stellar.expert/explorer/testnet';

function fmt(n: number) {
  return n.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}
function fmtDate(s: string) {
  return new Date(s).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' });
}
function shortKey(key: string) {
  if (!key) return '-';
  return key.slice(0, 6) + '...' + key.slice(-6);
}

interface Props {
  token: string;
  onLogout: () => void;
}

export default function AdminDashboard({ token, onLogout }: Props) {
  const [stats, setStats] = useState<Stats | null>(null);
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [txs, setTxs] = useState<AdminTx[]>([]);
  const [masterBalance, setMasterBalance] = useState<MasterBalance | null>(null);
  const [loading, setLoading] = useState(true);
  const [tab, setTab] = useState<'users' | 'transactions' | 'database'>('users');
  const [creditForm, setCreditForm] = useState<CreditForm | null>(null);
  const [creditLoading, setCreditLoading] = useState(false);
  const [creditResult, setCreditResult] = useState<{ ok: boolean; message: string } | null>(null);
  const [expandedUser, setExpandedUser] = useState<number | null>(null);
  const [dbSchema, setDbSchema] = useState<DbSchemaResponse | null>(null);
  const [dbSql, setDbSql] = useState('SELECT id, name, email, balance, currency FROM users ORDER BY id DESC LIMIT 20');
  const [dbLoading, setDbLoading] = useState(false);
  const [dbError, setDbError] = useState('');
  const [dbResultRows, setDbResultRows] = useState<Record<string, any>[]>([]);
  const [dbRowsAffected, setDbRowsAffected] = useState<number | null>(null);

  const headers = { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };

  const load = useCallback(async (showSpinner = true) => {
    if (showSpinner) setLoading(true);
    try {
      const [sRes, uRes, tRes, mbRes, schemaRes] = await Promise.all([
        fetch('/api/admin/stats', { headers }),
        fetch('/api/admin/users', { headers }),
        fetch('/api/admin/transactions', { headers }),
        fetch('/api/admin/master-balance', { headers }),
        fetch('/api/admin/db/schema', { headers }),
      ]);
      if (sRes.status === 401 || uRes.status === 401) { onLogout(); return; }
      setStats(await sRes.json());
      setUsers(await uRes.json());
      setTxs(await tRes.json());
      setMasterBalance(await mbRes.json());
      setDbSchema(await schemaRes.json());
    } finally {
      if (showSpinner) setLoading(false);
    }
  }, [token, onLogout]);

  useEffect(() => {
    load();
    const intervalId = window.setInterval(() => {
      load(false);
    }, 5000);
    return () => window.clearInterval(intervalId);
  }, [load]);

  const runDbQuery = async () => {
    setDbLoading(true);
    setDbError('');
    try {
      const res = await fetch('/api/admin/db/query', {
        method: 'POST',
        headers,
        body: JSON.stringify({ sql: dbSql }),
      });
      const data = await res.json();
      if (!res.ok) {
        setDbError(data.error || 'Falha ao executar SQL');
        return;
      }
      setDbResultRows(data.rows || []);
      setDbRowsAffected(data.rowsAffected ?? null);
      await load();
    } finally {
      setDbLoading(false);
    }
  };

  const handleCredit = async () => {
    if (!creditForm || !creditForm.amount || Number(creditForm.amount) <= 0) return;
    setCreditLoading(true);
    setCreditResult(null);
    try {
      const res = await fetch('/api/admin/credit', {
        method: 'POST',
        headers,
        body: JSON.stringify({
          userId: creditForm.userId,
          amount: Number(creditForm.amount),
          asset: creditForm.asset,
          onChain: creditForm.onChain,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setCreditResult({ ok: true, message: data.message });
        await load();
        setTimeout(() => { setCreditForm(null); setCreditResult(null); }, 2500);
      } else {
        setCreditResult({ ok: false, message: data.error });
      }
    } catch {
      setCreditResult({ ok: false, message: 'Erro de conexao' });
    } finally {
      setCreditLoading(false);
    }
  };

  const STAT_CARDS = stats ? [
    { label: 'Usuarios', value: stats.totalUsers.toString(), icon: Users, color: 'text-blue-400', bg: 'rgba(59,130,246,0.12)' },
    { label: 'Saldo Total', value: `$${fmt(stats.totalBalance)}`, icon: DollarSign, color: 'text-emerald-400', bg: 'rgba(52,211,153,0.12)' },
    { label: 'Transacoes', value: stats.totalTransactions.toString(), icon: Activity, color: 'text-purple-400', bg: 'rgba(167,139,250,0.12)' },
    { label: 'Volume Total', value: `$${fmt(stats.totalVolume)}`, icon: ArrowUpDown, color: 'text-orange-400', bg: 'rgba(251,146,60,0.12)' },
  ] : [];

  const txTypeLabel: Record<string, string> = {
    send: 'Envio', receive: 'Recebimento', deposit: 'Deposito', withdraw: 'Saque',
  };
  const txStatusColor: Record<string, string> = {
    completed: 'text-emerald-400', pending: 'text-yellow-400', failed: 'text-red-400',
  };

  const dbColumns = dbResultRows[0] ? Object.keys(dbResultRows[0]) : [];

  return (
    <div className="min-h-screen bg-app text-white">
      <header className="border-b px-6 py-4 flex items-center justify-between sticky top-0 z-40"
        style={{ background: 'rgba(12,15,26,0.95)', borderColor: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)' }}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(59,130,246,0.2)' }}>
            <DollarSign className="text-blue-400 w-4 h-4" />
          </div>
          <span className="font-bold text-white">DolarPix</span>
          <span className="text-white/30 text-sm font-medium">/ Admin</span>
        </div>
        <div className="flex items-center gap-3">
          <button onClick={load} disabled={loading}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-white/50 hover:text-white transition-colors text-sm"
            style={{ background: 'rgba(255,255,255,0.05)' }}>
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
            Atualizar
          </button>
          <button onClick={onLogout}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg text-red-400 hover:text-red-300 transition-colors text-sm"
            style={{ background: 'rgba(239,68,68,0.08)' }}>
            <LogOut size={14} />
            Sair
          </button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {loading
            ? Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="rounded-2xl p-5 animate-pulse" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="h-4 rounded w-1/2 mb-3 bg-white/10" />
                <div className="h-8 rounded w-3/4 bg-white/10" />
              </div>
            ))
            : STAT_CARDS.map((c) => (
              <div key={c.label} className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
                <div className="flex items-center justify-between mb-3">
                  <p className="text-white/50 text-xs font-bold uppercase tracking-widest">{c.label}</p>
                  <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: c.bg }}>
                    <c.icon size={16} className={c.color} />
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{c.value}</p>
              </div>
            ))}
        </div>

        <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(167,139,250,0.15)' }}>
                <Wallet size={14} className="text-purple-400" />
              </div>
              <p className="text-sm font-bold text-white/80">Conta Master (Stellar)</p>
            </div>
            {masterBalance?.publicKey && (
              <a href={`${STELLAR_EXPLORER_TESTNET}/account/${masterBalance.publicKey}`} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs text-white/30 hover:text-blue-400 transition-colors font-mono">
                {shortKey(masterBalance.publicKey)}
                <ExternalLink size={11} />
              </a>
            )}
          </div>

          {loading ? (
            <div className="flex gap-4">
              {[1, 2].map((i) => <div key={i} className="h-8 w-32 rounded-lg bg-white/10 animate-pulse" />)}
            </div>
          ) : masterBalance?.error ? (
            <div className="flex items-center gap-2 text-sm text-yellow-400/80">
              <AlertCircle size={15} />
              <span>{masterBalance.error}</span>
            </div>
          ) : masterBalance?.balances.length === 0 ? (
            <p className="text-white/30 text-sm">Sem saldo ou conta nao encontrada na rede</p>
          ) : (
            <div className="flex flex-wrap gap-3">
              {masterBalance?.balances.map((b) => (
                <div key={b.assetCode} className="flex items-center gap-2 px-4 py-2 rounded-xl" style={{ background: 'rgba(167,139,250,0.08)', border: '1px solid rgba(167,139,250,0.20)' }}>
                  <span className="text-[10px] font-bold text-purple-300/70 uppercase tracking-widest">{b.assetCode}</span>
                  <span className="text-lg font-bold text-white">{parseFloat(b.balance).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 7 })}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="flex gap-2 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
          {(['users', 'transactions', 'database'] as const).map((t) => (
            <button key={t} onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-bold transition-colors border-b-2 -mb-px ${tab === t ? 'text-blue-400 border-blue-400' : 'text-white/40 border-transparent hover:text-white/70'}`}>
              {t === 'users' ? `Usuarios (${users.length})` : t === 'transactions' ? `Transacoes (${txs.length})` : 'DB Editor'}
            </button>
          ))}
        </div>

        {tab === 'users' && (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {loading ? (
              <div className="p-8 text-center text-white/30">Carregando...</div>
            ) : users.length === 0 ? (
              <div className="p-12 text-center text-white/30">
                <Users size={32} className="mx-auto mb-3 opacity-40" />
                <p>Nenhum usuario cadastrado ainda</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-12 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="col-span-3">Nome / Email</span>
                  <span className="col-span-2">Saldo</span>
                  <span className="col-span-4">Carteira Stellar</span>
                  <span className="col-span-2">Cadastro</span>
                  <span className="col-span-1 text-right">Acao</span>
                </div>

                {users.map((u) => (
                  <div key={u.id} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="grid grid-cols-12 px-5 py-4 items-center hover:bg-white/[0.02] transition-colors">
                      <div className="col-span-3 min-w-0">
                        <p className="font-semibold text-white text-sm truncate">{u.name}</p>
                        <p className="text-white/40 text-xs truncate">{u.email}</p>
                      </div>
                      <div className="col-span-2">
                        <p className="font-bold text-emerald-400 text-sm">${fmt(u.balance)}</p>
                        <p className="text-white/30 text-[10px] uppercase">{u.currency}</p>
                      </div>
                      <div className="col-span-4">
                        {u.stellarPublicKey ? (
                          <div className="flex items-center gap-2">
                            <code className="text-white/50 text-xs font-mono">{shortKey(u.stellarPublicKey)}</code>
                            <a href={`${STELLAR_EXPLORER_TESTNET}/account/${u.stellarPublicKey}`} target="_blank" rel="noreferrer" className="text-white/20 hover:text-blue-400 transition-colors">
                              <ExternalLink size={12} />
                            </a>
                          </div>
                        ) : (
                          <span className="text-white/20 text-xs">Sem carteira</span>
                        )}
                      </div>
                      <div className="col-span-2">
                        <p className="text-white/40 text-xs">{fmtDate(u.createdAt)}</p>
                      </div>
                      <div className="col-span-1 flex justify-end">
                        <button
                          onClick={() => setExpandedUser(expandedUser === u.id ? null : u.id)}
                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-blue-400 text-xs font-bold transition-colors hover:bg-blue-400/10"
                          style={{ border: '1px solid rgba(59,130,246,0.25)' }}
                        >
                          <Send size={12} />
                          {expandedUser === u.id ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                        </button>
                      </div>
                    </div>

                    {expandedUser === u.id && (
                      <div className="px-5 pb-5" style={{ background: 'rgba(59,130,246,0.04)', borderTop: '1px solid rgba(59,130,246,0.12)' }}>
                        <p className="text-xs font-bold text-blue-400 uppercase tracking-widest mb-4 pt-4">Creditar para {u.name}</p>

                        {creditResult ? (
                          <div className={`flex items-center gap-3 p-4 rounded-xl text-sm font-medium ${creditResult.ok ? 'text-emerald-400' : 'text-red-400'}`} style={{ background: creditResult.ok ? 'rgba(52,211,153,0.08)' : 'rgba(239,68,68,0.08)' }}>
                            {creditResult.ok ? <Check size={18} /> : <AlertCircle size={18} />}
                            {creditResult.message}
                          </div>
                        ) : (
                          <div className="flex flex-wrap gap-3 items-end">
                            <div className="space-y-1.5">
                              <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Valor</label>
                              <input
                                type="number"
                                placeholder="0.00"
                                min="0.01"
                                step="0.01"
                                className="w-32 h-10 px-3 rounded-xl text-white text-sm font-mono outline-none"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                                value={creditForm?.userId === u.id ? creditForm.amount : ''}
                                onChange={(e) => setCreditForm({ userId: u.id, userName: u.name, amount: e.target.value, asset: creditForm?.userId === u.id ? creditForm.asset : 'XLM', onChain: creditForm?.userId === u.id ? creditForm.onChain : false })}
                              />
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Ativo</label>
                              <select
                                className="h-10 px-3 rounded-xl text-white text-sm outline-none"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                                value={creditForm?.userId === u.id ? creditForm.asset : 'XLM'}
                                onChange={(e) => setCreditForm((f) => f ? { ...f, asset: e.target.value } : { userId: u.id, userName: u.name, amount: '', asset: e.target.value, onChain: false })}
                              >
                                <option value="XLM">XLM</option>
                                <option value="USDC">USDC</option>
                                <option value="USDT">USDT</option>
                              </select>
                            </div>

                            <div className="space-y-1.5">
                              <label className="text-[10px] text-white/40 font-bold uppercase tracking-widest">Modo</label>
                              <select
                                className="h-10 px-3 rounded-xl text-white text-sm outline-none"
                                style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.15)' }}
                                value={creditForm?.userId === u.id && creditForm.onChain ? 'onchain' : 'offchain'}
                                onChange={(e) => setCreditForm((f) => f ? { ...f, onChain: e.target.value === 'onchain' } : { userId: u.id, userName: u.name, amount: '', asset: 'XLM', onChain: e.target.value === 'onchain' })}
                              >
                                <option value="offchain">Off-chain</option>
                                <option value="onchain">On-chain</option>
                              </select>
                            </div>

                            <button disabled={creditLoading || !creditForm?.amount || Number(creditForm?.amount) <= 0} onClick={handleCredit} className="h-10 px-5 rounded-xl font-bold text-sm text-white flex items-center gap-2 disabled:opacity-40 transition-opacity" style={{ background: '#3b82f6' }}>
                              {creditLoading ? <RefreshCw size={14} className="animate-spin" /> : <Send size={14} />}
                              Creditar
                            </button>

                            <button onClick={() => { setExpandedUser(null); setCreditForm(null); }} className="h-10 px-3 rounded-xl text-white/30 hover:text-white/60 transition-colors">
                              <X size={18} />
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'transactions' && (
          <div className="rounded-2xl overflow-hidden" style={{ border: '1px solid rgba(255,255,255,0.08)' }}>
            {loading ? (
              <div className="p-8 text-center text-white/30">Carregando...</div>
            ) : txs.length === 0 ? (
              <div className="p-12 text-center text-white/30">
                <Activity size={32} className="mx-auto mb-3 opacity-40" />
                <p>Nenhuma transacao registrada</p>
              </div>
            ) : (
              <div>
                <div className="grid grid-cols-12 px-5 py-3 text-[10px] font-bold uppercase tracking-widest text-white/30" style={{ background: 'rgba(255,255,255,0.03)' }}>
                  <span className="col-span-2">Data</span>
                  <span className="col-span-2">Usuario</span>
                  <span className="col-span-1">Tipo</span>
                  <span className="col-span-2">Valor</span>
                  <span className="col-span-3">Para / De</span>
                  <span className="col-span-1">Hash</span>
                  <span className="col-span-1 text-right">Status</span>
                </div>

                {txs.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-12 px-5 py-3.5 items-center hover:bg-white/[0.02] transition-colors text-sm" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                    <div className="col-span-2">
                      <p className="text-white/50 text-xs">{fmtDate(tx.createdAt)}</p>
                    </div>
                    <div className="col-span-2 min-w-0">
                      <p className="text-white text-xs font-medium truncate">{tx.userName}</p>
                      <p className="text-white/30 text-[10px] truncate">{tx.userEmail}</p>
                    </div>
                    <div className="col-span-1">
                      <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded-full ${tx.type === 'receive' || tx.type === 'deposit' ? 'text-emerald-400 bg-emerald-400/10' : 'text-orange-400 bg-orange-400/10'}`}>
                        {txTypeLabel[tx.type] || tx.type}
                      </span>
                    </div>
                    <div className="col-span-2">
                      <p className="font-bold text-white">${fmt(tx.amount)}</p>
                      <p className="text-white/30 text-[10px] uppercase">{tx.currency}</p>
                    </div>
                    <div className="col-span-3 min-w-0">
                      <p className="text-white/60 text-xs truncate">{tx.counterparty}</p>
                      {tx.counterpartyAddress && <p className="text-white/25 text-[10px] font-mono truncate">{shortKey(tx.counterpartyAddress)}</p>}
                    </div>
                    <div className="col-span-1">
                      {tx.stellarTxHash ? (
                        <a href={`${STELLAR_EXPLORER_TESTNET}/tx/${tx.stellarTxHash}`} target="_blank" rel="noreferrer" className="text-blue-400/60 hover:text-blue-400 transition-colors text-[10px] font-mono flex items-center gap-1">
                          {tx.stellarTxHash.slice(0, 6)}...
                          <ExternalLink size={10} />
                        </a>
                      ) : (
                        <span className="text-white/15 text-xs">-</span>
                      )}
                    </div>
                    <div className="col-span-1 text-right">
                      <span className={`text-[10px] font-bold uppercase ${txStatusColor[tx.status] || 'text-white/40'}`}>{tx.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {tab === 'database' && (
          <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center gap-2 mb-4">
                <Database size={16} className="text-blue-400" />
                <h3 className="font-bold">Schema</h3>
              </div>
              <div className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
                {dbSchema?.tables.map((table) => (
                  <div key={table} className="rounded-xl border border-white/8 bg-white/[0.02] p-3">
                    <button onClick={() => setDbSql(`SELECT * FROM ${table} LIMIT 50`)} className="text-sm font-bold text-blue-300 hover:text-blue-200">
                      {table}
                    </button>
                    <div className="mt-2 space-y-1">
                      {(dbSchema.schema[table] || []).map((column: any) => (
                        <p key={column.name} className="text-[11px] text-white/45 font-mono">
                          {column.name} <span className="text-white/20">{column.type}</span>
                        </p>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl p-5" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div>
                  <h3 className="font-bold">DB Editor</h3>
                  <p className="text-sm text-white/40">Execute uma instrução SQL por vez. Use com cuidado.</p>
                </div>
                <button onClick={runDbQuery} disabled={dbLoading} className="h-10 px-4 rounded-xl font-bold text-sm text-white disabled:opacity-50" style={{ background: '#3b82f6' }}>
                  {dbLoading ? 'Executando...' : 'Rodar SQL'}
                </button>
              </div>

              <textarea
                value={dbSql}
                onChange={(e) => setDbSql(e.target.value)}
                className="w-full min-h-[140px] rounded-2xl bg-[#0b1220] border border-white/10 p-4 text-sm font-mono text-white outline-none"
              />

              {dbError && (
                <div className="mt-4 rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-sm text-red-300">
                  {dbError}
                </div>
              )}

              {dbRowsAffected !== null && (
                <p className="mt-4 text-sm text-white/50">Linhas afetadas: {dbRowsAffected}</p>
              )}

              <div className="mt-4 overflow-auto rounded-2xl border border-white/8">
                {dbResultRows.length === 0 ? (
                  <div className="p-6 text-sm text-white/30">Sem linhas para mostrar.</div>
                ) : (
                  <table className="min-w-full text-sm">
                    <thead style={{ background: 'rgba(255,255,255,0.03)' }}>
                      <tr>
                        {dbColumns.map((column) => (
                          <th key={column} className="px-3 py-2 text-left text-[10px] uppercase tracking-widest text-white/40">{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {dbResultRows.map((row, index) => (
                        <tr key={index} style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
                          {dbColumns.map((column) => (
                            <td key={column} className="px-3 py-2 text-white/80 align-top whitespace-pre-wrap">
                              {row[column] == null ? <span className="text-white/20">null</span> : String(row[column])}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Copy, Share2, Check, Download, Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface ReceiveProps {
  user: {
    email: string;
    phone: string;
  };
}

const CURRENCIES = [
  { id: 'QUALQUER', name: 'Qualquer Moeda', icon: null },
  { id: 'USDC', name: 'USD Coin', icon: 'https://cryptologos.cc/logos/usd-coin-usdc-logo.png' },
  { id: 'USDT', name: 'Tether', icon: 'https://cryptologos.cc/logos/tether-usdt-logo.png' },
];

export default function Receive({ user }: ReceiveProps) {
  const [amount, setAmount] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState(CURRENCIES[0]);
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(user.email);
    setCopied(true);
    toast.success('Chave ID copiada!');
    setTimeout(() => setCopied(false), 2000);
  };

  const qrValue = `stellar-pix:${user.email}${amount ? `?amount=${amount}` : ''}${selectedCurrency.id !== 'QUALQUER' ? `&currency=${selectedCurrency.id}` : ''}`;

  return (
    <div className="flex h-full flex-col overflow-y-auto px-4 pb-12 pt-8 no-scrollbar sm:px-6 md:max-w-2xl md:mx-auto">
      <header className="mb-8">
        <h1 className="mb-2 text-2xl font-bold text-white">Receber</h1>
        <p className="text-sm text-zinc-500">
          Mostre o QR Code ou compartilhe sua Chave ID para receber pagamentos na hora.
        </p>
      </header>

      <div className="glass flex flex-col items-center gap-4 rounded-3xl border border-white/10 p-4 sm:p-6">
        <div className="flex w-full justify-center">
          <div className="aspect-square w-full max-w-[240px] rounded-2xl border border-white/10 bg-white p-3">
            <QRCodeSVG
              value={qrValue}
              size={210}
              level="H"
              includeMargin={false}
              className="h-full w-full"
            />
          </div>
        </div>

        <div className="w-full space-y-1 text-center">
          <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Sua Chave ID</p>
          <p className="break-all text-sm font-semibold text-zinc-100 sm:text-lg">{user.email}</p>
          {selectedCurrency.id !== 'QUALQUER' && (
            <Badge variant="secondary" className="mt-2 border-none bg-primary/15 text-primary">
              Somente {selectedCurrency.id}
            </Badge>
          )}
        </div>

        <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-2">
          <Button
            variant="outline"
            className="h-11 gap-2 rounded-xl border-white/15 bg-white/5 text-sm text-zinc-100 hover:bg-white/10"
            onClick={handleCopy}
          >
            {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
            {copied ? 'Copiado' : 'Copiar Chave'}
          </Button>
          <Button
            variant="outline"
            className="h-11 gap-2 rounded-xl border-white/15 bg-white/5 text-sm text-zinc-100 hover:bg-white/10"
          >
            <Share2 size={16} />
            Compartilhar
          </Button>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Limitar moeda (opcional)</h2>
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {CURRENCIES.map((curr) => (
              <button
                key={curr.id}
                type="button"
                onClick={() => setSelectedCurrency(curr)}
                className={cn(
                  'flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border-2 px-4 py-2 text-xs font-bold transition-all',
                  selectedCurrency.id === curr.id
                    ? 'border-primary bg-primary/15 text-primary'
                    : 'border-white/10 bg-white/5 text-zinc-400 hover:border-white/20 hover:text-zinc-200'
                )}
              >
                {curr.icon ? (
                  <img src={curr.icon} alt={curr.id} className="h-4 w-4 object-contain" referrerPolicy="no-referrer" />
                ) : (
                  <Coins size={14} />
                )}
                <span>{curr.name}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold uppercase tracking-wider text-zinc-500">Solicitar valor específico</h2>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 font-bold text-zinc-500">$</span>
            <Input
              type="number"
              placeholder="0.00"
              className="h-14 rounded-2xl border-white/15 bg-white/8 pl-8 text-lg font-bold text-white placeholder:text-zinc-600 focus-visible:ring-primary"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          {amount && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="px-1 text-xs font-medium text-zinc-500"
            >
              QR Code atualizado para receber exatamente ${amount}
            </motion.p>
          )}
        </div>

        <div className="mt-auto pt-8">
          <div className="flex items-start gap-3 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-300">
              <Download size={18} />
            </div>
            <div className="space-y-1">
              <p className="text-sm font-bold text-emerald-200">Recebimento sem taxa oculta</p>
              <p className="text-xs text-emerald-200/75">Você não paga para receber. O valor é o que aparece para quem paga.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

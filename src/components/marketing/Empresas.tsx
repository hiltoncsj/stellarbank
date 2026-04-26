import { motion } from 'motion/react';
import {
  ArrowRight, Check, Link2, QrCode, Wifi, Globe, BarChart3,
  Zap, Shield, Terminal, Webhook, Package, Clock, TrendingUp,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  onSignup: () => void;
  onGoTo: (page: string) => void;
}

const payMethods = [
  { icon: Link2,    title: 'Links de pagamento',    body: 'Gere um link em segundos e mande por qualquer canal — WhatsApp, e-mail, chat.' },
  { icon: QrCode,   title: 'QR Code de cobrança',   body: 'Imprima ou mostre na tela. O cliente escaneia e o valor entra na hora.' },
  { icon: Wifi,     title: 'Cobrança por aproximação', body: 'Terminal NFC físico ou via celular. Sem maquininha tradicional necessária.' },
  { icon: Globe,    title: 'Clientes no mundo todo', body: 'Aceite de qualquer país como se fosse local. Conversão automática, sem taxa Swift.' },
  { icon: Terminal, title: 'API / Gateway',           body: 'Integre ao seu e-commerce, ERP ou app em minutos via API REST documentada.' },
  { icon: Package,  title: 'Planos e assinaturas',   body: 'Cobre recorrência automática sem precisar lembrar o cliente todo mês.' },
];

const dashStats = [
  { label: 'Receita hoje', value: '$ 3.847,00', delta: '+18%', up: true },
  { label: 'Transações',   value: '127',         delta: '+24%', up: true },
  { label: 'Conversão',    value: '98,4%',       delta: '+2%',  up: true },
  { label: 'Ticket médio', value: '$ 30,30',     delta: '-4%',  up: false },
];

const advantages = [
  { icon: Clock,       title: 'Receba no ato da venda',    body: 'Sem D+2, D+14 ou prazo nenhum. O valor cai na sua carteira no mesmo instante em que o cliente confirma.' },
  { icon: Shield,      title: 'Zero chargebacks',          body: 'Transação confirmada, não tem volta. Elimine fraudes e disputas que corroem sua margem.' },
  { icon: TrendingUp,  title: 'Alcance global instantâneo',body: 'Clientes no exterior pagam em dólar digital. Você recebe como se estivessem aqui do lado.' },
  { icon: Zap,         title: 'Taxas mínimas',             body: 'Sem intermediários bancários no caminho. A economia vai direto para o seu caixa.' },
];

const plans = [
  {
    name: 'Gratuito',
    price: '$0',
    period: 'para sempre',
    features: ['Até 50 transações/mês', 'QR Code e link de pagamento', 'Dashboard básico', 'Suporte por e-mail'],
    cta: 'Começar grátis',
    highlight: false,
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/mês',
    features: ['Transações ilimitadas', 'Cobrança por aproximação (NFC)', 'Analytics em tempo real', 'Acesso à API', 'Planos e assinaturas', 'Suporte prioritário'],
    cta: 'Testar 14 dias grátis',
    highlight: true,
  },
  {
    name: 'Enterprise',
    price: 'Sob consulta',
    period: '',
    features: ['Tudo do Pro', 'SLA 99,9%', 'Onboarding dedicado', 'Webhook personalizado', 'White-label disponível', 'Gerente de conta'],
    cta: 'Falar com vendas',
    highlight: false,
  },
];

export default function Empresas({ onSignup, onGoTo }: Props) {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-indigo-600/10 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />

        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-400/8 px-3 py-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-400">Para empresas e lojistas</span>
            </div>
            <h1 className="mx-auto mb-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.25rem]">
              Receba de clientes do{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                mundo inteiro
              </span>{' '}
              em tempo real
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg leading-relaxed text-zinc-400">
              Dashboard completo, múltiplos métodos de cobrança, gateway de pagamentos e relatórios em tempo real. Sem prazo, sem taxa oculta, sem burocracia bancária.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={onSignup}
                className="flex items-center gap-2 rounded-xl bg-indigo-500 px-8 py-4 text-base font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] transition-all hover:brightness-110 active:scale-95"
              >
                Criar conta grátis <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={() => onGoTo('api')}
                className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10"
              >
                Ver documentação da API
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Dashboard mockup ─────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">Tudo que seu negócio precisa, em um lugar</h2>
            <p className="text-zinc-500">Dashboard em tempo real, sem precisar abrir o banco.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900/80 shadow-2xl"
          >
            {/* Fake titlebar */}
            <div className="flex items-center gap-2 border-b border-white/5 bg-slate-950/60 px-5 py-3">
              {['bg-red-500/50','bg-yellow-500/50','bg-emerald-500/50'].map(c=>(
                <div key={c} className={cn('h-3 w-3 rounded-full',c)} />
              ))}
              <span className="ml-3 text-xs text-zinc-500">Stellix — Dashboard</span>
              <span className="ml-auto flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                Ao vivo
              </span>
            </div>
            <div className="p-6 md:p-8">
              {/* Stats row */}
              <div className="mb-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
                {dashStats.map(s => (
                  <div key={s.label} className="rounded-xl border border-white/5 bg-white/[0.04] p-5">
                    <p className="mb-1 text-[11px] text-zinc-500">{s.label}</p>
                    <p className="mb-1 text-2xl font-bold text-white">{s.value}</p>
                    <p className={cn('text-[11px] font-bold', s.up ? 'text-emerald-400' : 'text-rose-400')}>
                      {s.up ? '↑' : '↓'} {s.delta} vs ontem
                    </p>
                  </div>
                ))}
              </div>
              {/* Chart bar placeholder */}
              <div className="mb-6 rounded-xl border border-white/5 bg-white/[0.03] p-5">
                <p className="mb-4 text-sm font-semibold text-zinc-400">Receita — últimas 7 horas</p>
                <div className="flex h-24 items-end gap-1.5">
                  {[35,58,42,80,65,92,78,55,100,87,60,45,70,85].map((h,i) => (
                    <div key={i} className="flex-1 rounded-t-sm bg-indigo-500/40 transition-all hover:bg-indigo-400/60" style={{height:`${h}%`}} />
                  ))}
                </div>
              </div>
              {/* Quick actions */}
              <div className="flex flex-wrap gap-3">
                {['Gerar link','Criar QR','Ver relatório','Nova cobrança'].map(a=>(
                  <button key={a} className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-zinc-300 transition-colors hover:bg-white/10 hover:text-white">{a}</button>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Métodos de cobrança ──────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-xl">
            <h2 className="mb-3 text-3xl font-bold text-white">Aceite do jeito que o cliente prefere</h2>
            <p className="text-zinc-400">Seis formas de receber, todas na mesma plataforma.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {payMethods.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                className="group rounded-2xl border border-white/8 bg-white/[0.03] p-6 transition-all hover:border-indigo-400/30 hover:bg-white/[0.06]"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 transition-transform group-hover:scale-110">
                  <m.icon className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-bold text-white">{m.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{m.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Vantagens ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">Por que lojistas escolhem a Stellix</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {advantages.map((a, i) => (
              <motion.div
                key={a.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                  <a.icon className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-bold text-white">{a.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{a.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── API teaser ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-12 rounded-3xl border border-white/10 bg-slate-900/60 p-8 md:flex-row md:p-12">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                <Terminal className="h-3 w-3" /> API & Webhooks
              </div>
              <h2 className="mb-4 text-2xl font-bold text-white">Integre ao seu sistema em minutos</h2>
              <p className="mb-6 leading-relaxed text-zinc-400">
                API REST com SDKs para JavaScript, Python e PHP. Receba webhooks em tempo real, crie cobranças programaticamente e automatize seu fluxo de caixa.
              </p>
              <button
                onClick={() => onGoTo('api')}
                className="flex items-center gap-2 rounded-xl border border-cyan-400/30 px-6 py-3 text-sm font-bold text-cyan-400 transition-all hover:bg-cyan-400/10"
              >
                Ver documentação completa <ArrowRight className="h-4 w-4" />
              </button>
            </div>
            <div className="w-full overflow-hidden rounded-xl border border-white/10 bg-[#0a0e19] p-5 font-mono text-sm md:w-96">
              <div className="mb-3 flex gap-1.5">
                {['bg-red-500/50','bg-yellow-500/50','bg-emerald-500/50'].map(c=><div key={c} className={cn('h-2.5 w-2.5 rounded-full',c)} />)}
              </div>
              <pre className="overflow-x-auto text-cyan-300 text-[13px] leading-relaxed">
{`const stellix = new Stellix('sk_live_...');

const charge = await stellix.charges.create({
  amount: 4990,       // em centavos
  currency: 'USD',
  description: 'Plano Pro - Jan/2025',
  methods: ['qrcode', 'link'],
});

// Webhook instantâneo na confirmação
// charge.payment_url → compartilhe!`}
              </pre>
            </div>
          </div>
        </div>
      </section>

      {/* ── Planos ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">Planos e preços</h2>
            <p className="text-zinc-500">Comece grátis. Escale quando precisar.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  'relative flex flex-col rounded-2xl border p-8',
                  p.highlight
                    ? 'border-indigo-500/50 bg-indigo-950/40 shadow-[0_0_40px_rgba(99,102,241,0.15)]'
                    : 'border-white/8 bg-white/[0.03]'
                )}
              >
                {p.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border border-indigo-400/40 bg-indigo-500 px-4 py-1 text-xs font-bold text-white">
                    Mais popular
                  </div>
                )}
                <p className="mb-2 text-sm font-bold uppercase tracking-widest text-zinc-500">{p.name}</p>
                <div className="mb-6">
                  <span className="text-4xl font-black text-white">{p.price}</span>
                  {p.period && <span className="ml-1 text-zinc-500">{p.period}</span>}
                </div>
                <ul className="mb-8 flex-1 space-y-3">
                  {p.features.map(f => (
                    <li key={f} className="flex items-center gap-2.5 text-sm text-zinc-300">
                      <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={onSignup}
                  className={cn(
                    'w-full rounded-xl py-3 text-sm font-bold transition-all active:scale-95',
                    p.highlight
                      ? 'bg-indigo-500 text-white hover:bg-indigo-400'
                      : 'border border-white/15 bg-white/5 text-white hover:bg-white/10'
                  )}
                >
                  {p.cta}
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

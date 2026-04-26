import { motion } from 'motion/react';
import { Terminal, Zap, Webhook, Globe, Shield, ArrowRight, Check, Copy } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props { onSignup: () => void; }

const endpoints = [
  { method: 'POST', path: '/v1/charges',      desc: 'Criar nova cobrança' },
  { method: 'GET',  path: '/v1/charges/:id',  desc: 'Consultar cobrança' },
  { method: 'GET',  path: '/v1/transactions', desc: 'Listar transações' },
  { method: 'POST', path: '/v1/transfers',    desc: 'Transferência P2P' },
  { method: 'GET',  path: '/v1/balance',      desc: 'Saldo da conta' },
  { method: 'POST', path: '/v1/webhooks',     desc: 'Registrar webhook' },
];

const features = [
  { icon: Zap,      title: 'Resposta em < 200ms',      body: 'Infraestrutura global com latência ultra-baixa em todos os endpoints.' },
  { icon: Webhook,  title: 'Webhooks em tempo real',   body: 'Receba eventos de pagamento confirmado, falha ou expiração instantaneamente.' },
  { icon: Globe,    title: 'SDKs em 3 linguagens',     body: 'JavaScript/TypeScript, Python e PHP. Instale, configure e cobre em minutos.' },
  { icon: Shield,   title: 'Ambiente sandbox',         body: 'Teste sem risco com credenciais de desenvolvimento separadas das de produção.' },
];

export default function APIPage({ onSignup }: Props) {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-24 md:py-32">
        <div className="pointer-events-none absolute right-0 top-0 h-[400px] w-[400px] rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-indigo-600/10 blur-[100px]" />
        <div className="relative mx-auto max-w-7xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-3 py-1.5">
              <Terminal className="h-3.5 w-3.5 text-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400">API REST</span>
            </div>
            <h1 className="mx-auto mb-5 max-w-3xl text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
              Integre pagamentos globais ao seu sistema em{' '}
              <span className="bg-gradient-to-r from-cyan-300 to-teal-300 bg-clip-text text-transparent">
                minutos
              </span>
            </h1>
            <p className="mx-auto mb-10 max-w-xl text-lg leading-relaxed text-zinc-400">
              API REST simples, SDKs prontos e documentação clara. Você foca no produto — a gente resolve o pagamento.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button onClick={onSignup} className="flex items-center gap-2 rounded-xl bg-cyan-500 px-8 py-4 font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all hover:brightness-110 active:scale-95">
                Obter chave de API <ArrowRight className="h-4 w-4" />
              </button>
              <button className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 font-bold text-white transition-all hover:bg-white/10">
                Ver documentação completa
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Code example ─────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-12 lg:grid-cols-2">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">Simples de integrar</h2>
              <p className="mb-8 leading-relaxed text-zinc-400">
                Instale o SDK, coloque sua chave e já está cobrando. Suporte completo com exemplos em JS, Python e PHP.
              </p>
              <ul className="space-y-4">
                {['Autenticação via Bearer token','Respostas em JSON padronizado','Paginação e filtros em todos os listar','Rate limit generoso: 1000 req/min','Modo sandbox para testes sem risco'].map(f=>(
                  <li key={f} className="flex items-center gap-3 text-sm text-zinc-300">
                    <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-4">
              {/* Install */}
              <div className="rounded-xl border border-white/10 bg-[#0a0e19] p-5 font-mono text-sm">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Instalação</p>
                <pre className="text-emerald-400">{'npm install @stellix/sdk'}</pre>
              </div>
              {/* Create charge */}
              <div className="rounded-xl border border-white/10 bg-[#0a0e19] p-5 font-mono text-[13px] leading-relaxed">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-500">Criar cobrança</p>
                  <button className="flex items-center gap-1 text-[10px] text-zinc-600 hover:text-zinc-300 transition-colors">
                    <Copy className="h-3 w-3" /> copiar
                  </button>
                </div>
                <pre className="overflow-x-auto text-cyan-300">
{`import { Stellix } from '@stellix/sdk';

const stellix = new Stellix(process.env.STELLIX_KEY);

const charge = await stellix.charges.create({
  amount: 9990,        // USD cents
  currency: 'USD',
  description: 'Pedido #4821',
  methods: ['qrcode', 'link', 'nfc'],
  expires_in: 3600,    // 1 hora
  webhook_url: 'https://meusite.com/webhook',
});

console.log(charge.payment_url);
// https://pay.stellix.io/c/ch_xxxxxxxxxxx`}
                </pre>
              </div>
              {/* Webhook */}
              <div className="rounded-xl border border-white/10 bg-[#0a0e19] p-5 font-mono text-[13px] leading-relaxed">
                <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-zinc-500">Webhook recebido</p>
                <pre className="overflow-x-auto text-zinc-300">
{`{
  "event": "charge.paid",
  "charge_id": "ch_xxxxxxxxxxx",
  "amount": 9990,
  "currency": "USD",
  "paid_at": "2025-01-26T14:23:01Z",
  "payer": { "email": "cliente@email.com" }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Endpoints ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <h2 className="mb-10 text-2xl font-bold text-white">Endpoints principais</h2>
          <div className="divide-y divide-white/5 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
            {endpoints.map(e => (
              <div key={e.path} className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-white/[0.04]">
                <span className={cn(
                  'shrink-0 rounded px-2.5 py-1 text-[11px] font-black tracking-wider',
                  e.method === 'POST' ? 'bg-emerald-500/15 text-emerald-400' : 'bg-cyan-500/15 text-cyan-400'
                )}>
                  {e.method}
                </span>
                <code className="flex-1 text-sm font-mono text-zinc-200">{e.path}</code>
                <span className="hidden text-sm text-zinc-500 sm:block">{e.desc}</span>
              </div>
            ))}
          </div>
          <p className="mt-4 text-center text-sm text-zinc-600">
            Base URL: <code className="text-zinc-400">https://api.stellix.io</code>
          </p>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                  <f.icon className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-24 text-center">
        <div className="mx-auto max-w-2xl px-6">
          <h2 className="mb-4 text-3xl font-bold text-white">Pronto para integrar?</h2>
          <p className="mb-8 text-zinc-400">Crie sua conta, pegue a chave de API e comece a cobrar em minutos.</p>
          <button onClick={onSignup} className="rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-transform hover:scale-105">
            Começar agora — é grátis
          </button>
        </div>
      </section>
    </div>
  );
}

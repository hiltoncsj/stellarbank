import { motion } from 'motion/react';
import { Zap, QrCode, Users, ArrowRight, Wifi, MapPin, Store, Shield, Check } from 'lucide-react';
import GlobeCanvas from '../GlobeCanvas';
import { cn } from '@/lib/utils';

interface Props {
  onSignup: () => void;
  onLogin: () => void;
  onGoTo: (page: string) => void;
}

const howItWorks = [
  {
    num: '01',
    title: 'Crie sua conta em 2 minutos',
    body: 'Sem burocracia, sem documentos. Só nome, e-mail e senha.',
  },
  {
    num: '02',
    title: 'Escolha como pagar',
    body: 'Busque um contato da agenda, escaneie um QR Code ou chegue perto e pronto.',
  },
  {
    num: '03',
    title: 'O dinheiro chega na hora',
    body: 'Em qualquer lugar do mundo, sem taxas escondidas, sem esperar dias.',
  },
];

const features = [
  {
    icon: Users,
    title: 'Mande pelo contato',
    body: 'Igual mandar uma mensagem. Encontre o contato na sua agenda e mande o valor. Simples assim.',
    color: 'text-cyan-400',
    bg: 'bg-cyan-400/10 border-cyan-400/20',
  },
  {
    icon: QrCode,
    title: 'Escaneie ou mostre o QR',
    body: 'Pague no café, na loja, num evento. Só apontar a câmera e confirmar.',
    color: 'text-indigo-400',
    bg: 'bg-indigo-400/10 border-indigo-400/20',
  },
  {
    icon: Wifi,
    title: 'Pague por aproximação',
    body: 'Deixe o cartão em casa. Chegue perto do terminal e o pagamento acontece com segurança biométrica.',
    color: 'text-emerald-400',
    bg: 'bg-emerald-400/10 border-emerald-400/20',
  },
  {
    icon: MapPin,
    title: 'Ache quem está perto',
    body: 'Veja usuários e lojas Stellix a sua volta no mapa e mande ou receba direto, sem precisar do contato salvo.',
    color: 'text-violet-400',
    bg: 'bg-violet-400/10 border-violet-400/20',
  },
];

const nearbyUsers = [
  { name: '@lucas', dist: '200m', color: 'border-cyan-400', style: { top: '18%', left: '20%' }, delay: '1s' },
  { name: '@maria', dist: '450m', color: 'border-purple-400', style: { bottom: '26%', right: '16%' }, delay: '2.5s' },
  { name: 'Star Coffee', color: 'border-emerald-400', style: { top: '38%', right: '12%' }, delay: '0.5s', isStore: true },
  { name: 'Padaria', color: 'border-emerald-400', style: { bottom: '18%', left: '12%' }, delay: '3s', isStore: true },
];

export default function MarketingHome({ onSignup, onLogin, onGoTo }: Props) {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative w-full py-20 md:py-28">
        <div className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-[150px]" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-[400px] w-[400px] rounded-full bg-indigo-600/12 blur-[120px]" />
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-cyan-900/15 blur-[160px]" />

        <div className="relative mx-auto flex w-full max-w-7xl flex-col items-center gap-10 px-6 md:flex-row md:gap-16">
          <motion.div
            className="z-10 flex-1"
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan-400/25 bg-cyan-400/8 px-3 py-1.5">
              <Zap className="h-3 w-3 text-cyan-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400">Pagamentos sem fronteiras</span>
            </div>

            <h1 className="mb-5 text-4xl font-bold leading-[1.1] tracking-tight text-white sm:text-5xl lg:text-[3.4rem]">
              Mande dinheiro digital<br />
              <span className="bg-gradient-to-r from-cyan-300 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                como uma mensagem
              </span>
            </h1>

            <p className="mb-4 max-w-lg text-lg leading-relaxed text-zinc-400">
              Sem chaves complicadas. Sem esperar dias. Só o contato da agenda, um QR Code ou a aproximação do celular.
            </p>
            <p className="mb-10 max-w-lg text-base leading-relaxed text-zinc-500">
              O dinheiro chega na hora, em qualquer lugar do mundo — em dólar digital, estável e sem surpresas.
            </p>

            <div className="flex flex-wrap gap-4">
              <button
                onClick={onSignup}
                className="flex items-center gap-2.5 rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.4)] transition-all hover:brightness-110 active:scale-95"
              >
                Criar conta grátis
                <ArrowRight className="h-4 w-4" />
              </button>
              <button
                onClick={onLogin}
                className="rounded-xl border border-white/20 bg-white/5 px-8 py-4 text-base font-bold text-white transition-all hover:bg-white/10 active:scale-95"
              >
                Já tenho conta
              </button>
            </div>
          </motion.div>

          <motion.div
            className="relative z-10 flex w-full items-center justify-center md:w-[480px] md:shrink-0"
            initial={{ opacity: 0, scale: 0.93 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/12 to-blue-600/8 blur-3xl" />
            <div className="aspect-square w-full max-w-[480px]">
              <GlobeCanvas />
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Como funciona ────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">É simples de verdade</h2>
            <p className="text-zinc-500">Três passos e o dinheiro já foi.</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {howItWorks.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.35 }}
                className="relative rounded-2xl border border-white/8 bg-white/[0.03] p-8"
              >
                <p className="mb-4 text-5xl font-black text-white/5">{step.num}</p>
                <h3 className="mb-2 text-lg font-bold text-white">{step.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{step.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formas de pagar ──────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 max-w-xl">
            <h2 className="mb-3 text-3xl font-bold text-white">Do jeito que for mais fácil</h2>
            <p className="text-zinc-400">
              Escolha como quer pagar ou receber. Tudo no mesmo app, tudo na hora.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
                className={cn('rounded-2xl border p-6 transition-all hover:border-white/20', f.bg)}
              >
                <div className={cn('mb-4 flex h-11 w-11 items-center justify-center rounded-xl border bg-black/20', f.bg)}>
                  <f.icon className={cn('h-5 w-5', f.color)} strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-bold text-white">{f.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{f.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Mapa de proximidade ──────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto flex max-w-7xl flex-col items-center gap-16 px-6 lg:flex-row">
          <div className="flex-1">
            <h2 className="mb-4 text-3xl font-bold text-white">Pague quem está perto de você</h2>
            <p className="mb-6 max-w-md text-lg leading-relaxed text-zinc-400">
              Abriu o app, viu o café do lado aceitando Stellix — só clicar e pagar. Sem pedir o contato, sem digitar nada.
            </p>
            <ul className="space-y-3">
              {['Encontre usuários e lojas próximos no mapa','Mande ou receba sem precisar do contato salvo','Lojas recebem em tempo real, sem maquininha'].map(t => (
                <li key={t} className="flex items-center gap-3 text-sm text-zinc-300">
                  <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex w-full max-w-md flex-col items-center lg:w-auto">
            <div className="relative aspect-square w-full overflow-hidden rounded-full border-2 border-white/10 bg-white/[0.02] shadow-[0_0_60px_rgba(34,211,238,0.07)] backdrop-blur">
              {['80%','60%','40%'].map(s => (
                <div key={s} className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/5" style={{width:s,height:s}} />
              ))}
              <div className="absolute left-1/2 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2">
                <span className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-cyan-500/30" />
                <div className="relative flex h-12 w-12 items-center justify-center rounded-full border-2 border-cyan-400 bg-slate-900">
                  <span className="text-xs font-bold text-cyan-300">Eu</span>
                </div>
              </div>
              {nearbyUsers.map(u => (
                <div key={u.name} className="absolute flex flex-col items-center gap-1" style={{...u.style, animation:`float 6s ease-in-out ${u.delay} infinite`}}>
                  <div className={cn('flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border-2 bg-slate-900 transition-transform hover:scale-110', u.color)}>
                    {u.isStore ? <Store className="h-5 w-5 text-emerald-400" /> : <span className="text-xs font-bold text-white">{u.name.replace('@','').slice(0,2).toUpperCase()}</span>}
                  </div>
                  <span className="rounded-full border border-white/10 bg-slate-900/80 px-2 py-0.5 text-[10px] text-white backdrop-blur">
                    {u.name}{u.dist ? ` • ${u.dist}` : ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Segurança (sem jargão) ───────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-start gap-6 rounded-2xl border border-white/8 bg-white/[0.03] p-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-emerald-400/10 border border-emerald-400/20">
                <Shield className="h-6 w-6 text-emerald-400" />
              </div>
              <div>
                <h3 className="mb-1 font-bold text-white">Seu dinheiro protegido</h3>
                <p className="max-w-lg text-sm leading-relaxed text-zinc-400">
                  Autenticação em duas etapas, confirmação biométrica nos pagamentos e registro imutável de cada transação. Você foca no que importa — a gente cuida da segurança.
                </p>
              </div>
            </div>
            <div className="shrink-0 text-sm font-semibold text-emerald-400">✓ Protegido</div>
          </div>
        </div>
      </section>

      {/* ── Teaser para empresas ─────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="relative overflow-hidden rounded-3xl border border-cyan-400/15 bg-gradient-to-br from-cyan-950/40 via-slate-900/60 to-indigo-950/40 p-10 md:p-14"
          >
            <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-cyan-500/10 blur-[80px]" />
            <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
              <div className="max-w-xl">
                <span className="mb-4 inline-block rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.15em] text-cyan-400">
                  Para empresas e lojistas
                </span>
                <h2 className="mb-4 text-3xl font-bold text-white md:text-4xl">
                  Receba de clientes do mundo todo em tempo real
                </h2>
                <p className="mb-6 text-zinc-400">
                  Dashboard completo, links de pagamento, QR Code de cobrança, gateway de API e muito mais. Sem esperar D+2, sem taxa oculta, sem burocracia.
                </p>
                <ul className="space-y-2">
                  {[
                    'Recebimento instantâneo, sem prazo',
                    'Gere links e QR Codes de cobrança em segundos',
                    'Aceite de qualquer país como se fosse na esquina',
                    'Integre ao seu sistema via API REST',
                  ].map(item => (
                    <li key={item} className="flex items-center gap-2.5 text-sm text-zinc-300">
                      <Check className="h-4 w-4 shrink-0 text-cyan-400" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="shrink-0">
                <button
                  onClick={() => onGoTo('empresas')}
                  className="flex items-center gap-3 rounded-xl bg-cyan-500 px-8 py-4 text-base font-bold text-slate-950 shadow-[0_0_30px_rgba(34,211,238,0.35)] transition-all hover:brightness-110 active:scale-95"
                >
                  Ver recursos para empresas
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── CTA final ────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-28 text-center">
        <div className="mx-auto max-w-3xl px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-5 text-4xl font-bold text-white sm:text-5xl">
              Comece agora. É grátis.
            </h2>
            <p className="mb-10 text-xl text-zinc-400">
              Crie sua conta em 2 minutos e mande seu primeiro pagamento hoje.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <button
                onClick={onSignup}
                className="rounded-full bg-cyan-500 px-10 py-5 text-lg font-bold text-slate-950 shadow-[0_0_40px_rgba(34,211,238,0.4)] transition-transform hover:scale-105"
              >
                Criar conta grátis
              </button>
              <button
                onClick={onLogin}
                className="rounded-full border border-white/20 px-10 py-5 text-lg font-bold text-white transition-colors hover:bg-white/5"
              >
                Já tenho conta
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

import { motion } from 'motion/react';
import { Globe, Zap, Shield, Heart } from 'lucide-react';

const values = [
  { icon: Zap,    title: 'Velocidade',   body: 'Dinheiro não deveria esperar burocracia. Cada segundo importa para quem está pagando e para quem está recebendo.' },
  { icon: Globe,  title: 'Acesso',       body: 'Qualquer pessoa com um celular merece enviar e receber dinheiro globalmente, sem precisar de conta em banco internacional.' },
  { icon: Shield, title: 'Confiança',    body: 'Transparência total. Cada transação é registrada e auditável. Zero taxas escondidas, zero surpresas no extrato.' },
  { icon: Heart,  title: 'Simplicidade', body: 'Tecnologia sofisticada deve parecer simples. Se o usuário precisar ler um manual, falhamos.' },
];

const team = [
  { name: 'Equipe de Produto',      role: 'Design & UX',           initials: 'UX' },
  { name: 'Equipe de Engenharia',   role: 'Backend & Blockchain',   initials: 'ENG' },
  { name: 'Equipe de Operações',    role: 'Compliance & Suporte',   initials: 'OPS' },
  { name: 'Equipe Comercial',       role: 'Parcerias & Vendas',     initials: 'COM' },
];

export default function Sobre() {
  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-indigo-600/8 blur-[120px]" />
        <div className="relative mx-auto max-w-4xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-400/25 bg-indigo-400/8 px-3 py-1.5">
              <Globe className="h-3.5 w-3.5 text-indigo-400" />
              <span className="text-[11px] font-bold uppercase tracking-[0.15em] text-indigo-400">Nossa missão</span>
            </div>
            <h1 className="mb-6 text-4xl font-bold leading-[1.1] text-white sm:text-5xl">
              Dinheiro digital sem{' '}
              <span className="bg-gradient-to-r from-indigo-300 to-cyan-300 bg-clip-text text-transparent">
                fronteiras, sem complexidade
              </span>
            </h1>
            <p className="mx-auto max-w-2xl text-xl leading-relaxed text-zinc-400">
              A Stellix nasceu da crença de que qualquer pessoa deve poder mandar e receber dinheiro do outro lado do mundo com a mesma facilidade de mandar uma mensagem.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── História ─────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col gap-16 lg:flex-row lg:items-center">
            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6 text-3xl font-bold text-white">Como tudo começou</h2>
              <div className="space-y-5 text-zinc-400 leading-relaxed">
                <p>
                  A ideia surgiu de uma frustração real: tentar enviar dinheiro para um amigo no exterior e descobrir que a operação levaria 3 dias úteis, custaria taxas abusivas e ainda exigiria documentos que nenhum dos dois tinha em mãos.
                </p>
                <p>
                  Existia tecnologia de sobra para resolver isso — a rede Stellar liquida transferências globais em segundos com taxas mínimas. Faltava uma camada de produto que tornasse essa tecnologia invisível para o usuário comum.
                </p>
                <p>
                  A Stellix é essa camada. Uma experiência de pagamento tão simples quanto mandar uma mensagem, sustentada por uma infraestrutura blockchain robusta que o usuário nunca precisa entender.
                </p>
              </div>
            </motion.div>

            <motion.div
              className="flex-1"
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <div className="grid grid-cols-2 gap-4">
                {[
                  { num: '< 5s',    label: 'Tempo médio por transação' },
                  { num: '$ 0,001', label: 'Taxa por operação na rede' },
                  { num: '180+',    label: 'Países alcançados' },
                  { num: '99,9%',   label: 'Uptime da plataforma' },
                ].map(s => (
                  <div key={s.label} className="rounded-2xl border border-white/8 bg-white/[0.03] p-6">
                    <p className="mb-1 text-3xl font-black text-white">{s.num}</p>
                    <p className="text-sm text-zinc-500">{s.label}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── Valores ──────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">O que nos guia</h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-400/10 border border-indigo-400/20">
                  <v.icon className="h-5 w-5 text-indigo-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-2 font-bold text-white">{v.title}</h3>
                <p className="text-sm leading-relaxed text-zinc-400">{v.body}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tecnologia ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="flex flex-col items-center gap-10 rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center md:p-16">
            <div>
              <h2 className="mb-4 text-2xl font-bold text-white">Infraestrutura Stellar</h2>
              <p className="mx-auto max-w-2xl leading-relaxed text-zinc-400">
                A Stellix é construída sobre a rede Stellar — uma blockchain de código aberto projetada especificamente para pagamentos globais. Liquidação em 3–5 segundos, taxa de transação mínima e compatibilidade com USDC (dólar digital emitido pela Circle).
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-8 opacity-60">
              {['Stellar Network','USDC by Circle','Blockchain Ledger','Open Source'].map(t => (
                <span key={t} className="rounded-full border border-white/15 bg-white/5 px-5 py-2 text-sm font-semibold text-zinc-300">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Time ─────────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-14 text-center">
            <h2 className="mb-3 text-3xl font-bold text-white">Quem constrói a Stellix</h2>
            <p className="text-zinc-500">Times focados em produto, tecnologia e crescimento.</p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((t, i) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex flex-col items-center rounded-2xl border border-white/8 bg-white/[0.03] p-8 text-center"
              >
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-2 border-indigo-400/30 bg-indigo-500/10 text-sm font-black text-indigo-300">
                  {t.initials}
                </div>
                <h3 className="mb-1 font-bold text-white">{t.name}</h3>
                <p className="text-sm text-zinc-500">{t.role}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

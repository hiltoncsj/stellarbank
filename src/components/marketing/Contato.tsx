import { useState, type FormEvent } from 'react';
import { motion } from 'motion/react';
import { Mail, MessageSquare, Building2, ArrowRight, Check } from 'lucide-react';
import { toast } from 'sonner';

const channels = [
  { icon: MessageSquare, title: 'Suporte ao usuário', detail: 'suporte@stellix.io', sub: 'Resposta em até 4 horas' },
  { icon: Building2,     title: 'Parcerias e vendas', detail: 'parcerias@stellix.io', sub: 'Para integrações e enterprise' },
  { icon: Mail,          title: 'Imprensa',            detail: 'press@stellix.io', sub: 'Press kit disponível a pedido' },
];

export default function Contato() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handle = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
    toast.success('Mensagem enviada! Retornaremos em breve.');
  };

  return (
    <div>
      {/* ── Hero ──────────────────────────────────────────────────────────── */}
      <section className="relative py-24 md:py-32">
        <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[500px] -translate-x-1/2 rounded-full bg-cyan-500/8 blur-[120px]" />
        <div className="relative mx-auto max-w-3xl px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-5 text-4xl font-bold text-white sm:text-5xl">Fale com a gente</h1>
            <p className="text-xl text-zinc-400">
              Dúvida, sugestão, parceria ou só curiosidade? Estamos aqui.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── Canais ───────────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 py-16">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid gap-5 md:grid-cols-3">
            {channels.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-2xl border border-white/8 bg-white/[0.03] p-6"
              >
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 border border-cyan-400/20">
                  <c.icon className="h-5 w-5 text-cyan-400" strokeWidth={1.5} />
                </div>
                <h3 className="mb-1 font-bold text-white">{c.title}</h3>
                <p className="mb-1 text-sm text-cyan-400">{c.detail}</p>
                <p className="text-xs text-zinc-500">{c.sub}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Formulário ───────────────────────────────────────────────────── */}
      <section className="border-t border-white/5 bg-white/[0.015] py-20">
        <div className="mx-auto max-w-2xl px-6">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-2xl font-bold text-white">Envie uma mensagem</h2>
            <p className="text-zinc-500">Preencha o formulário e respondemos em até 24 horas.</p>
          </div>

          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 rounded-2xl border border-emerald-500/25 bg-emerald-500/10 p-12 text-center"
            >
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-emerald-400/30 bg-emerald-500/15">
                <Check className="h-8 w-8 text-emerald-400" />
              </div>
              <h3 className="text-xl font-bold text-white">Mensagem enviada!</h3>
              <p className="text-zinc-400">Retornaremos para <strong className="text-white">{form.email}</strong> em breve.</p>
            </motion.div>
          ) : (
            <form onSubmit={handle} className="space-y-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">Nome</label>
                  <input
                    required
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    placeholder="Seu nome"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-cyan-400/50 focus:ring-0"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-300">E-mail</label>
                  <input
                    required
                    type="email"
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    placeholder="email@exemplo.com"
                    className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-cyan-400/50"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">Assunto</label>
                <select
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0e19] px-4 py-3 text-sm text-zinc-300 outline-none transition-colors focus:border-cyan-400/50"
                >
                  <option value="">Selecione...</option>
                  <option value="suporte">Suporte ao usuário</option>
                  <option value="parceria">Parceria / Enterprise</option>
                  <option value="api">Dúvida sobre API</option>
                  <option value="imprensa">Imprensa</option>
                  <option value="outro">Outro</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-300">Mensagem</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  placeholder="Escreva sua mensagem aqui..."
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder-zinc-600 outline-none transition-colors focus:border-cyan-400/50"
                />
              </div>

              <button
                type="submit"
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-cyan-500 py-4 font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:brightness-110 active:scale-[0.98]"
              >
                Enviar mensagem <ArrowRight className="h-4 w-4" />
              </button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Globe, Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import MarketingHome from './marketing/MarketingHome';
import Empresas from './marketing/Empresas';
import APIPage from './marketing/APIPage';
import Sobre from './marketing/Sobre';
import Contato from './marketing/Contato';
import { Link2 } from 'lucide-react';

type Page = 'home' | 'empresas' | 'api' | 'sobre' | 'contato';

interface Props {
  onLogin: () => void;
  onSignup: () => void;
}

const navLinks: { id: Page; label: string }[] = [
  { id: 'home',     label: 'Início' },
  { id: 'empresas', label: 'Para Empresas' },
  { id: 'api',      label: 'API' },
  { id: 'sobre',    label: 'Sobre' },
  { id: 'contato',  label: 'Contato' },
];

export default function MarketingLayout({ onLogin, onSignup }: Props) {
  const [page, setPage] = useState<Page>('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  const goTo = (p: string) => {
    setPage(p as Page);
    setMobileOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (page) {
      case 'home':     return <MarketingHome onSignup={onSignup} onLogin={onLogin} onGoTo={goTo} />;
      case 'empresas': return <Empresas onSignup={onSignup} onGoTo={goTo} />;
      case 'api':      return <APIPage onSignup={onSignup} />;
      case 'sobre':    return <Sobre />;
      case 'contato':  return <Contato />;
    }
  };

  return (
    <div
      className="min-h-screen bg-[#070b14] text-white"
      style={{
        backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.03) 1px, transparent 0)',
        backgroundSize: '40px 40px',
      }}
    >
      {/* ── Navbar ──────────────────────────────────────────────────────── */}
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          {/* Logo */}
          <button
            type="button"
            onClick={() => goTo('home')}
            className="flex items-center gap-2.5 transition-opacity hover:opacity-80"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15">
              <Globe className="h-5 w-5 text-cyan-400" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white">Stellix</span>
          </button>

          {/* Desktop nav */}
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map(link => (
              <button
                key={link.id}
                type="button"
                onClick={() => goTo(link.id)}
                className={cn(
                  'rounded-lg px-4 py-2 text-sm font-medium transition-all',
                  page === link.id
                    ? 'bg-white/8 text-white'
                    : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                )}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 md:flex">
            <button
              type="button"
              onClick={onLogin}
              className="px-4 py-2 text-sm font-semibold text-zinc-400 transition-colors hover:text-white"
            >
              Entrar
            </button>
            <button
              type="button"
              onClick={onSignup}
              className="rounded-full bg-cyan-500 px-5 py-2 text-sm font-bold text-slate-950 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition-all hover:brightness-110 active:scale-95"
            >
              Criar conta
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen(o => !o)}
            className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-zinc-400 md:hidden"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden border-t border-white/5 bg-slate-950/95 md:hidden"
            >
              <div className="flex flex-col gap-1 p-4">
                {navLinks.map(link => (
                  <button
                    key={link.id}
                    type="button"
                    onClick={() => goTo(link.id)}
                    className={cn(
                      'rounded-xl px-4 py-3 text-left text-sm font-medium transition-all',
                      page === link.id ? 'bg-white/8 text-white' : 'text-zinc-400 hover:bg-white/5 hover:text-white'
                    )}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="mt-3 flex flex-col gap-2 border-t border-white/5 pt-3">
                  <button onClick={onLogin} className="rounded-xl border border-white/10 bg-white/5 py-3 text-sm font-semibold text-zinc-300">Entrar</button>
                  <button onClick={onSignup} className="rounded-xl bg-cyan-500 py-3 text-sm font-bold text-slate-950">Criar conta grátis</button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Page content ────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        <motion.main
          key={page}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
        >
          {renderPage()}
        </motion.main>
      </AnimatePresence>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="border-t border-white/5 bg-slate-950 py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-col gap-8 md:flex-row md:justify-between">
            <div className="max-w-xs">
              <div className="mb-3 flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-cyan-400/30 bg-cyan-500/15">
                  <Globe className="h-4 w-4 text-cyan-400" />
                </div>
                <span className="text-lg font-bold text-white">Stellix</span>
              </div>
              <p className="text-sm leading-relaxed text-zinc-500">
                Pagamentos digitais globais, simples como mandar uma mensagem.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Produto</p>
                <div className="space-y-2">
                  {[['home','Para usuários'],['empresas','Para empresas'],['api','API']].map(([id,label])=>(
                    <button key={id} onClick={()=>goTo(id)} className="block text-sm text-zinc-400 transition-colors hover:text-white">{label}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Empresa</p>
                <div className="space-y-2">
                  {[['sobre','Sobre'],['contato','Contato']].map(([id,label])=>(
                    <button key={id} onClick={()=>goTo(id)} className="block text-sm text-zinc-400 transition-colors hover:text-white">{label}</button>
                  ))}
                </div>
              </div>
              <div>
                <p className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-500">Legal</p>
                <div className="space-y-2">
                  {['Privacidade','Termos','Status'].map(l=>(
                    <a key={l} href="#" className="block text-sm text-zinc-400 transition-colors hover:text-white">{l}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-center justify-between gap-4 border-t border-white/5 pt-8 md:flex-row">
            <p className="text-sm text-zinc-600">© 2025 Stellix. Todos os direitos reservados.</p>
            <div className="flex items-center gap-4">
              <Globe className="h-5 w-5 cursor-pointer text-zinc-600 transition-colors hover:text-cyan-400" />
              <Link2 className="h-5 w-5 cursor-pointer text-zinc-600 transition-colors hover:text-cyan-400" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

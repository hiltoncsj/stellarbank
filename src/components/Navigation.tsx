import { Home, Wallet, User, MessageSquareText, Globe } from 'lucide-react';
import { View } from '../types';
import { cn } from '@/lib/utils';

interface NavigationProps {
  currentView: View;
  onViewChange: (view: View) => void;
  variant?: 'sidebar' | 'bottom';
}

const items = [
  { id: 'home', icon: Home, label: 'Inicio' },
  { id: 'chat', icon: MessageSquareText, label: 'Chat' },
  { id: 'assets', icon: Wallet, label: 'Carteira' },
  { id: 'profile', icon: User, label: 'Perfil' },
];

export default function Navigation({ currentView, onViewChange, variant }: NavigationProps) {
  if (variant === 'sidebar') {
    return (
      <aside className="hidden md:flex flex-col w-60 h-full border-r border-white/10 glass-dark shrink-0">
        <div className="p-6 border-b border-white/10 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-primary/20 border border-primary/30 flex items-center justify-center shrink-0">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="font-bold text-white text-base leading-tight">Stellix</p>
              <p className="text-[10px] text-zinc-500 leading-tight">Pagamentos globais</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = currentView === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onViewChange(item.id as View)}
                className={cn(
                  'flex items-center gap-3 w-full px-4 py-3 rounded-xl text-sm transition-all duration-200',
                  isActive
                    ? 'bg-primary/15 text-white'
                    : 'text-zinc-400 hover:text-zinc-200 hover:bg-white/5'
                )}
              >
                <Icon className={cn('h-[18px] w-[18px] shrink-0', isActive ? 'text-primary' : '')} />
                <span className={cn('font-medium', isActive ? 'font-semibold' : '')}>{item.label}</span>
                {isActive && <span className="ml-auto w-1.5 h-1.5 rounded-full bg-primary" />}
              </button>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 shrink-0">
          <p className="text-[10px] text-zinc-600 text-center">DolarPix v1.0</p>
        </div>
      </aside>
    );
  }

  // Mobile bottom bar
  return (
    <nav className="md:hidden glass-dark shrink-0 border-t border-white/10 px-3 py-2.5">
      <div className="grid grid-cols-4 gap-1.5">
        {items.map((item) => {
          const Icon = item.icon;
          const isActive = currentView === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onViewChange(item.id as View)}
              className={cn(
                'flex min-w-0 flex-col items-center justify-center gap-1 rounded-2xl px-2 py-2.5 transition-all duration-200',
                isActive
                  ? 'bg-white/12 text-white shadow-inner shadow-black/20'
                  : 'text-zinc-500 hover:bg-white/5 hover:text-zinc-200'
              )}
            >
              <Icon className={cn('h-5 w-5 shrink-0', isActive ? 'text-primary' : '')} />
              <span
                className={cn(
                  'truncate text-[9px] font-bold uppercase tracking-[0.16em]',
                  isActive ? 'text-primary' : ''
                )}
              >
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}

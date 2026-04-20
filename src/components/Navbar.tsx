import { Zap, Wallet } from "lucide-react";

export default function Navbar({ modoMonitor, setModoMonitor }: any) {
  return (
    <nav className="fixed w-full z-50 top-0 py-4">
      <div className="max-w-7xl mx-auto px-4">
        <div className="glass-panel rounded-full px-6 py-4 flex justify-between items-center">

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center">
              <Zap />
            </div>
            <span className="font-bold">DolarPix</span>
          </div>

          <button
            onClick={() => setModoMonitor(!modoMonitor)}
            className="btn-glow px-5 py-2 text-xs font-bold uppercase tracking-widest"
            id="login-button"
          >
            <Wallet className="w-4 h-4" /> {modoMonitor ? "LOGIN" : "CONECTAR"}
          </button>
        </div>
      </div>
    </nav>
  );
}
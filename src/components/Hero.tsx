import { useEffect, useRef, useState } from "react";

interface Props {
  onLogin: (email: string, password: string) => void;
  modoMonitor: boolean;
  onGoToSignup: () => void;
}

export default function Hero({ onLogin, modoMonitor, onGoToSignup }: Props) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [publicKey, setPublicKey] = useState("");

  const bgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  // =========================
  // UNICORN STUDIO (OK)
  // =========================
  useEffect(() => {
    const loadUnicorn = () => {
      if ((window as any).UnicornStudio) {
        (window as any).UnicornStudio.init();
      }
    };

    const existingScript = document.querySelector(
      'script[src*="unicornstudio"]'
    );

    if (!existingScript) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.29/dist/unicornStudio.umd.js";
      script.async = true;
      script.onload = () => setTimeout(loadUnicorn, 100);
      document.body.appendChild(script);
    } else {
      setTimeout(loadUnicorn, 100);
    }
  }, []);

  // =========================
  // PARALLAX GLOBAL (ÚNICO)
  // =========================
  useEffect(() => {
    if (window.innerWidth < 768) return;

    const handleMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;

      const px = e.clientX / innerWidth - 0.5;
      const py = e.clientY / innerHeight - 0.5;

      // BACKGROUND
      if (bgRef.current) {
        const x = px * 20;
        const y = py * 20;

        bgRef.current.style.transform = `translate(${x}px, ${y}px) scale(1.05)`;
      }

      // CONTEÚDO
      if (contentRef.current) {
        contentRef.current.style.transform = `translate(${px * 10}px, ${py * 10}px)`;
      }

      // IMAGEM (efeito premium isolado)
      if (imageRef.current) {
        const intensity = 20;

        const x = px * intensity - 10;
        const y = py * intensity;

        const distanceFromCenter = Math.abs(px);

        const baseZoom = 1.3;
        const dynamicZoom = (1 - distanceFromCenter) * 0.05;

        const zoom = baseZoom + dynamicZoom;

        imageRef.current.style.transform = `
          translate(${x}px, ${y}px)
          scale(${zoom})
        `;
      }
    };

    window.addEventListener("mousemove", handleMove);

    return () => {
      window.removeEventListener("mousemove", handleMove);
    };
  }, []);

  return (
    <header className="relative isolate min-h-screen w-full flex items-center justify-center pt-28 md:pt-28 lg:pt-0">

      {/* 🌌 BACKGROUND */}
      <div
        ref={bgRef}
        className="absolute inset-0 -z-20 overflow-hidden pointer-events-none"
        style={{
          maskImage:
            "linear-gradient(transparent, black 0%, black 85%, transparent)",
          WebkitMaskImage:
            "linear-gradient(transparent, black 0%, black 85%, transparent)",
          filter: "hue-rotate(260deg) saturate(1.8) brightness(1.2)",
        }}
      >
        <div
          data-us-project="sajpUiTp7MIKdX6daDCu"
          className="absolute inset-0 w-full h-full"
        />

        {/* glow */}
        <div className="absolute inset-0 mix-blend-screen pointer-events-none">
          <div className="absolute top-1/3 left-1/4 w-[600px] h-[600px] bg-cyan-400/30 blur-[140px] rounded-full" />
          <div className="absolute bottom-1/3 right-1/4 w-[600px] h-[600px] bg-pink-500/30 blur-[140px] rounded-full" />
        </div>

        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* GRID */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:100px_100px]" />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050a14]/40 via-transparent to-[#050a14]" />
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl w-full px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
      >
        {/* LEFT */}
        <div>

          <div className="mb-6 inline-flex items-center gap-2 px-5 py-1 rounded-full border border-cyan-400 text-[14px] uppercase text-cyan-300">
            <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse" />
            Bem-vindo de volta
          </div>

          <h1 className="text-5xl font-bold text-white mb-4">
            Pagamentos <br />
            <span className="bg-gradient-to-r from-[#00f2fe] via-[#4facfe] to-[#fe0979] bg-clip-text text-transparent">
              Sem Fronteiras.
            </span>
          </h1>

          <p className="text-white mb-8 max-w-xl">
            {modoMonitor ? (
              <>
                Adicione a <span className="text-[#00f2fe]">Public Key</span> para acompanhar histórico, saldo e transações ao redor do globo usando a blockchain da Stellar.
              </>
            ) : (
              <>
                Adicione o <span className="text-[#00f2fe]">E-mail/Senha</span> para acompanhar histórico, saldo e transações ao redor do globo usando a blockchain da Stellar.
              </>
            )}
          </p>

          {!modoMonitor && (
            <div className="max-w-xl bg-black/60 p-4 rounded-2xl flex flex-col gap-4 backdrop-blur-xl border border-white/10">

              <input
                type="email"
                placeholder="Seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 px-4 py-3 rounded-xl text-white outline-none"
              />

              <input
                type="password"
                placeholder="Sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="bg-white/5 px-4 py-3 rounded-xl text-white outline-none"
              />

              <button
                onClick={() => onLogin(email, senha)}
                className="cursor-pointer bg-gradient-to-r from-brand-500 to-blue-600 py-3 rounded-full font-bold"
              >
                Entrar
              </button>

              <p className="text-center text-white/80 text-sm">
                Não tem uma conta?{" "}
                <button
                  onClick={onGoToSignup}
                  className="cursor-pointer text-blue-400 font-bold"
                >
                  Cadastre-se
                </button>
              </p>
            </div>
          )}

          {modoMonitor && (
            <div className="max-w-xl bg-black/80 p-4 rounded-2xl flex flex-col gap-4 backdrop-blur-xl border border-white/10">
              <input
                type="text"
                placeholder="Public Key"
                value={publicKey}
                onChange={(e) => setPublicKey(e.target.value)}
                className="bg-white/5 px-4 py-3 rounded-xl text-white outline-none"
              />
              <button
                onClick={() => onLogin(publicKey, "")}
                className="cursor-pointer bg-gradient-to-r from-brand-500 to-blue-600 py-3 rounded-full font-bold"
              >
                Conectar
              </button>
            </div>
          )}
        </div>

        {/* RIGHT IMAGE */}
        <div className="flex justify-center">
          <div
            className="w-full max-w-[500px] h-[500px] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl"
            id="hero-image"
          >
            <img
              ref={imageRef}
              src="/assets/web3_dashboard_phone_dolarpix_bw_1775843625157.png"
              className="w-full h-full object-cover transition-transform duration-200 ease-out"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
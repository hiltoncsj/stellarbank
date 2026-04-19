import { useState } from "react";
import { Mail, Lock } from "lucide-react";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !senha) return alert("Preencha tudo");

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);

    alert("Login feito 🚀");
  };

  return (
    <div className="glass-panel p-6 rounded-3xl space-y-4">

      <div className="relative">
        <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="w-full h-14 pl-12 rounded-xl bg-white/10"
        />
      </div>

      <div className="relative">
        <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/40" />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          className="w-full h-14 pl-12 rounded-xl bg-white/10"
        />
      </div>

      <button
        onClick={handleLogin}
        className="w-full h-14 bg-blue-500 rounded-xl font-bold"
      >
        {loading ? "Entrando..." : "Entrar"}
      </button>
    </div>
  );
}
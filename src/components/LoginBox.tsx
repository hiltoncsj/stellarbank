import { useState } from "react";

export default function LoginBox({ onLogin }) {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  return (
    <div className="bg-black/60 backdrop-blur-xl p-6 rounded-3xl border border-white/10">

      <input
        type="email"
        placeholder="Seu email"
        className="w-full mb-3 p-3 bg-white/10 rounded-xl text-white"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Sua senha"
        className="w-full mb-4 p-3 bg-white/10 rounded-xl text-white"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />

      <button
        onClick={() => onLogin(email, senha)}
        className="w-full bg-gradient-to-r from-teal-500 to-blue-600 p-3 rounded-full font-bold"
      >
        Entrar
      </button>
    </div>
  );
}
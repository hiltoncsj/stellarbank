import { useState } from "react";

export default function MonitorPanel() {
  const [key, setKey] = useState("");
  const [contas, setContas] = useState<string[]>([]);

  const add = () => {
    if (!key) return;
    setContas([...contas, key]);
    setKey("");
  };

  return (
    <div className="glass-panel p-6 rounded-3xl space-y-4">

      <input
        value={key}
        onChange={(e) => setKey(e.target.value)}
        placeholder="Public Key"
        className="w-full h-14 px-4 rounded-xl bg-white/10"
      />

      <button
        onClick={add}
        className="w-full h-14 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl"
      >
        Adicionar Conta
      </button>

      {contas.map((c, i) => (
        <div key={i} className="p-3 bg-white/5 rounded-xl truncate">
          {c}
        </div>
      ))}
    </div>
  );
}
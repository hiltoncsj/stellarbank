import { useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Footer from "./components/Footer";

interface Props {
  onLogin: (email: string, password: string) => void;
  onGoToSignup: () => void;
}

export default function Landing({ onLogin, onGoToSignup }: Props) {
  const [modoMonitor, setModoMonitor] = useState(false);

  return (
    <div className="bg-[#050a14] text-white min-h-screen overflow-x-hidden">
      
      <Navbar 
        modoMonitor={modoMonitor} 
        setModoMonitor={setModoMonitor} 
      />

      <Hero 
        onLogin={onLogin} 
        modoMonitor={modoMonitor}
      />

      <Footer />
    </div>
  );
}
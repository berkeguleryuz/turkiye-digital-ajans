import React, { useState } from "react";
import { Send } from "lucide-react";

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await res.json();

      if (res.ok) {
        setStatus("success");
        setEmail("");
      } else {
        console.error(data.error);
        setStatus("idle");
        alert(data.error || "Bir hata oluştu.");
      }
    } catch (error) {
      console.error("Newsletter error:", error);
      setStatus("idle");
      alert("Bağlantı hatası.");
    }
  };

  return (
    <section className="py-24 bg-[#D9D9D9] border-t-4 border-black relative">
      <div className="container mx-auto px-4 max-w-4xl text-center">
        <div className="bg-white border-4 border-black p-8 md:p-12 shadow-[12px_12px_0px_0px_#FF00FF] relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-4 bg-black"></div>
          <div className="absolute bottom-0 left-0 w-full h-4 bg-black"></div>

          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            GÜNCEL HABERLERE <span className="text-[#FF00FF]">KATIL</span>
          </h2>
          <p className="font-mono font-bold text-lg mb-8">
            Ham güncellemeler al. Spam yok. Sadece kaos ve düzen.
          </p>

          <form
            className="flex flex-col md:flex-row gap-4"
            onSubmit={handleSubmit}
          >
            <input
              type="email"
              placeholder="E_POSTA_ADRESI"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-gray-100 border-4 border-black p-4 font-mono font-bold text-lg focus:outline-none focus:bg-[#CCFF00] transition-colors placeholder:text-gray-500"
            />
            <button
              type="submit"
              className="bg-black text-white font-black text-xl px-8 py-4 border-4 border-transparent hover:bg-[#FF00FF] hover:text-black hover:border-black transition-all flex items-center justify-center gap-2 group"
              disabled={status === "success"}
            >
              {status === "success" ? "KATILDINIZ" : "GÖNDER"}{" "}
              <Send className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          <div className="mt-6 text-xs font-mono opacity-60 uppercase tracking-widest">
            Gönder butonuna basarak bizden mail almayı kabul edersiniz.
          </div>
        </div>
      </div>
    </section>
  );
};

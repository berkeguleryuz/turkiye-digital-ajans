import React from "react";
import { PenTool, Monitor, Rocket, Cpu } from "lucide-react";

export const TechStack: React.FC = () => {
  const items = [
    {
      icon: <PenTool size={40} />,
      title: "UI/UX TASARIM",
      desc: "Kullanıcı odaklı, estetik ve işlevsel arayüz deneyimleri.",
      color: "bg-[#CCFF00]",
    },
    {
      icon: <Monitor size={40} />,
      title: "WEB GELİŞTİRME",
      desc: "Modern, hızlı ve ölçeklenebilir web uygulamaları.",
      color: "bg-[#FF9F1C]",
    },
    {
      icon: <Rocket size={40} />,
      title: "MARKA STRATEJİSİ",
      desc: "Dijital dünyada ses getiren kurumsal kimlik inşası.",
      color: "bg-[#4ECDC4]",
    },
    {
      icon: <Cpu size={40} />,
      title: "AI ENTEGRASYONU",
      desc: "İş süreçlerinizi yapay zeka ile optimize ediyoruz.",
      color: "bg-[#FF6B6B]",
    },
  ];

  return (
    <section className="py-20 container mx-auto px-4">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-black uppercase bg-white border-4 border-black inline-block px-8 py-2 shadow-[8px_8px_0px_0px_#000]">
          HİZMETLERİMİZ
        </h2>
        <p className="mt-4 font-mono font-bold text-gray-600">
          /// DİJİTAL ÇÖZÜM ORTAĞINIZ
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {items.map((item, idx) => (
          <div key={idx} className="group relative">
            <div
              className={`absolute top-0 left-0 w-full h-full bg-black translate-x-2 translate-y-2 group-hover:translate-x-4 group-hover:translate-y-4 transition-transform duration-200`}
            ></div>
            <div
              className={`relative h-full ${item.color} border-4 border-black p-6 flex flex-col gap-4 hover:-translate-y-1 hover:-translate-x-1 transition-transform duration-200`}
            >
              <div className="bg-white w-16 h-16 border-4 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                {item.icon}
              </div>
              <h3 className="text-xl font-black uppercase">{item.title}</h3>
              <p className="font-mono text-sm font-bold leading-tight opacity-80">
                {item.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

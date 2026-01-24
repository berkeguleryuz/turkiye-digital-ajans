import React from "react";

export const Marquee: React.FC = () => {
  const items = [
    "TASARIM",
    "YARATICILIK",
    "HİZMET",
    "KÜLTÜR",
    "KOD",
    "İZMİR",
    "GELECEK",
  ];

  return (
    <div className="w-full bg-black text-[#CCFF00] border-b-4 border-black overflow-hidden whitespace-nowrap py-3 font-bold text-xl md:text-2xl uppercase tracking-widest flex">
      <div className="animate-marquee-full flex-shrink-0 flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-4">/// {item}</span>
        ))}
      </div>
      <div className="animate-marquee-full flex-shrink-0 flex">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="mx-4">/// {item}</span>
        ))}
      </div>
    </div>
  );
};

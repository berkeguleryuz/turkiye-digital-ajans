import React from "react";

export const Marquee: React.FC = () => {
  const text =
    "/// HİZMET /// KÜLTÜR /// KOD /// İZMİR /// GELECEK /// TASARIM /// YARATICILIK";
  const repeatedText = text.repeat(2);

  return (
    <div className="w-full bg-black text-[#CCFF00] border-b-4 border-black overflow-hidden whitespace-nowrap py-3 font-bold text-xl md:text-2xl uppercase tracking-widest flex">
      <div className="animate-marquee-full flex-shrink-0 px-2">
        {repeatedText}
      </div>
      <div className="animate-marquee-full flex-shrink-0 px-2">
        {repeatedText}
      </div>
    </div>
  );
};

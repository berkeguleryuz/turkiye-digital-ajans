import React from "react";
import { Layers, Box, Grid3X3 } from "lucide-react";

export const Philosophy: React.FC = () => {
  return (
    <section className="py-24 bg-white text-black border-b-4 border-black relative">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-12 items-start">
          <div className="w-full">
            <div className="bg-black text-white inline-block px-4 py-1 font-mono font-bold mb-6">
              Türkiye Digital
            </div>
            <h2 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] mb-12 tracking-tighter">
              Tasarım
              <br />
              <span className="text-[#FF6B6B] text-[50px]">Özgürlüktür.</span>
            </h2>
            <div className="space-y-8 text-xl font-medium">
              <p className="border-l-8 border-black pl-6 leading-relaxed">
                Biz şans eseri oluşan güzelliklere güvenmeyiz. Ölçeklenebilir,
                titiz tasarım sistemleri inşa ederiz.
              </p>
              <p className="font-mono text-sm text-gray-600">
                // Her piksel hesaplanmıştır. <br />
                // Her etkileşim ölçülmüştür. <br />
                // Her satır kodun bir amacı vardır.
              </p>
            </div>
          </div>

          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-[#F0F0F0] border-4 border-black p-8 h-64 flex flex-col justify-between hover:bg-[#CCFF00] transition-colors duration-300">
                <Layers size={48} />
                <span className="font-black text-2xl uppercase">Modüler</span>
              </div>
              <div className="bg-black text-white border-4 border-black p-8 h-64 flex flex-col justify-between shadow-[8px_8px_0px_0px_#FF6B6B]">
                <Box size={48} />
                <span className="font-black text-2xl uppercase">Güçlü</span>
              </div>
              <div className="col-span-2 bg-white border-4 border-black p-8 flex items-center justify-between hover:bg-[#737ef9] transition-colors duration-300">
                <div>
                  <span className="font-mono font-bold block mb-2">
                    İstediğiniz Her Şey
                  </span>
                  <span className="font-black text-4xl uppercase">
                    Bizimle Beraber
                  </span>
                </div>
                <Grid3X3 size={64} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

import React from "react";
import { MoveRight, LayoutGrid, Award, Briefcase, Users } from "lucide-react";
import Link from "next/link";

import { ViewState } from "../types";

interface HeroProps {
  setView?: (view: ViewState) => void;
}

export const Hero: React.FC<HeroProps> = ({ setView }) => {
  return (
    <header className="relative w-full overflow-hidden border-b-4 border-black bg-white">
      <div className="container mx-auto px-4 pt-20 pb-20 relative z-10">
        <div className="flex justify-between items-center mb-16 border-b-2 border-black pb-4">
          <div className="flex items-center gap-2 font-mono font-bold text-sm">
            <Award size={16} /> ÖDÜLLÜ TASARIMLAR
          </div>
          <div className="hidden md:block font-mono text-sm bg-black text-white px-2">
            DURUM: PROJE ALIMINA AÇIK
          </div>
        </div>

        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 lg:col-span-8">
            <div className="inline-block bg-[#CCFF00] border-4 border-black px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_#000]">
              <span className="font-mono font-black tracking-widest text-sm uppercase">
                YARATICI TEKNOLOJİ LABORATUVARI
              </span>
            </div>

            <h1 className="text-6xl md:text-[6rem] font-black uppercase leading-[1] mb-8 tracking-tighter">
              Markanızı
              <br />
              <span className="text-stroke-3 hover:text-black transition-colors duration-500">
                Yükseltin
              </span>
            </h1>

            <p className="text-xl md:text-2xl font-medium max-w-2xl leading-relaxed border-l-8 border-black pl-6 mb-10">
              Sıradan olanı reddediyoruz. Türkiye Digital, vizyoner markalar
              için strateji, tasarım ve teknolojiyi birleştiren uçtan uca
              dijital deneyimler üretir.
            </p>

            <Link
              href="/partner"
              className="group flex items-center gap-4 bg-black text-white text-xl font-bold px-8 py-6 border-4 border-transparent hover:bg-white hover:text-black hover:border-black transition-all neo-brutal-shadow inline-flex"
            >
              PROJENİZİ BAŞLATIN{" "}
              <MoveRight className="group-hover:translate-x-2 transition-transform" />
            </Link>
          </div>

          <div className="hidden lg:col-span-4 lg:flex flex-col justify-between border-l-4 border-black pl-8">
            <div className="relative w-full aspect-square border-4 border-black p-2 group">
              <div className="absolute inset-0 bg-[#CCFF00] scale-0 group-hover:scale-100 transition-transform origin-bottom-right duration-300"></div>
              <div className="relative z-10 h-full w-full border-2 border-black bg-white flex items-center justify-center flex-col gap-2">
                <Briefcase size={48} strokeWidth={1.5} />
                <div className="text-center">
                  <span className="block text-6xl font-black">50+</span>
                  <span className="font-mono text-sm uppercase font-bold">
                    TAMAMLANAN PROJE
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-gray-100 border-4 border-black p-6 mt-8 font-mono text-sm shadow-[8px_8px_0px_0px_#000]">
              <div className="flex justify-between border-b border-black py-2">
                <span className="flex items-center gap-2">
                  <Users size={14} /> MÜŞTERİLER:
                </span>
                <span className="font-bold">GLOBAL</span>
              </div>
              <div className="flex justify-between border-b border-black py-2">
                <span>MEMNUNİYET:</span>
                <span className="font-bold text-green-600">%100</span>
              </div>
              <div className="flex justify-between pt-2">
                <span>TAKVİM:</span>
                <span className="font-bold">MÜSAİT</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-black text-white border-t-4 border-black py-3 overflow-hidden flex">
        <div className="animate-marquee-full whitespace-nowrap font-mono text-sm flex gap-8 flex-shrink-0">
          <span>/// STRATEJİK_PLANLAMA</span>
          <span>/// UI_UX_TASARIM</span>
          <span>/// FULL_STACK_GELİŞTİRME</span>
          <span>/// AI_ÇÖZÜMLERİ</span>
          <span>/// TÜRKİYE_DİJİTAL</span>
          <span>/// STRATEJİK_PLANLAMA</span>
          <span>/// UI_UX_TASARIM</span>
          <span>/// FULL_STACK_GELİŞTİRME</span>
          <span>/// AI_ÇÖZÜMLERİ</span>
          <span>/// TÜRKİYE_DİJİTAL</span>
        </div>
        <div className="animate-marquee-full whitespace-nowrap font-mono text-sm flex gap-8 flex-shrink-0">
          <span>/// STRATEJİK_PLANLAMA</span>
          <span>/// UI_UX_TASARIM</span>
          <span>/// FULL_STACK_GELİŞTİRME</span>
          <span>/// AI_ÇÖZÜMLERİ</span>
          <span>/// TÜRKİYE_DİJİTAL</span>
          <span>/// STRATEJİK_PLANLAMA</span>
          <span>/// UI_UX_TASARIM</span>
          <span>/// FULL_STACK_GELİŞTİRME</span>
          <span>/// AI_ÇÖZÜMLERİ</span>
          <span>/// TÜRKİYE_DİJİTAL</span>
        </div>
      </div>
    </header>
  );
};

import React from "react";
import { ViewState } from "../types";
import {
  PiMapPinDuotone,
  PiEnvelopeDuotone,
  PiSquaresFourDuotone,
} from "react-icons/pi";
import { RiInstagramFill, RiTwitterXFill, RiLinkedinFill } from "react-icons/ri";

interface FooterProps {
  setView: (view: ViewState) => void;
}

export const Footer: React.FC<FooterProps> = ({ setView }) => {
  return (
    <footer className="bg-black text-white border-t-8 border-[#CCFF00]">
      <div className="border-b-4 border-white">
        <div className="container mx-auto px-4 py-20 text-center">
          <h2 className="text-6xl md:text-[10rem] font-black uppercase leading-[0.8] mb-8 hover:text-[#CCFF00] transition-colors duration-300 cursor-default">
            Geleceği
            <br />
            İnşa Et
          </h2>
          <button className="bg-white text-black font-black text-2xl px-12 py-6 border-4 border-transparent hover:bg-[#CCFF00] hover:border-white hover:shadow-[8px_8px_0px_0px_#fff] transition-all">
            PROJE BAŞLAT
          </button>
        </div>
      </div>

      <div className="container mx-auto border-x-4 border-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
          <div className="p-8 border-b-4 md:border-b-0 lg:border-r-4 border-white hover:bg-[#1a1a1a] transition-colors group">
            <div className="mb-4 text-[#CCFF00]">
              <PiMapPinDuotone size={32} />
            </div>
            <h3 className="font-bold text-2xl mb-4">MERKEZ</h3>
            <p className="font-mono text-sm opacity-70 leading-relaxed">
              İzmir, TR
            </p>
          </div>

          <div className="p-8 border-b-4 md:border-b-0 lg:border-r-4 border-white hover:bg-[#1a1a1a] transition-colors group">
            <div className="mb-4 text-[#CCFF00]">
              <PiEnvelopeDuotone size={32} />
            </div>
            <h3 className="font-bold text-2xl mb-4">İLETİŞİM</h3>
            <ul className="font-mono text-sm space-y-4">
              <li>
                <a
                  href="tel:+905357959733"
                  className="hover:text-[#CCFF00] flex items-center gap-2"
                >
                  +90 535 795 97 33
                </a>
              </li>
            </ul>
          </div>

          <div className="p-8 border-b-4 md:border-b-0 lg:border-r-4 border-white hover:bg-[#1a1a1a] transition-colors group">
            <div className="mb-4 text-[#CCFF00]">
              <PiSquaresFourDuotone size={32} />
            </div>
            <h3 className="font-bold text-2xl mb-4">KEŞFET</h3>
            <ul className="font-black text-lg space-y-2 uppercase">
              <li>
                <button
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[#CCFF00] hover:translate-x-2 transition-transform"
                >
                  /// İşler
                </button>
              </li>
              <li>
                <button
                  onClick={() => window.scrollTo(0, 0)}
                  className="hover:text-[#CCFF00] hover:translate-x-2 transition-transform"
                >
                  /// Ajans
                </button>
              </li>
            </ul>
          </div>

          <div className="p-8 hover:bg-[#1a1a1a] transition-colors group flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-4 text-[#CCFF00]">SOSYAL</h3>
              <div className="flex gap-4">
                <a
                  href="#"
                  className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors font-bold"
                >
                  <RiInstagramFill size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors font-bold"
                >
                  <RiTwitterXFill size={20} />
                </a>
                <a
                  href="#"
                  className="w-12 h-12 border-2 border-white flex items-center justify-center hover:bg-white hover:text-black transition-colors font-bold"
                >
                  <RiLinkedinFill size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#CCFF00] text-black py-4 px-4 border-t-4 border-white">
        <div className="container mx-auto flex flex-col md:flex-row justify-between items-center font-mono font-bold text-xs md:text-sm">
          <div>&copy; 2026 TÜRKİYE DİGİTAL AJANSI. TÜM HAKLARI SAKLIDIR.</div>
        </div>
      </div>
    </footer>
  );
};

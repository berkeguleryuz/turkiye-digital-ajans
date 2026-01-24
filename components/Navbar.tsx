import React, { useState } from "react";
import { ViewState } from "../types";
import Link from "next/link";
import Image from "next/image";
import { RiMenuFill, RiCloseFill } from "react-icons/ri";

interface NavbarProps {
  currentView: ViewState;
  setView: (view: ViewState) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentView, setView }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [{ label: "ANA SAYFA", view: ViewState.HOME }];

  return (
    <nav className="sticky top-0 z-50 w-full border-b-4 border-black bg-white">
      <div className="flex items-center justify-between px-4 py-3 md:px-8 relative">
        <div
          className="cursor-pointer flex items-center gap-3 group"
          onClick={() => setView(ViewState.HOME)}
        >
          <div className="relative h-10 w-10 border-4 border-black group-hover:scale-125 transition-transform duration-500 flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
            <Image src="/tdlogo.png" alt="Logo" width={240} height={240} />
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-2xl font-black tracking-tighter transition-colors uppercase">
              TÜRKİYE DİGİTAL
            </span>
            <span className="text-[10px] font-mono bg-black text-white px-1 w-max">
              TR
            </span>
          </div>
        </div>

        <div className="hidden md:flex gap-4 items-center">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setView(item.view)}
              className={`
                text-lg font-bold px-4 py-2 border-4 border-transparent transition-all duration-200
                ${
                  currentView === item.view
                    ? "bg-black text-white -rotate-2 shadow-[4px_4px_0px_0px_#CCFF00]"
                    : "hover:border-black hover:shadow-[4px_4px_0px_0px_#000] hover:-translate-y-1"
                }
              `}
            >
              {item.label}
            </button>
          ))}

          <Link
            href="/partner"
            className={`px-6 py-2 font-bold border-4 border-black shadow-[4px_4px_0px_0px_#000] active:translate-x-1 active:translate-y-1 active:shadow-none transition-all
                ${
                  currentView === ViewState.JOIN
                    ? "bg-white text-black"
                    : "bg-[#FF00FF] text-white hover:bg-white hover:text-black"
                }
            `}
          >
            PROJE YAPALIM
          </Link>
        </div>

        <button
          className="md:hidden bg-[#CCFF00] border-4 border-black p-2 shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-[2px] active:translate-y-[2px]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <RiCloseFill size={24} /> : <RiMenuFill size={24} />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full border-b-4 border-black bg-[#FDFD96] p-4 flex flex-col gap-4 shadow-xl z-50">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => {
                setView(item.view);
                setIsMenuOpen(false);
              }}
              className="text-left text-xl font-black border-4 border-black bg-white p-4 shadow-[4px_4px_0px_0px_#000] active:shadow-none active:translate-x-1 active:translate-y-1"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/partner"
            onClick={() => setIsMenuOpen(false)}
            className="text-left text-xl font-black border-4 border-black bg-[#FF00FF] text-white p-4 shadow-[4px_4px_0px_0px_#000] block"
          >
            PROJE YAPALIM
          </Link>
        </div>
      )}
    </nav>
  );
};

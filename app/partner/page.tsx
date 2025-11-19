"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { JoinNetwork } from "@/components/JoinNetwork";
import { ViewState } from "@/types";
import { useRouter } from "next/navigation";

export default function PartnerPage() {
  const [view, setView] = useState<ViewState>(ViewState.JOIN);
  const router = useRouter();

  const handleSetView = (newView: ViewState) => {
    if (newView === ViewState.HOME) {
      router.push("/");
    } else {
      setView(newView);
    }
  };

  return (
    <div className="min-h-screen font-sans selection:bg-[#CCFF00] selection:text-black flex flex-col">
      <Navbar currentView={view} setView={handleSetView} />
      <div className="flex-grow">
        <JoinNetwork />
      </div>
      <Footer setView={handleSetView} />
    </div>
  );
}

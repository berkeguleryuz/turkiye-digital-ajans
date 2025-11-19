import React from "react";
import { X, CheckCircle, AlertTriangle, Info } from "lucide-react";

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  message: string;
  type?: "success" | "error" | "info" | "warning";
}

export const Dialog: React.FC<DialogProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "info",
}) => {
  if (!isOpen) return null;

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle size={32} className="text-black" />;
      case "error":
        return <AlertTriangle size={32} className="text-black" />;
      case "warning":
        return <AlertTriangle size={32} className="text-black" />;
      default:
        return <Info size={32} className="text-black" />;
    }
  };

  const getHeaderColor = () => {
    switch (type) {
      case "success":
        return "bg-[#CCFF00]";
      case "error":
        return "bg-[#FF00FF]";
      case "warning":
        return "bg-[#00FFFF]";
      default:
        return "bg-white";
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_#000] max-w-md w-full animate-in fade-in zoom-in duration-200">
        <div
          className={`flex items-center justify-between p-4 border-b-4 border-black ${getHeaderColor()}`}
        >
          <div className="flex items-center gap-3">
            {getIcon()}
            <h3 className="font-black text-xl uppercase">{title}</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 hover:bg-black hover:text-white transition-colors border-2 border-transparent hover:border-white"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-6">
          <p className="font-bold text-lg mb-6">{message}</p>
          <button
            onClick={onClose}
            className="w-full bg-black text-white p-4 font-black text-xl hover:bg-gray-800 transition-colors uppercase"
          >
            ANLAŞILDI
          </button>
        </div>
      </div>
    </div>
  );
};

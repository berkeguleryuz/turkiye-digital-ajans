import React, { useState } from "react";
import {
  PiRocketLaunchDuotone,
  PiHandshakeDuotone,
  PiHeadsetDuotone,
  PiCheckCircleDuotone,
  PiArrowRightBold,
  PiCurrencyCircleDollar,
} from "react-icons/pi";
import { TbCurrencyLira } from "react-icons/tb";

export const JoinNetwork: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    projectType: "web",
    budget: "startup",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/proposals", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitted(true);
      } else {
        alert("Bir hata oluştu. Lütfen tekrar deneyin.");
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  if (submitted) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-[#F0F0F0] p-4">
        <div className="bg-black text-[#CCFF00] p-8 md:p-16 max-w-2xl text-center border-4 border-black shadow-[16px_16px_0px_0px_#CCFF00]">
          <PiCheckCircleDuotone size={64} className="mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black uppercase mb-4">
            Teklif Alındı
          </h2>
          <p className="font-mono text-lg mb-8 text-white">
            Proje detaylarınız veritabanımıza işlendi. Strateji ekibimiz 24 saat
            içinde sizinle iletişime geçerek bir yol haritası sunacak.
          </p>
          <div className="bg-[#CCFF00] text-black font-bold py-2 px-4 inline-block font-mono text-sm">
            REF: {Math.random().toString(36).substr(2, 9).toUpperCase()}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage:
            "linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      ></div>

      <div className="container mx-auto px-4 py-12 md:py-24 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          <div className="lg:w-1/2 sticky top-24">
            <div className="inline-flex items-center gap-2 bg-black text-white px-3 py-1 font-mono text-xs font-bold mb-6">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              PROJE ALIMLARI: AÇIK
            </div>
            <h1 className="text-6xl md:text-8xl font-black uppercase leading-[0.85] mb-8 tracking-tighter">
              Birlikte
              <br />
              <span className="text-[#FF00FF] text-stroke-3">Üretelim.</span>
            </h1>
            <p className="text-xl font-medium mb-8 leading-relaxed">
              Fikrinizi dijital bir şaheser haline getirelim. İster yeni bir
              girişim, ister köklü bir kurumsal dönüşüm olsun; ekibimiz hazır.
            </p>

            <div className="grid grid-cols-1 gap-4 font-mono text-sm">
              <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4">
                <div className="bg-[#CCFF00] p-2 border-2 border-black">
                  <PiRocketLaunchDuotone size={24} />
                </div>
                <div>
                  <h3 className="font-bold">HIZLI TESLİMAT</h3>
                  <p className="text-gray-600">
                    Agile metodolojisi ile hızlı prototipleme.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4 border-b-2 border-gray-200 pb-4">
                <div className="bg-[#4ECDC4] p-2 border-2 border-black">
                  <PiHandshakeDuotone size={24} />
                </div>
                <div>
                  <h3 className="font-bold">ŞEFFAF SÜREÇ</h3>
                  <p className="text-gray-600">
                    Her aşamada detaylı raporlama ve iletişim.
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="bg-[#FF6B6B] p-2 border-2 border-black">
                  <PiHeadsetDuotone size={24} />
                </div>
                <div>
                  <h3 className="font-bold">7/24 DESTEK</h3>
                  <p className="text-gray-600">
                    Proje sonrası bakım ve teknik destek.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/2 w-full">
            <div className="bg-[#F0F0F0] border-4 border-black p-2 relative shadow-[12px_12px_0px_0px_#000]">
              <div className="bg-black text-white p-4 mb-2 flex justify-between items-center font-mono font-bold">
                <span>TEKLIF_FORMU.DOC</span>
                <div className="flex gap-1">
                  <div className="w-3 h-3 bg-[#CCFF00] rounded-full"></div>
                  <div className="w-3 h-3 bg-[#CCFF00] rounded-full"></div>
                </div>
              </div>

              <div className="bg-white border-4 border-black p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block font-black uppercase text-sm mb-2">
                        Adınız Soyadınız
                      </label>
                      <input
                        required
                        type="text"
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                        className="w-full bg-gray-50 border-4 border-black p-3 font-mono focus:outline-none focus:bg-[#CCFF00] transition-colors"
                        placeholder="Ad Soyad"
                      />
                    </div>
                    <div>
                      <label className="block font-black uppercase text-sm mb-2">
                        Şirket Adı
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) =>
                          setFormData({ ...formData, company: e.target.value })
                        }
                        className="w-full bg-gray-50 border-4 border-black p-3 font-mono focus:outline-none focus:bg-[#CCFF00] transition-colors"
                        placeholder="Firma Ltd."
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-black uppercase text-sm mb-2">
                      E-posta Adresi
                    </label>
                    <input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full bg-gray-50 border-4 border-black p-3 font-mono focus:outline-none focus:bg-[#CCFF00] transition-colors"
                      placeholder="ornek@sirket.com"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase text-sm mb-2">
                      Proje Türü
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      {[
                        { id: "web", label: "Web Sitesi" },
                        { id: "mobile", label: "Mobil Uygulama" },
                        { id: "branding", label: "Markalama" },
                        { id: "marketing", label: "Dijital Pazarlama" },
                      ].map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() =>
                            setFormData({ ...formData, projectType: type.id })
                          }
                          className={`border-4 border-black p-3 text-xs font-bold uppercase transition-all ${
                            formData.projectType === type.id
                              ? "bg-black text-white"
                              : "hover:bg-gray-200 bg-gray-50"
                          }`}
                        >
                          {type.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block font-black uppercase text-sm mb-2">
                      Bütçe Aralığı
                    </label>
                    <div className="relative">
                      <TbCurrencyLira
                        className="absolute left-3 top-3.5 text-gray-500"
                        size={18}
                      />
                      <select
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                        className="w-full bg-gray-50 border-4 border-black p-3 pl-10 font-mono focus:outline-none focus:bg-[#CCFF00] transition-colors appearance-none"
                      >
                        <option value="startup">50.000₺ - 100.000₺</option>
                        <option value="business">100.000₺ - 250.000₺</option>
                        <option value="enterprise">250.000₺ +</option>
                      </select>
                    </div>
                  </div>

                  <div className="pt-4 border-t-2 border-dashed border-gray-300 mt-6">
                    <button
                      type="submit"
                      className="w-full bg-[#FF00FF] text-white font-black text-xl py-4 border-4 border-black shadow-[4px_4px_0px_0px_#000] hover:translate-x-1 hover:translate-y-1 hover:shadow-none hover:bg-black hover:text-white transition-all flex justify-center items-center gap-2"
                    >
                      TEKLİF İSTE <PiArrowRightBold size={24} />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

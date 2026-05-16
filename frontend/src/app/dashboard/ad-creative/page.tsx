"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Check, ChevronDown, TrendingUp } from "lucide-react";

export default function AdCreativePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#0A0D14] overflow-x-hidden relative font-sans">
      
      {/* Navbar (Simplified) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 px-6 py-3 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-12 text-[10px] font-black uppercase tracking-[0.3em] text-slate-400">
            <span className="cursor-pointer hover:text-[#ED2970] transition">Özellikler</span>
            <span className="cursor-pointer hover:text-[#ED2970] transition">Çözümler</span>
            <span className="cursor-pointer hover:text-[#ED2970] transition">Kurumsal</span>
            <span className="cursor-pointer hover:text-[#ED2970] transition">Fiyatlandırma</span>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#FFEDF4] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#F0F2FF] rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10 mb-32">
          
          {/* LEFT SIDE: Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tighter text-[#0A0D14] mb-6">
                Dönüşüm Oranınızı<br />
                Artıracak Reklam<br />
                Kreatifinizi Oluşturun
              </h1>
              <p className="text-[#4B5563] text-lg leading-relaxed max-w-md font-medium opacity-80">
                AI sayesinde saniyeler içinde dönüşüm odaklı reklam görselleri oluşturun. Markanıza uyacak şekilde saniyeler içinde özelleştirin.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-sm"
            >
              {/* Prompt Input area */}
              <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col gap-5 group transition-all hover:shadow-[0_30px_70px_rgba(237,41,112,0.06)]">
                <div className="flex items-center gap-2">
                   <div className="px-3 py-1 bg-rose-50 rounded-full flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ED2970]" />
                      <span className="text-[9px] font-black text-[#ED2970] uppercase tracking-[0.2em] italic">AI Studio</span>
                   </div>
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Kreatifinizi anlatın..."
                  className="w-full h-20 bg-transparent border-none resize-none focus:ring-0 p-0 text-[#0A0D14] placeholder:text-slate-300 font-bold text-sm italic"
                />
                <button 
                  onClick={() => setIsGenerating(true)}
                  className="bg-[#ED2970] text-white px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#D52464] transition-all shadow-xl shadow-[#ED2970]/20 flex items-center justify-center gap-2"
                >
                  {isGenerating ? "Processing..." : "Kreatif Oluştur"}
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: Removed assets, added visual element placeholder */}
          <div className="w-full lg:w-1/2 flex justify-center">
             <div className="w-full max-w-[500px] aspect-square bg-[#F5F5F4] rounded-[3rem] border border-white shadow-xl flex items-center justify-center overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-100/30 to-transparent"></div>
                <Sparkles className="w-20 h-20 text-[#ED2970]/10" />
             </div>
          </div>
        </div>

        {/* --- NEW SECTION: Tahmine Dayalı Performans --- */}
        <section className="mt-40">
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
              {/* Left Side: Text Content */}
              <div>
                 <div className="text-[#ED2970] font-black text-lg tracking-tight mb-4 italic uppercase">
                    Tahmine Dayalı Performans Yapay Zekası
                 </div>
                 <h2 className="text-4xl md:text-5xl font-black text-[#0A0D14] mb-8 leading-[1.1] tracking-tighter">
                    Veriye Dayalı, Yüksek Performans için Tasarlanmış AI Reklam İçerikleri
                 </h2>
                 <p className="text-[#4B5563] text-lg leading-relaxed mb-10 font-medium">
                    Mağazanızdan topladığımız veriler, istediğiniz rakiplerin analizi ve sizlerin verdiği bilgiler ile reklam kreatifinizi oluşturuyoruz. Böylece daha yüksek tıklama oranı (CTR) ve dönüşüm potansiyeline sahip reklam öğelerini belirlemenize yardımcı olur. Hangi reklam öğesinin işe yarayacağını tahmin etmek yerine, veriye dayalı varyasyonlara öncelik verebilir ve ilk günden itibaren boşa giden reklam harcamalarını azaltabilirsiniz.
                 </p>
                 
                 <div className="space-y-5">
                    <div className="flex items-center gap-4">
                       <Check className="w-5 h-5 text-[#ED2970]" />
                       <span className="text-slate-700 font-bold">Yapay zekamızı reklam hesabı verilerinizle eğitin,</span>
                    </div>
                    <div className="flex items-center gap-4">
                       <Check className="w-5 h-5 text-[#ED2970]" />
                       <span className="text-slate-700 font-bold">14 kata kadar daha yüksek dönüşüm oranları elde edin.</span>
                    </div>
                 </div>
              </div>

              {/* Right Side: Visual Mockup */}
              <div className="relative">
                 <div className="bg-[#F5F5F4] rounded-[3rem] border border-white p-8 shadow-2xl relative overflow-visible">
                    
                    {/* Main Image Background */}
                    <div className="aspect-[4/3] w-full rounded-[2.5rem] overflow-hidden relative">
                       <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1000')] bg-cover bg-center"></div>
                       <div className="absolute inset-x-4 top-4 bottom-4 border-4 border-yellow-400 rounded-3xl z-10"></div>
                       
                       <div className="absolute bottom-6 left-6 right-6 bg-white py-6 px-8 rounded-2xl z-20 shadow-xl text-center">
                          <h3 className="text-3xl font-black text-slate-900 tracking-tighter uppercase leading-none mb-1">BUILDING TRUST!</h3>
                          <p className="text-[10px] font-bold text-slate-400">Your reliable partner in quality.</p>
                       </div>
                    </div>

                    {/* Floating 99/100 Score Card */}
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-12 -right-8 w-72 bg-white rounded-[2.5rem] p-8 shadow-[0_30px_70px_rgba(0,0,0,0.1)] border border-slate-50 z-30"
                    >
                       <div className="flex items-center justify-between mb-4">
                          <div className="flex items-baseline gap-1">
                             <span className="text-4xl font-black text-slate-900 tracking-tighter">99</span>
                             <span className="text-slate-300 font-bold text-lg">/100</span>
                          </div>
                          <div className="w-8 h-8 rounded-full border-2 border-rose-500 flex items-center justify-center">
                             <TrendingUp className="w-4 h-4 text-rose-500" />
                          </div>
                       </div>
                       <h4 className="text-[#ED2970] font-black text-xl mb-1 tracking-tight">Dönüşüm Puanı</h4>
                       <p className="text-[10px] font-black text-slate-900 mb-3 uppercase tracking-wider">Yapay Zeka Performans Tahmin Puanı</p>
                       <p className="text-[10px] text-slate-400 leading-relaxed font-medium">
                          Gelişmiş AI modelimiz bu reklamın sektör ortalamasının %90 üzerinde performans göstereceğini tahmin ediyor.
                       </p>
                    </motion.div>

                 </div>
              </div>
           </div>
        </section>

      </main>
    </div>
  );
}

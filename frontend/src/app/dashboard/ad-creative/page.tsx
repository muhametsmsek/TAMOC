"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, ChevronDown, TrendingUp, Users, BarChart3, Globe } from "lucide-react";

export default function AdCreativePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#0A0D14] overflow-x-hidden relative font-sans">
      
      {/* Navbar */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 pointer-events-none">
        <div className="max-w-7xl mx-auto h-16 pointer-events-auto flex items-center justify-center">
          {/* Navigasyon linkleri kaldırıldı */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#FFEDF4] rounded-full blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#F0F2FF] rounded-full blur-[120px] pointer-events-none opacity-60" />

        {/* HERO SECTION */}
        <div className="flex flex-col gap-10 items-start relative z-10 mb-16 max-w-2xl mx-auto lg:mx-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h1 className="HeaderLabel text-4xl md:text-6xl text-[#0A0D14] mb-4">
              Dönüşüm Oranınızı<br />
              Artıracak Reklam<br />
              Kreatifinizi Oluşturun
            </h1>
            <p className="text-[#4B5563] text-lg leading-relaxed max-w-md font-medium opacity-80">
              AI sayesinde saniyeler içinde dönüşüm odaklı reklam görselleri oluşturun. Markanıza uyacak şekilde saniyeler içinde özelleştirin.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-sm"
          >
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col gap-5 transition-all">
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
                {isGenerating ? "Üretiliyor..." : "Kreatif Oluştur"}
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>

        {/* --- PERFORMANCE SECTION --- */}
        <section className="mt-10">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8 }}
             className="bg-white rounded-[3.5rem] p-8 md:p-14 shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-white relative overflow-visible"
           >
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                 
                 {/* Left Column */}
                 <div className="flex flex-col justify-center">
                    <h2 className="HeaderLabel text-3xl md:text-5xl text-[#0A0D14] mb-8">
                       Veriye Dayalı, Yüksek Performans için Tasarlanmış AI Reklam İçerikleri
                    </h2>
                    <p className="text-[#4B5563] text-lg leading-relaxed mb-10 font-medium opacity-80">
                       Mağazanızdan topladığımız veriler, istediğiniz rakiplerin analizi ve sizlerin verdiği bilgiler ile reklam kreatifinizi oluşturuyoruz.
                    </p>
                    
                    <div className="space-y-4 mb-10">
                       <div className="flex items-center gap-4">
                          <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                          <span className="text-slate-700 font-bold">Yapay zekamızı reklam hesabı verilerinizle eğitin,</span>
                       </div>
                       <div className="flex items-center gap-4">
                          <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                          <span className="text-slate-700 font-bold">Çok daha yüksek dönüşüm oranları elde edin.</span>
                       </div>
                    </div>
                 </div>

                 {/* Right Column: Visual Mockup */}
                 <div className="bg-[#FAF9FB] rounded-[3rem] p-8 border border-slate-50 relative flex flex-col gap-8 shadow-inner overflow-visible">
                    
                    {/* 1. Dönüşüm Puanı */}
                    <div className="flex justify-between items-center bg-white p-8 rounded-3xl border border-white shadow-sm overflow-visible">
                       <div className="flex flex-col">
                          <span className="HeaderLabel text-[3rem] text-[#0A0D14] italic leading-none block">99<span className="text-sm font-bold text-slate-300 not-italic ml-1">/100</span></span>
                          <span className="text-[12px] font-black text-[#ED2970] uppercase tracking-[0.3em] mt-3 italic">Dönüşüm Puanı</span>
                       </div>
                       <TrendingUp className="w-12 h-12 text-[#ED2970] opacity-40 shrink-0" />
                    </div>

                    {/* 2. Rakibiniz */}
                    <div className="space-y-4 px-4">
                       <div className="HeaderLabel text-lg text-[#0A0D14] italic uppercase tracking-normal">Rakibiniz</div>
                       <div className="bg-white/90 rounded-2xl p-5 border border-white shadow-sm flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-300">www.yourcompetitor.com</span>
                          <Globe className="w-5 h-5 text-slate-200" />
                       </div>
                    </div>

                    {/* 3. Cinsiyet */}
                    <div className="space-y-4 px-4">
                       <div className="HeaderLabel text-lg text-[#0A0D14] italic uppercase tracking-normal">Cinsiyet</div>
                       <div className="h-12 w-full bg-white rounded-2xl overflow-hidden flex p-2 border border-white shadow-sm relative">
                          <div className="h-full bg-[#ED2970] w-[45%] rounded-xl flex items-center px-4 shadow-sm">
                             <span className="text-[10px] font-black text-white italic tracking-widest">KADIN 45%</span>
                          </div>
                          <div className="h-full flex-1 flex items-center justify-end px-4">
                             <span className="text-[10px] font-bold text-slate-300">ERKEK 55%</span>
                          </div>
                       </div>
                    </div>

                    {/* 4. Yaş Dağılımı */}
                    <div className="space-y-4 px-4 overflow-visible">
                       <div className="HeaderLabel text-lg text-[#0A0D14] italic uppercase tracking-normal">Yaş Dağılımı</div>
                       <div className="flex items-end justify-between h-40 gap-4 px-8 bg-white/60 p-8 rounded-[2.5rem] border border-white shadow-sm relative overflow-hidden">
                          
                          {/* PROMINENT VERTICAL GRID LINES */}
                          <div className="absolute inset-0 flex justify-between px-8 pointer-events-none">
                             {[1,2,3,4,5,6,7].map((i) => (
                                <div key={i} className="w-[2px] h-full bg-slate-100/50 border-l border-slate-200/20"></div>
                             ))}
                          </div>

                          {[
                             { label: "18-24", h: 35 },
                             { label: "24-30", h: 100, active: true },
                             { label: "30-40", h: 65 },
                             { label: "40-50", h: 45 },
                             { label: "50-60", h: 30 },
                             { label: "60+", h: 20 }
                          ].map((item, i) => (
                             <div key={i} className="flex-1 flex flex-col gap-3 items-center relative z-10 h-full justify-end">
                                <div 
                                  className={`w-full rounded-lg transition-all duration-700 border-2 ${item.active ? 'bg-[#ED2970] border-[#ED2970] shadow-xl shadow-[#ED2970]/30' : 'bg-transparent border-slate-50 opacity-10'}`} 
                                  style={{ height: `${item.h}%` }}
                                ></div>
                                <span className="text-[9px] font-black text-slate-400 uppercase italic whitespace-nowrap">{item.label}</span>
                             </div>
                          ))}
                       </div>
                    </div>

                 </div>

              </div>
           </motion.div>
        </section>

      </main>
    </div>
  );
}

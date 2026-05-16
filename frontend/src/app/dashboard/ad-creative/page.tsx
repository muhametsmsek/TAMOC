"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Check, ChevronDown, MousePointer2 } from "lucide-react";

export default function AdCreativePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#0A0D14] overflow-x-hidden relative font-sans">
      
      {/* Navbar (Simplified) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto bg-white/60 backdrop-blur-md rounded-2xl border border-white/40 px-6 py-3 flex items-center justify-center">
          <div className="hidden md:flex items-center gap-12 text-xs font-bold uppercase tracking-widest text-slate-400">
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

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center relative z-10">
          
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
              className="w-full max-w-sm" // Smaller width as requested
            >
              {/* Prompt Input area - Smaller Rectangular Box */}
              <div className="bg-white p-5 rounded-[2rem] shadow-[0_20px_50px_rgba(0,0,0,0.03)] border border-white flex flex-col gap-4 group transition-all hover:shadow-[0_20px_60px_rgba(237,41,112,0.05)]">
                <div className="flex items-center gap-2">
                   <div className="w-2 h-2 rounded-full bg-[#ED2970] animate-pulse" />
                   <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">AI Studio</span>
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Kreatifinizi anlatın..."
                  className="w-full h-20 bg-transparent border-none resize-none focus:ring-0 p-0 text-[#0A0D14] placeholder:text-slate-300 font-bold text-sm"
                />
                <button 
                  onClick={() => setIsGenerating(true)}
                  className="bg-[#ED2970] text-white px-6 py-3.5 rounded-xl font-black text-xs uppercase tracking-widest hover:bg-[#D52464] transition-all shadow-lg shadow-[#ED2970]/20 flex items-center justify-center gap-2"
                >
                  {isGenerating ? "Üretiliyor..." : "Kreatif Oluştur"}
                  <Sparkles className="w-3 h-3" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: The Visuals (Simplified) */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="w-full max-w-[560px] flex flex-col items-center"
            >
              
              {/* Middle Node: Button (Now the main focus since top cards are removed) */}
              <div className="relative z-20 flex justify-center mb-16 scale-110">
                <div className="relative">
                  <div className="bg-[#ED2970] text-white font-black px-14 py-5 rounded-2xl shadow-2xl shadow-[#ED2970]/40 text-xl tracking-tighter">
                    Oluştur
                  </div>
                  <div className="absolute -bottom-6 -right-6 animate-bounce">
                     <MousePointer2 className="w-8 h-8 text-[#ED2970] fill-[#ED2970] stroke-white stroke-[3px]" />
                  </div>
                </div>
              </div>

              {/* Bottom: Generated Assets Card */}
              <div className="bg-white rounded-[3rem] p-10 shadow-[0_40px_120px_rgba(0,0,0,0.07)] border border-white w-full relative">
                <div className="absolute -top-6 -left-6 w-12 h-12 bg-rose-100 rounded-2xl blur-xl opacity-50" />
                
                <div className="flex items-center justify-between mb-8">
                   <div className="text-xs font-black text-slate-800 uppercase tracking-widest">AI Generated Assets</div>
                   <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                      <div className="w-2 h-2 rounded-full bg-[#ED2970]"></div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 gap-6">
                  {[1,2,3,4].map((i) => (
                    <div key={i} className="bg-[#1A1121] rounded-[2rem] aspect-[4/5] relative overflow-hidden group shadow-sm transition-all hover:scale-[1.03] hover:rotate-1">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000')] bg-cover bg-center opacity-40 grayscale group-hover:grayscale-0 transition-all duration-500"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ED2970]/40 to-transparent"></div>
                      <div className="absolute inset-0 p-5 flex flex-col">
                        <div className="bg-white/95 backdrop-blur-md text-[10px] font-black text-slate-900 rounded-full px-3 py-1.5 self-start flex items-center gap-1 shadow-xl">
                          SCORE: {100 - i*2}
                        </div>
                        <div className="mt-auto text-white">
                          <h4 className="text-base font-black leading-[1.1] tracking-tight">Don't Miss<br/>the Music!</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-10 flex justify-center">
                  <button className="flex items-center gap-2 text-slate-300 hover:text-[#ED2970] font-black text-[10px] uppercase tracking-[0.2em] transition-all">
                    <Play className="w-4 h-4 fill-current" />
                    Replay Animation
                  </button>
                </div>
              </div>

            </motion.div>
          </div>

        </div>
      </main>
    </div>
  );
}

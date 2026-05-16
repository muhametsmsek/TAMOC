"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Play, Sparkles, Check, ChevronDown, MousePointer2 } from "lucide-react";

export default function AdCreativePage() {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#0A0D14] overflow-x-hidden relative font-sans">
      
      {/* Navbar (Mock) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3">
        <div className="max-w-7xl mx-auto bg-white/90 backdrop-blur-md rounded-2xl shadow-sm border border-slate-100 px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-slate-900 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl leading-none">T</span>
            </div>
            <span className="font-extrabold text-xl tracking-tight">TAMOC.ai</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
            <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">Özellikler <ChevronDown className="w-4 h-4"/></span>
            <span className="flex items-center gap-1 cursor-pointer hover:text-slate-900">Çözümler <ChevronDown className="w-4 h-4"/></span>
            <span className="cursor-pointer hover:text-slate-900">Kurumsal</span>
            <span className="cursor-pointer hover:text-slate-900">Fiyatlandırma</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm font-semibold cursor-pointer">Giriş</span>
            <button className="bg-[#f3f0f1] text-[#ED2970] px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-[#eadee2] transition">
              Şimdi Ücretsiz Deneyin
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#FFEDF4] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#F0F2FF] rounded-full blur-[120px] pointer-events-none" />

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start relative z-10">
          
          {/* LEFT SIDE: Content */}
          <div className="w-full lg:w-1/2 flex flex-col gap-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-black leading-tight tracking-tight text-[#0A0D14] mb-6">
                Dönüşüm Oranınızı<br />
                Artıracak Reklam<br />
                Kreatifinizi Oluşturun
              </h1>
              <p className="text-[#4B5563] text-lg leading-relaxed max-w-lg font-medium">
                AI sayesinde saniyeler içinde dönüşüm odaklı reklam görselleri oluşturun. Sınırsız sayıda varyasyon oluşturun, yayınlamadan önce performans puanlaması alın ve markanıza uyacak şekilde özelleştirin.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="w-full max-w-lg"
            >
              {/* Prompt Input area */}
              <div className="bg-white p-4 rounded-3xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-slate-100 flex flex-col gap-4 group">
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 rounded-full self-start">
                   <Sparkles className="w-3 h-3 text-[#ED2970]" />
                   <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">AI Prompt</span>
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Kreatifinizin nasıl olmasını istersiniz? (Örn: Enerjik, yaz temalı...)"
                  className="w-full h-24 bg-transparent border-none resize-none focus:ring-0 p-2 text-[#0A0D14] placeholder:text-slate-400 font-medium text-base"
                />
                <button 
                  onClick={() => setIsGenerating(true)}
                  className="bg-[#ED2970] text-white px-8 py-4 rounded-2xl font-bold text-base hover:bg-[#D52464] transition-all shadow-lg shadow-[#ED2970]/20 flex items-center justify-center gap-2"
                >
                  {isGenerating ? "Hazırlanıyor..." : "Kreatif Oluştur"}
                  <Sparkles className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          </div>

          {/* RIGHT SIDE: The Diagram */}
          <div className="w-full lg:w-1/2 flex justify-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
              className="w-full max-w-[640px] flex flex-col items-center"
            >
              
              {/* Top Row: Parameters */}
              <div className="flex flex-wrap justify-center gap-3 relative z-20 mb-8">
                {[
                  { title: "Marka", desc: "ROCK & ROLL", active: true },
                  { title: "Boyut", desc: "1080×1920", active: true },
                  { title: "Metinler", desc: "Kariyer kilidini aç...", active: true },
                  { title: "Resim", desc: "[Görsel]", isImage: true, active: true },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-2xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-50 min-w-[130px] flex flex-col gap-2">
                    <div className="flex justify-between items-center border-b border-slate-50 pb-1 mb-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{item.title}</span>
                      <Check className="w-3 h-3 text-[#ED2970]" />
                    </div>
                    {item.isImage ? (
                      <div className="h-10 w-full bg-slate-900 rounded-lg overflow-hidden relative">
                         <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1493225457124-a1a2a5f5cb39?q=80&w=1000')] bg-cover bg-center"></div>
                      </div>
                    ) : (
                      <div className="text-sm font-black text-slate-800 line-clamp-1">
                        {item.desc}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Middle Node: Button */}
              <div className="relative z-20 flex justify-center mb-12">
                <div className="relative">
                  <div className="bg-[#ED2970] text-white font-bold px-12 py-4 rounded-2xl shadow-xl shadow-[#ED2970]/30 text-lg">
                    Oluştur
                  </div>
                  <div className="absolute -bottom-4 -right-4 animate-bounce">
                     <MousePointer2 className="w-6 h-6 text-[#ED2970] fill-[#ED2970] stroke-white" />
                  </div>
                </div>
              </div>

              {/* Bottom: Generated Assets Card */}
              <div className="bg-white rounded-[32px] p-8 shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-slate-50 w-full">
                <div className="flex items-center justify-between mb-6">
                   <div className="text-sm font-bold text-slate-800">AI Generated Assets</div>
                   <div className="flex gap-1">
                      <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                      <div className="w-2 h-2 rounded-full bg-slate-100"></div>
                   </div>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {[1,2,3,4,5,6].map((i) => (
                    <div key={i} className="bg-[#1A1121] rounded-2xl aspect-[4/5] relative overflow-hidden group shadow-sm transition-transform hover:scale-[1.02]">
                      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?q=80&w=1000')] bg-cover bg-center opacity-40"></div>
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ED2970]/60 to-transparent"></div>
                      <div className="absolute inset-0 p-3 flex flex-col">
                        <div className="bg-white/90 backdrop-blur-sm text-[10px] font-bold text-slate-900 rounded-full px-2 py-1 self-start flex items-center gap-1 shadow-sm">
                          Puan: {100 - i*2}
                        </div>
                        <div className="mt-auto text-white">
                          <h4 className="text-sm font-black leading-tight">Don't Miss<br/>the Music!</h4>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 flex justify-center">
                  <button className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm transition">
                    <Play className="w-4 h-4" />
                    Tekrar Oynat
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

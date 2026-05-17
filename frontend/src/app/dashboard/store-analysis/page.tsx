"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Check, Share2, Globe, Search, LayoutTemplate, Zap, ShoppingCart, CheckCircle2, TrendingUp, AlertTriangle, Lightbulb } from "lucide-react";

export default function StoreAnalysisPage() {
  const [storeUrl, setStoreUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string>("");

  const analyze = async () => {
    if (!storeUrl.trim()) return;
    setIsAnalyzing(true);
    setError("");
    setResult(null);
    try {
      const response = await fetch("/api/analyze-store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ storeUrl, platform: "Otomatik", analysisDepth: "Tam" }),
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      setResult(data);
    } catch (e: any) {
      setError(e.message || "Analiz sırasında bir hata oluştu.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        
        {/* LEFT COLUMN: Copywriting & Benefits */}
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-6"
        >
          <div className="flex flex-col gap-2">
            <h3 className="text-[#ED2970] font-black text-lg md:text-xl tracking-tight">
              Web Sitenizi Saniyeler İçinde Tarayın
            </h3>
            <h1 className="HeaderLabel text-4xl md:text-6xl text-[#0A0D14] leading-[1.1]">
              Web Sitenizi Alıcı <br className="hidden md:block"/> İçgörülerine Dönüştürün
            </h1>
          </div>

          <p className="text-[#4B5563] text-lg leading-relaxed font-medium opacity-80 max-w-lg mt-2">
            TAMOC.ai, önemli bilgileri elde etmek için web sitenizi tarar ve mağazanızı güçlendirmek için anında önerileri oluşturur.
          </p>

          <div className="flex flex-col gap-5 mt-6">
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Check className="w-5 h-5 text-slate-400 stroke-[3px]" />
              </div>
              <span className="text-[#4B5563] font-medium text-lg">
                Personaya doğru hitap için otomatik web sitesi taraması.
              </span>
            </div>
            <div className="flex gap-4 items-start">
              <div className="mt-1">
                <Check className="w-5 h-5 text-slate-400 stroke-[3px]" />
              </div>
              <span className="text-[#4B5563] font-medium text-lg">
                Markanıza ve hedeflerinize göre uyarlanmış yapay zeka odaklı içgörüler.
              </span>
            </div>
          </div>
        </motion.div>

        {/* RIGHT COLUMN: Interactive Scanner Tool */}
        <motion.div 
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-[#FAF9FB] rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-inner w-full"
        >
          {/* Main Scanner Box */}
          <div className="bg-white rounded-[2rem] p-6 shadow-[0_20px_40px_rgba(0,0,0,0.03)] border border-slate-50 mb-8 relative z-20">
            <h4 className="text-center font-bold text-slate-800 text-sm md:text-base mb-4">
              Eksikleri tespit etmek ve satış artırmak için web sitenizi tarayın
            </h4>
            
            {/* Input Group */}
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative flex-1">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
                <input
                  type="url"
                  value={storeUrl}
                  onChange={(e) => setStoreUrl(e.target.value)}
                  placeholder="https://www.ornek-magaza.com"
                  className="w-full bg-slate-50/50 border border-slate-200 rounded-2xl pl-12 pr-4 py-4 text-[#0A0D14] placeholder:text-slate-400 font-medium focus:outline-none focus:border-[#ED2970]/40 transition-colors"
                />
              </div>
              <button
                onClick={analyze}
                disabled={isAnalyzing || !storeUrl.trim()}
                className="bg-[#ED2970] disabled:bg-slate-300 text-white px-8 py-4 rounded-2xl font-black text-sm transition-all shadow-lg shadow-[#ED2970]/20 flex items-center justify-center gap-2 hover:bg-[#D52464] shrink-0"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Taranıyor...</span>
                  </>
                ) : (
                  <>
                    <span>Web Sitemi Tara</span>
                    <Search className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Dynamic Content Area (Placeholder or Result) */}
          <div className="relative mt-8 min-h-[350px]">
            <AnimatePresence mode="wait">
              {error && (
                <motion.div
                  key="error"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="bg-rose-50 border border-rose-200 p-6 rounded-[2rem] text-rose-800 text-center font-medium"
                >
                  {error}
                </motion.div>
              )}

              {!result && !error && !isAnalyzing && (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center"
                >
                  {/* Left Mock List */}
                  <div className="flex flex-col gap-6 pl-2">
                    {[
                      { title: "Ana Sayfa Düzeni", desc: "Kullanıcı deneyimi & hız" },
                      { title: "Ürün Görselleri", desc: "Kalite & UGC eksiklikleri" },
                      { title: "Dönüşüm & CTA", desc: "Satın alma akışı analizi" },
                    ].map((item, i) => (
                      <div key={i} className="flex gap-3 items-start">
                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 mt-1.5 shrink-0 shadow-[0_0_10px_rgba(52,211,153,0.5)]" />
                        <div className="flex flex-col">
                          <span className="font-bold text-slate-800 text-sm">{item.title}</span>
                          <span className="text-xs text-slate-500 font-medium leading-relaxed mt-0.5">{item.desc}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Right Mockup Graphic */}
                  <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-white/50 h-64 relative overflow-hidden flex flex-col group">
                     <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50 opacity-50" />
                     <div className="w-16 h-2 bg-slate-200 rounded-full mx-auto mb-4 relative z-10" />
                     <div className="w-3/4 h-3 bg-slate-100 rounded-full mx-auto mb-6 relative z-10" />
                     
                     <div className="grid grid-cols-2 gap-3 relative z-10">
                        <div className="bg-slate-50 h-24 rounded-xl border border-slate-100/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                           <LayoutTemplate className="w-6 h-6 text-slate-300" />
                        </div>
                        <div className="bg-slate-50 h-24 rounded-xl border border-slate-100/50 flex items-center justify-center group-hover:scale-105 transition-transform delay-75">
                           <ShoppingCart className="w-6 h-6 text-slate-300" />
                        </div>
                        <div className="bg-slate-50 h-24 rounded-xl border border-slate-100/50 flex items-center justify-center group-hover:scale-105 transition-transform">
                           <Zap className="w-6 h-6 text-slate-300" />
                        </div>
                        <div className="bg-slate-50 h-24 rounded-xl border border-slate-100/50 flex items-center justify-center group-hover:scale-105 transition-transform delay-75">
                           <Globe className="w-6 h-6 text-slate-300" />
                        </div>
                     </div>
                  </div>
                </motion.div>
              )}

              {isAnalyzing && (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex flex-col items-center justify-center h-full gap-4 text-[#ED2970] pt-12"
                >
                  <Loader2 className="w-10 h-10 animate-spin" />
                  <span className="font-bold text-sm tracking-widest uppercase">Mağaza Taranıyor...</span>
                </motion.div>
              )}

              {result && !isAnalyzing && (
                <motion.div
                  key="result"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] p-6 shadow-md border border-slate-100 relative"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-[#ED2970]/5 rounded-full blur-[40px] pointer-events-none" />
                  
                  <div className="flex items-center justify-between mb-6">
                    <h4 className="HeaderLabel text-xl text-slate-800">Analiz Sonucu</h4>
                    <div className="flex items-center gap-1.5 px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-black uppercase tracking-wider">
                       <CheckCircle2 className="w-3.5 h-3.5" />
                       Tamamlandı
                    </div>
                  </div>
                  
                  <div className="h-[400px] overflow-y-auto custom-scrollbar pr-2 flex flex-col gap-6">
                    {/* Score & Summary */}
                    <div className="flex items-start gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                      <div className="flex flex-col items-center justify-center bg-white w-20 h-20 rounded-xl shadow-sm shrink-0 border border-slate-50">
                        <span className="text-3xl font-black text-[#ED2970]">{result.overallScore}</span>
                        <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">Skor</span>
                      </div>
                      <div className="flex flex-col">
                        <h5 className="font-bold text-slate-800 text-sm mb-1">{result.storeName}</h5>
                        <p className="text-xs text-slate-500 font-medium leading-relaxed italic">
                          "{result.summary}"
                        </p>
                      </div>
                    </div>

                    {/* Critical Issues */}
                    {result.criticalIssues && result.criticalIssues.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h5 className="text-xs font-black uppercase tracking-wider text-rose-500 flex items-center gap-1.5">
                          <AlertTriangle className="w-3.5 h-3.5" /> Kritik Hatalar
                        </h5>
                        {result.criticalIssues.map((issue: any, idx: number) => (
                          <div key={idx} className="bg-rose-50/50 border border-rose-100 p-4 rounded-2xl flex flex-col gap-1.5">
                            <span className="font-bold text-sm text-rose-700">{issue.issue}</span>
                            <span className="text-xs text-rose-600/80 font-medium leading-relaxed">{issue.detail}</span>
                            <div className="mt-2 bg-white px-3 py-2 rounded-xl border border-rose-100 text-[11px] font-medium text-slate-600 flex gap-2 items-start shadow-sm">
                              <span className="text-emerald-500 font-black">Çözüm:</span> {issue.fix}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Quick Wins */}
                    {result.quickWins && result.quickWins.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h5 className="text-xs font-black uppercase tracking-wider text-[#ED2970] flex items-center gap-1.5">
                          <TrendingUp className="w-3.5 h-3.5" /> Hızlı Kazanımlar
                        </h5>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {result.quickWins.map((win: any, idx: number) => (
                            <div key={idx} className="bg-white border border-[#ED2970]/15 p-4 rounded-2xl shadow-sm flex flex-col hover:border-[#ED2970]/40 transition-colors">
                              <span className="font-bold text-sm text-slate-800">{win.action}</span>
                              <div className="flex justify-between mt-3 text-[9px] font-black uppercase tracking-wider text-slate-400">
                                <span>Etki: <span className="text-[#ED2970]">{win.impact}</span></span>
                                <span>{win.timeframe}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* AI Recommendations */}
                    {result.aiRecommendations && result.aiRecommendations.length > 0 && (
                      <div className="flex flex-col gap-3">
                        <h5 className="text-xs font-black uppercase tracking-wider text-purple-600 flex items-center gap-1.5">
                          <Lightbulb className="w-3.5 h-3.5" /> AI Büyüme Fırsatları
                        </h5>
                        {result.aiRecommendations.map((rec: any, idx: number) => (
                          <div key={idx} className="bg-purple-50/40 border border-purple-100 p-4 rounded-2xl flex flex-col gap-1.5">
                            <span className="font-bold text-sm text-purple-800">{rec.title}</span>
                            <span className="text-xs text-purple-600/80 font-medium leading-relaxed">{rec.detail}</span>
                            {rec.tools && rec.tools.length > 0 && (
                              <div className="mt-2 flex flex-wrap gap-2">
                                {rec.tools.map((tool: string, tIdx: number) => (
                                  <span key={tIdx} className="bg-white px-2.5 py-1 rounded-lg border border-purple-100 text-[10px] font-black text-purple-600 uppercase shadow-sm">
                                    {tool}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

      </div>
    </div>
  );
}

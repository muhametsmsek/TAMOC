"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, Check, TrendingUp, Users, BarChart3, PieChart, BrainCircuit } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ResponsiveContainer, CartesianGrid, XAxis, YAxis, Tooltip, Area, AreaChart } from "recharts";

const chartData = [
  { name: '1. Hafta', roas: 2.4 },
  { name: '2. Hafta', roas: 3.1 },
  { name: '3. Hafta', roas: 2.8 },
  { name: '4. Hafta', roas: 4.2 },
  { name: '5. Hafta', roas: 3.9 },
  { name: '6. Hafta', roas: 5.1 },
  { name: '7. Hafta', roas: 4.8 },
];

export default function CompetitorInsightsPage() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleAnalyze = async () => {
    if (!url) return;
    setIsAnalyzing(true);
    setAnalysisResult(null); // Önceki sonuçları temizle
    setErrorMsg(null); // Varsa önceki hatayı temizle
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url })
      });
      const data = await res.json();
      if (!res.ok || data.error) {
        throw new Error(data.error || "Analiz sırasında bir hata oluştu.");
      }
      setAnalysisResult(data);
    } catch (error: any) {
      console.error("Analiz hatası:", error);
      let friendlyError = error.message || "Analiz sırasında bir hata oluştu.";
      if (friendlyError.toLowerCase().includes("quota") || friendlyError.toLowerCase().includes("429") || friendlyError.toLowerCase().includes("too many requests")) {
        friendlyError = "Günlük ücretsiz yapay zeka analiz limitinize ulaştınız. Lütfen yarın tekrar deneyin veya farklı bir API anahtarı kullanın.";
      }
      setErrorMsg(friendlyError);
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#0A0D14] overflow-x-hidden relative font-sans">
      
      {/* Navbar (Simplified) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 pointer-events-none">
        <div className="max-w-7xl mx-auto h-16 pointer-events-auto flex items-center justify-center">
          {/* Navigasyon linkleri kaldırıldı */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen flex flex-col gap-20">
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#FFEDF4] rounded-full blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#F0F2FF] rounded-full blur-[120px] pointer-events-none opacity-60" />

        {/* HERO SECTION */}
        <div className="flex flex-col gap-10 items-start relative z-10 max-w-2xl mx-auto lg:mx-0">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <h1 className="HeaderLabel text-4xl md:text-6xl text-[#0A0D14] mb-4">
              Rakiplerinizi Analiz Edin ve<br />
              Kreatiflerinizi Güçlendirin
            </h1>
            <p className="text-[#4B5563] text-lg leading-relaxed max-w-md font-medium opacity-80">
              Rakiplerinizin reklam stratejilerini çözün, en çok kazandıran kreatiflerini keşfedin ve pazar payınızı artırın.
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="w-full max-w-md"
          >
            {/* URL Input Area */}
            <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col gap-5 transition-all">
              <div className="relative">
                <input 
                  type="text"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://rakibinizin-adresi.com"
                  className="w-full bg-slate-50/50 border border-slate-100 rounded-2xl py-4 px-6 text-[#0A0D14] placeholder:text-slate-300 font-bold text-sm focus:ring-2 focus:ring-[#ED2970]/10 transition-all outline-none"
                />
              </div>
              <button 
                onClick={handleAnalyze}
                disabled={isAnalyzing || !url}
                className="bg-[#ED2970] text-white px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#D52464] disabled:opacity-50 transition-all shadow-xl shadow-[#ED2970]/20 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? "Analiz Ediliyor..." : "Hemen Analiz Et"}
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <Card className="col-span-2 bg-white shadow-xl shadow-slate-200/40 border-slate-100/60 rounded-[2rem] overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-slate-800 font-bold text-xl">Performans Trendi (ROAS vs Harcama)</CardTitle>
              <CardDescription className="text-slate-500 font-medium flex flex-col gap-2">
                <span>Sektörel rakiplerinizle kıyaslamalı haftalık bazda reklam getirisi.</span>
                <span className="text-[12px] text-slate-400 font-medium bg-slate-50 border border-slate-100 p-2 rounded-lg inline-block w-fit">
                  <strong className="text-slate-600">ROAS (Return on Ad Spend):</strong> Reklam Harcamalarının Getirisi
                  <span className="block mt-1 font-mono text-slate-500 text-[11px] bg-white px-2 py-1 rounded border border-slate-200">
                    Formül: Reklamdan Elde Edilen Gelir / Reklam Harcaması
                  </span>
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#ED2970" stopOpacity={0.4}/>
                        <stop offset="95%" stopColor="#ED2970" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#cbd5e1" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dy={10} />
                    <YAxis stroke="#cbd5e1" axisLine={false} tickLine={false} tick={{fill: '#64748b', fontSize: 12, fontWeight: 500}} dx={-10} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#f1f5f9', borderRadius: '16px', color: '#0f172a', boxShadow: '0 10px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)', padding: '12px 16px' }}
                      itemStyle={{ color: '#ED2970', fontWeight: '900', fontSize: '16px' }}
                      labelStyle={{ color: '#64748b', marginBottom: '8px', fontWeight: '600', textTransform: 'uppercase', fontSize: '11px', letterSpacing: '0.05em' }}
                    />
                    <Area type="monotone" dataKey="roas" stroke="#ED2970" strokeWidth={3} fillOpacity={1} fill="url(#colorRoas)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Reasoning Panel */}
          <Card className="bg-gradient-to-b from-white to-pink-50/30 shadow-xl shadow-pink-100/50 border-pink-100 rounded-[2rem] relative overflow-hidden flex flex-col">
            <div className="absolute top-0 right-0 w-full h-1.5 bg-gradient-to-r from-[#ED2970]/20 via-[#ED2970] to-[#ED2970]/20 opacity-80"></div>
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-1">
                <div className="bg-pink-100 p-2 rounded-xl">
                  <BrainCircuit className="w-5 h-5 text-[#ED2970]" />
                </div>
                <CardTitle className="text-xl text-slate-800 font-black tracking-tight">AI Strategic Insights</CardTitle>
              </div>
              <CardDescription className="text-slate-500 font-medium">Aktif kampanyalarınız için yapay zeka tespitleri.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              {isAnalyzing ? (
                 <div className="flex flex-col items-center justify-center flex-1 min-h-[240px] gap-4 text-slate-500">
                    <Sparkles className="w-10 h-10 text-[#ED2970] animate-pulse" />
                    <p className="text-sm font-bold tracking-wide animate-pulse">Yapay Zeka URL'yi tarıyor ve analiz ediyor...</p>
                 </div>
              ) : errorMsg ? (
                <div className="flex flex-col items-center justify-center flex-1 min-h-[240px] text-center px-6 border-2 border-dashed border-red-200 rounded-3xl bg-red-50/50">
                  <div className="bg-white w-12 h-12 flex items-center justify-center rounded-full shadow-sm border border-red-100 mb-4">
                    <span className="text-red-500 font-black text-xl">!</span>
                  </div>
                  <p className="text-sm text-red-600 font-bold leading-relaxed">{errorMsg}</p>
                </div>
              ) : analysisResult ? (
                 <div className="space-y-4 animate-in fade-in duration-500 flex-1">
                  {/* Summary */}
                  <div className="bg-white border border-slate-100 shadow-sm rounded-2xl p-5">
                    <p className="text-sm text-slate-600 font-medium leading-relaxed">
                      {analysisResult.summary}
                    </p>
                  </div>

                  {/* Weak Points */}
                  <div className="bg-red-50/50 border border-red-100 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <div className="bg-red-100 p-2 rounded-xl mt-0.5 shadow-sm">
                        <span className="w-2.5 h-2.5 rounded-full bg-red-500 block"></span>
                      </div>
                      <div className="flex-1">
                        <h4 className="text-[15px] font-black text-red-950 mb-3 tracking-tight">Zayıf Noktalar (Şikayetler)</h4>
                        <ul className="space-y-2.5">
                          {analysisResult.weak_points?.map((point: string, idx: number) => (
                            <li key={idx} className="text-[13px] font-medium text-red-800 flex items-start gap-2.5 leading-relaxed bg-red-100/30 p-2 rounded-lg">
                              <span className="text-red-500 mt-0.5">✖</span> <span>{point}</span>
                            </li>
                          ))}
                        </ul>
                     </div>
                   </div>
                 </div>

                  {/* Opportunity & Pricing */}
                  <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-5 shadow-sm">
                    <div className="flex items-start gap-3">
                      <div className="bg-emerald-100 p-2 rounded-xl mt-0.5 shadow-sm">
                        <Check className="w-4 h-4 text-emerald-600 stroke-[3px]" />
                      </div>
                      <div>
                        <h4 className="text-[15px] font-black text-emerald-950 mb-2 tracking-tight">Pazar Fırsatı & Fiyat Önerisi</h4>
                        <p className="text-[13px] font-medium text-emerald-800 leading-relaxed mb-4">
                          {analysisResult.opportunity}
                        </p>
                        <div className="inline-flex bg-white border border-emerald-200 text-emerald-700 shadow-sm font-black px-4 py-2 rounded-xl text-sm">
                          Önerilen Satış Fiyatı: <span className="ml-1 text-emerald-600">{analysisResult.recommended_price} TL</span>
                        </div>
                      </div>
                    </div>
                  </div>
                 </div>
              ) : (
                <div className="flex flex-col items-center justify-center flex-1 min-h-[240px] text-center px-6 border-2 border-dashed border-slate-200 rounded-3xl bg-slate-50/50">
                  <div className="bg-white p-4 rounded-full shadow-sm border border-slate-100 mb-4">
                    <BrainCircuit className="w-8 h-8 text-slate-300" />
                  </div>
                  <p className="text-sm text-slate-500 font-bold leading-relaxed max-w-[200px]">Analiz başlatmak için rakibinizin ürün linkini yukarıdaki alana girin.</p>
                </div>
              )}
            </CardContent>
         </Card>
       </div>


        <section className="relative z-10">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-white rounded-[4rem] p-8 md:p-16 shadow-[0_50px_120px_rgba(0,0,0,0.06)] border border-white relative overflow-visible"
           >
              <div className="flex flex-col justify-center max-w-4xl mx-auto text-center items-center overflow-visible">
                 {/* Pink Sub-header removed as requested */}
                 <h2 className="HeaderLabel text-3xl md:text-5xl text-[#0A0D14] mb-8 leading-[1.1]">
                    Kapsamlı ziyaretçi analizleri
                 </h2>
                 <p className="text-[#4B5563] text-lg leading-relaxed mb-10 font-medium opacity-80">
                    Rakiplerinizin toplam ziyaretçi sayısını, ziyaretçi demografisini, en iyi trafik kanallarını, konumlarını ve açılış sayfalarını tahmin etmek için Rakip Analizleri Yapay Zekamızı kullanın. Bu derinlemesine verilerle, hedef kitlelerini ve trafik kaynaklarını daha iyi anlayabilir, stratejilerinizi geliştirmenize ve daha fazla pazar payı elde etmenize olanak tanır.
                 </p>
                 
                 <div className="space-y-4 flex flex-col items-center">
                    <div className="flex items-center gap-4 text-slate-700 font-bold">
                       <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                       <span>En çok trafik çeken kanalları ve konumları belirleyin</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 font-bold">
                       <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                       <span>Rakiplerin en iyi açılış sayfalarını ortaya çıkarın</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

      </main>
    </div>
  );
}

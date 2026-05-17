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
                onClick={() => setIsAnalyzing(true)}
                className="bg-[#ED2970] text-white px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#D52464] transition-all shadow-xl shadow-[#ED2970]/20 flex items-center justify-center gap-2"
              >
                {isAnalyzing ? "Analiz Ediliyor..." : "Hemen Analiz Et"}
                <Sparkles className="w-3 h-3" />
              </button>
            </div>
          </motion.div>
        </div>


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <Card className="col-span-2 bg-zinc-900/50 border-zinc-800">
            <CardHeader>
              <CardTitle>Performans Trendi (ROAS vs Harcama)</CardTitle>
              <CardDescription>Sektörel rakiplerinizle kıyaslamalı haftalık bazda reklam getirisi.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                    <XAxis dataKey="name" stroke="#52525b" axisLine={false} tickLine={false} />
                    <YAxis stroke="#52525b" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#18181b', borderColor: '#27272a', borderRadius: '8px' }}
                      itemStyle={{ color: '#fff' }}
                    />
                    <Area type="monotone" dataKey="roas" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRoas)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Reasoning Panel */}
          <Card className="bg-gradient-to-b from-zinc-900/80 to-[#120d1d] border-zinc-800 border-t-primary/50 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-5 h-5 text-primary" />
                <CardTitle className="text-lg">AI Strategic Insights</CardTitle>
              </div>
              <CardDescription>Aktif kampanyalarınız için yapay zeka tespitleri.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-black/40 border border-red-500/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-500/20 p-1.5 rounded-full mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 block"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">Creative Hatası Tespit Edildi</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      &quot;Yaz Koleksiyonu&quot; reklamınız düşük performans gösteriyor çünkü ürün ilk 2 saniyede ekranda belirmiyor. Kullanıcıların %68&apos;i ilk 3 saniyede videoyu kaydırıyor.

                    </p>
                    
                    <div className="space-y-4">
                       <div className="flex items-center gap-4 text-slate-700 font-bold">
                          <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                          <span>En iyi performans gösteren rakip reklamları belirleyin</span>
                       </div>
                       <div className="flex items-center gap-4 text-slate-700 font-bold">
                          <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                          <span>Platformlar arası reklam performansını analiz edin</span>
                       </div>
                       <div className="flex items-center gap-4 text-slate-700 font-bold">
                          <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                          <span>Pazarlama stratejilerinizde bir adım önde olun</span>
                       </div>
                    </div>
                 </div>
               </div>
             </div>
           </CardContent>
         </Card>
       </div>

       {/* Right Column: Visual Dashboard Mockup */}
       <section className="relative z-10">
         <div className="bg-[#FAF9FB] rounded-[3.5rem] p-8 md:p-12 border border-slate-50 relative flex flex-col gap-8 shadow-inner overflow-visible">
                    
                    {/* Top KPI Cards */}
                    <div className="grid grid-cols-3 gap-3">
                       <div className="bg-white p-4 rounded-3xl border border-white shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Benzersiz Ziyaretçiler</span>
                             <Users className="w-3 h-3 text-slate-100" />
                          </div>
                          <div className="text-xl font-black text-slate-900 leading-none">15K</div>
                          <div className="text-[7px] text-emerald-500 font-bold mt-1">↑ 29.24%</div>
                       </div>
                       <div className="bg-white p-4 rounded-3xl border border-white shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Ziyaret Sayısı</span>
                             <TrendingUp className="w-3 h-3 text-slate-100" />
                          </div>
                          <div className="text-xl font-black text-slate-900 leading-none">65K</div>
                          <div className="text-[7px] text-emerald-500 font-bold mt-1">↑ 13.56%</div>
                       </div>
                       <div className="bg-white p-4 rounded-3xl border border-white shadow-sm">
                          <div className="flex justify-between items-center mb-2">
                             <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">Hemen Çıkma Oranı</span>
                             <PieChart className="w-3 h-3 text-slate-100" />
                          </div>
                          <div className="text-xl font-black text-slate-900 leading-none">74%</div>
                          <div className="text-[7px] text-rose-500 font-bold mt-1">↑ 22.65%</div>
                       </div>
                    </div>

                    {/* Gender & Age Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                       <div className="bg-white p-6 rounded-3xl border border-white shadow-sm space-y-4">
                          <div className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">Cinsiyet</div>
                          <div className="h-6 w-full bg-slate-50 rounded-full overflow-hidden flex relative p-1">
                             <div className="h-full bg-[#ED2970] w-[42%] rounded-full flex items-center px-3 text-[8px] font-black text-white italic">42%</div>
                             <div className="h-full flex-1 flex items-center justify-end px-3 text-[8px] font-bold text-slate-400">58%</div>
                          </div>
                       </div>
                       <div className="bg-white p-6 rounded-3xl border border-white shadow-sm space-y-4">
                          <div className="flex justify-between items-center">
                             <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest italic">Yaş Dağılımı</span>
                             <div className="bg-slate-900 text-white text-[7px] font-bold px-1.5 py-0.5 rounded">34.4%</div>
                          </div>
                          <div className="flex items-end justify-between h-8 gap-2 px-1">
                             {[
                                { label: "18-24", h: 30 },
                                { label: "24-30", h: 100, active: true },
                                { label: "30-40", h: 60 },
                                { label: "40-50", h: 40 },
                                { label: "50-60", h: 30 },
                                { label: "60+", h: 20 }
                             ].map((item, i) => (
                                <div key={i} className="flex-1 flex flex-col gap-1 items-center">
                                   <div 
                                      className={`w-full rounded-sm transition-all duration-700 ${item.active ? 'bg-[#ED2970]' : 'bg-slate-100'}`} 
                                      style={{ height: `${item.h}%` }}
                                   ></div>
                                </div>
                             ))}
                          </div>
                       </div>
                    </div>
                 </div>
            </section>
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

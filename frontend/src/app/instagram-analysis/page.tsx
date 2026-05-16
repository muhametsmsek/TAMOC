"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Camera, Upload, CheckCircle2, TrendingUp, Clock, Lightbulb, Image as ImageIcon } from "lucide-react";
import Link from "next/link";

export default function InstagramAnalysisPage() {
  const [username, setUsername] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;

    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-slate-900 overflow-x-hidden relative font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Background decoration */}
      <div className="absolute top-0 inset-x-0 h-[500px] bg-gradient-to-b from-indigo-50/50 to-transparent pointer-events-none" />

      {/* Navbar */}
      <nav className="border-b border-slate-200/60 bg-white/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors group">
            <div className="p-1.5 rounded-md bg-slate-100 group-hover:bg-slate-200 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold">Ana Sayfaya Dön</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="p-1.5 rounded-lg bg-indigo-50 text-indigo-600">
              <Sparkles className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900">TAMOC<span className="text-indigo-600">.AI</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 pt-16 pb-24 relative z-10">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-sm text-slate-600 font-medium mb-6">
              <Camera className="w-4 h-4 text-indigo-500" />
              Instagram Profil Analizi
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5 text-slate-900">
              Profilinizi AI İle <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">Optimize Edin</span>
            </h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
              Yapay zeka algoritmamız ile saniyeler içinde hesabınızı analiz edin, size özel büyüme stratejileri keşfedin.
            </p>
          </motion.div>
        </div>

        {!showResults ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            <div className="bg-white border border-slate-200/80 shadow-[0_8px_30px_rgb(0,0,0,0.04)] rounded-[2rem] p-8 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />
              
              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Instagram Kullanıcı Adı</label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-medium group-focus-within:text-indigo-500 transition-colors">@</span>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="kullaniciadi"
                      className="w-full bg-slate-50/50 border border-slate-200 rounded-xl py-3.5 pl-10 pr-4 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all hover:border-slate-300"
                    />
                  </div>
                </div>

                <div className="relative flex items-center py-2">
                  <div className="flex-grow border-t border-slate-100"></div>
                  <span className="flex-shrink-0 mx-4 text-slate-400 text-[10px] font-bold tracking-widest uppercase">VEYA</span>
                  <div className="flex-grow border-t border-slate-100"></div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-semibold text-slate-700 ml-1">Profil Ekran Görüntüsü</label>
                  <div className="border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-2xl p-8 text-center hover:bg-slate-50 hover:border-indigo-400 transition-all cursor-pointer group">
                    <div className="w-12 h-12 bg-white shadow-sm border border-slate-100 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform">
                      <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                    </div>
                    <p className="text-slate-700 font-medium mb-1">Görsel Yüklemek İçin Tıklayın</p>
                    <p className="text-slate-400 text-xs">PNG, JPG, max 5MB</p>
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAnalyzing || (!username)}
                    className="w-full bg-slate-900 hover:bg-slate-800 text-white font-medium py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                  >
                    {isAnalyzing ? (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4 animate-spin" />
                        Analiz Ediliyor...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Sparkles className="w-4 h-4" />
                        Profili Analiz Et
                      </span>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Profil Skoru */}
            <div className="bg-white border border-slate-200 shadow-[0_8px_30px_rgb(0,0,0,0.04)] p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className="text-slate-100" />
                  <motion.circle
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: "237.7 283" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"
                    className="text-emerald-500" strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-bold text-slate-900 tracking-tight">84</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Skor</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-100 text-emerald-600 text-xs font-bold uppercase tracking-wider mb-3">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Mükemmel
                </div>
                <h2 className="text-2xl font-bold mb-2 text-slate-900">
                  Profil Skoru ve Potansiyeli
                </h2>
                <p className="text-slate-500 leading-relaxed text-sm max-w-2xl">
                  Hesabınızın genel büyüme potansiyeli çok yüksek. Biyografi kısmında net bir değer teklifi sunuyorsunuz, ancak öne çıkan hikayelerinizin kapak tasarımları daha profesyonel olabilir.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* İçerik Stratejisi Önerileri */}
              <div className="bg-white border border-slate-200 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl">
                    <ImageIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">İçerik Stratejisi</h3>
                </div>
                <ul className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>Reels videolarınızın ilk 3 saniyesine daha çarpıcı bir kanca (hook) ekleyin.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>Kaydırmalı (Carousel) post oranını %40 artırarak kaydedilme sayısını yükseltin.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                    <span>Kullanıcı tarafından oluşturulan (UGC) içeriklere daha fazla yer verin.</span>
                  </li>
                </ul>
              </div>

              {/* Takipçi Etkileşim Önerileri */}
              <div className="bg-white border border-slate-200 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-sky-50 text-sky-600 rounded-xl">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">Etkileşim Önerileri</h3>
                </div>
                <ul className="space-y-4 text-slate-600 text-sm leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <span>Hikayelerinizde günde en az 2 adet anket/soru çıkartması kullanın.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <span>Yorumlara ilk 30 dakika içinde yanıt vererek algoritma sinyallerini güçlendirin.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-sky-500 mt-2 shrink-0" />
                    <span>Uzun açıklamaların (caption) sonuna her zaman bir harekete geçirici mesaj (CTA) ekleyin.</span>
                  </li>
                </ul>
              </div>

              {/* En İyi Paylaşım Saatleri */}
              <div className="bg-white border border-slate-200 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-emerald-50 text-emerald-600 rounded-xl">
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">En İyi Paylaşım Saatleri</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Pzt: 19:00 - 21:00</span>
                  <span className="px-3.5 py-1.5 bg-emerald-50 border border-emerald-200 rounded-lg text-sm font-bold text-emerald-700">Çar: 18:30 - 20:00 (Zirve)</span>
                  <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Cum: 15:00 - 17:00</span>
                  <span className="px-3.5 py-1.5 bg-slate-50 border border-slate-200 rounded-lg text-sm font-medium text-slate-600">Paz: 20:00 - 22:00</span>
                </div>
              </div>

              {/* İçerik Fikirleri */}
              <div className="bg-white border border-slate-200 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-amber-50 text-amber-600 rounded-xl">
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-slate-900">AI İçerik Fikirleri</h3>
                </div>
                <div className="space-y-3">
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-widest mb-1.5 block">Reels Fikri</span>
                    <p className="text-sm text-slate-700">&quot;Hedef kitlenizin yaptığı en büyük 3 hata&quot; temalı, hızlı geçişli bir eğitim videosu.</p>
                  </div>
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                    <span className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest mb-1.5 block">Carousel Fikri</span>
                    <p className="text-sm text-slate-700">Başarı hikayenizi adım adım anlatan ve kaydedilebilir bilgi barındıran kaydırmalı post.</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={() => setShowResults(false)}
                className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-900 transition-colors text-sm font-semibold bg-white border border-slate-200 shadow-sm px-6 py-2.5 rounded-full hover:bg-slate-50"
              >
                <ArrowLeft className="w-4 h-4" />
                Yeni Bir Analiz Yap
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

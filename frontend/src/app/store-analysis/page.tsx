"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Store, AlertTriangle, ShieldCheck, MousePointerClick, ShoppingCart, CheckSquare } from "lucide-react";
import Link from "next/link";

export default function StoreAnalysisPage() {
  const [url, setUrl] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = (e: React.FormEvent) => {
    e.preventDefault();
    if (!url) return; 
    
    setIsAnalyzing(true);
    // Simulate API call
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-[#FAFAFA] text-zinc-900 overflow-x-hidden relative font-sans">
      {/* Navbar */}
      <nav className="border-b border-zinc-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-zinc-500 hover:text-zinc-900 transition">
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Ana Sayfaya Dön</span>
          </Link>
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-emerald-600" />
            <span className="text-xl font-bold tracking-wider text-zinc-900">TAMOC<span className="text-emerald-600">.AI</span></span>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 pt-16 pb-24">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-50 border border-emerald-100 text-sm text-emerald-600 font-medium mb-6">
              <Store className="w-4 h-4" />
              E-Ticaret & CRO Analizi
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-6 text-zinc-900">
              Mağaza Dönüşümünüzü <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">Katlayın</span>
            </h1>
            <p className="text-zinc-500 text-lg max-w-2xl mx-auto leading-relaxed">
              Shopify veya e-ticaret ürün URL&apos;nizi girin. Yapay zeka ile satışlarınızı kaçırdığınız noktaları (CRO) saniyeler içinde tespit edin.
            </p>
          </motion.div>
        </div>

        {!showResults ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white border border-zinc-200/80 shadow-xl shadow-zinc-200/40 p-8 rounded-[2rem] relative"
          >
            <form onSubmit={handleAnalyze} className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-800">Mağaza veya Ürün URL&apos;si</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Store className="w-5 h-5 text-zinc-400" />
                  </div>
                  <input
                    type="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    placeholder="https://siteniz.com/urun"
                    className="w-full bg-zinc-50 border border-zinc-200 rounded-2xl py-4 pl-12 pr-4 text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                  />
                </div>
                <p className="text-xs text-zinc-500 font-medium pt-1">Örn: Ana sayfa linki veya direkt bir ürün sayfasının linki.</p>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isAnalyzing || (!url)}
                  className="w-full bg-zinc-900 hover:bg-zinc-800 text-white font-medium py-4 rounded-full transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg shadow-zinc-900/20"
                >
                  {isAnalyzing ? (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 animate-spin" />
                      Yapay Zeka Analiz Ediyor...
                    </span>
                  ) : (
                    <span className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Analiz Et
                    </span>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Dönüşüm Skoru */}
            <div className="bg-white border border-zinc-200/80 shadow-md shadow-zinc-200/40 p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8">
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" className="text-zinc-100" />
                  <motion.circle 
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: "164 283" }} // 58% score
                    transition={{ duration: 1.5, delay: 0.5 }}
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="8" 
                    className="text-amber-500" strokeLinecap="round" 
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-extrabold text-zinc-900">58</span>
                  <span className="text-xs font-semibold text-zinc-400">/100</span>
                </div>
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 flex items-center gap-2 text-zinc-900">
                  Dönüşüm Skoru Düşük <AlertTriangle className="text-amber-500 w-6 h-6" />
                </h2>
                <p className="text-zinc-500 leading-relaxed">
                  Sayfanız ziyaretçi alıyor olabilir ancak sepete ekleme ve satın alma oranlarında (CRO) ciddi iyileştirme fırsatları var. Özellikle güven unsurları ve mobil ödeme deneyimi zayıf kalmış.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Ürün Sayfası Eksikleri */}
              <div className="bg-white border border-zinc-200/80 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-rose-50 border border-rose-100 rounded-xl text-rose-600">
                    <Store className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900">Ürün Sayfası Eksikleri</h3>
                </div>
                <ul className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>Ürün görselleri arasında video veya 3D gösterim yok. Müşteri ürünü tam anlayamıyor.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>Açıklama kısmı çok uzun ve okunaksız. Madde imleri (bullet points) ile faydaları vurgulayın.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-2 shrink-0" />
                    <span>Stok durumu &quot;Aciliyet (Urgency)&quot; yaratmıyor.</span>
                  </li>
                </ul>
              </div>

              {/* Güven Artırıcı Öneriler */}
              <div className="bg-white border border-zinc-200/80 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-blue-50 border border-blue-100 rounded-xl text-blue-600">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900">Güven Artırıcı Öneriler</h3>
                </div>
                <ul className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>Sepete ekle butonunun hemen altına güvenli ödeme (SSL, iyzico, vb.) ikonları ekleyin.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>Gerçek müşteri yorumları çok aşağıda kalmış. Yıldız puanını hemen başlığın yanına taşıyın.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                    <span>İade ve kargo politikası belirsiz. &quot;Ücretsiz Kargo &amp; Kolay İade&quot; bilgisini görünür yapın.</span>
                  </li>
                </ul>
              </div>

              {/* CTA ve Fiyatlandırma */}
              <div className="bg-white border border-zinc-200/80 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-emerald-50 border border-emerald-100 rounded-xl text-emerald-600">
                    <MousePointerClick className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900">CTA / Fiyatlandırma</h3>
                </div>
                <ul className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>&quot;Sepete Ekle&quot; butonu arka plan rengiyle çok karışıyor. Zıt ve dikkat çekici bir renk kullanın.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>Üstü çizili fiyat taktiğini kullanın (Örn: <del>500 TL</del> yerine 350 TL).</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 shrink-0" />
                    <span>Mobilde &quot;Sepete Ekle&quot; butonu her zaman ekranın altında sabit (sticky) kalmalı.</span>
                  </li>
                </ul>
              </div>

              {/* Checkout Problemleri */}
              <div className="bg-white border border-zinc-200/80 shadow-sm p-7 rounded-[2rem]">
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-amber-50 border border-amber-100 rounded-xl text-amber-600">
                    <ShoppingCart className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-zinc-900">Checkout Problemleri</h3>
                </div>
                <ul className="space-y-4 text-zinc-600 text-sm leading-relaxed">
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>Ödeme sayfasında çok fazla dikkat dağıtıcı menü linki var. Checkout&apos;u tamamen izole edin.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>&quot;Üye olmadan devam et&quot; seçeneği daha belirgin olmalı.</span>
                  </li>
                  <li className="flex gap-3 items-start">
                    <div className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-2 shrink-0" />
                    <span>Sepet terk edenler için otomatik email/SMS akışı (Abandoned Cart) aktif görünmüyor.</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Checklist */}
            <div className="bg-white border border-zinc-200/80 shadow-sm p-8 rounded-[2rem]">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2.5 bg-purple-50 border border-purple-100 rounded-xl text-purple-600">
                  <CheckSquare className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-xl text-zinc-900">Acil Geliştirme Checklisti</h3>
              </div>
              <div className="space-y-3">
                <label className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100 transition-colors cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600" />
                  <span className="text-zinc-700 font-medium group-hover:text-zinc-900">Mobilde Sticky &apos;Sepete Ekle&apos; butonu eklenecek</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100 transition-colors cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600" />
                  <span className="text-zinc-700 font-medium group-hover:text-zinc-900">Güven rozetleri (SSL, İade Garantisi) ürün fotoğrafının altına eklenecek</span>
                </label>
                <label className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 hover:bg-zinc-100 transition-colors cursor-pointer group">
                  <input type="checkbox" className="w-5 h-5 rounded border-zinc-300 text-emerald-600 focus:ring-emerald-600" />
                  <span className="text-zinc-700 font-medium group-hover:text-zinc-900">Yorumlar / Yıldız puanı fiyatın hemen üstüne taşınacak</span>
                </label>
              </div>
            </div>

            <div className="flex justify-center pt-8">
              <button 
                onClick={() => setShowResults(false)}
                className="text-zinc-500 hover:text-zinc-900 transition-colors text-sm font-bold border-b-2 border-transparent hover:border-zinc-900 pb-0.5"
              >
                Farklı Bir URL Analiz Et
              </button>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Wand2, Crosshair, LayoutGrid, Store, ArrowRight, Sparkles } from "lucide-react";

export default function LandingPage() {
  const tools = [
    {
      title: "Reklam Kreatifi Oluştur",
      description: "Yapay zeka ile saniyeler içinde yüksek dönüşüm getiren Meta/TikTok reklamları tasarlayın.",
      icon: Wand2,
      href: "/dashboard/ad-creative",
      color: "from-purple-500/10 to-fuchsia-500/10",
      iconColor: "text-fuchsia-500"
    },
    {
      title: "Rakip Analizi Yap",
      description: "Rakiplerinizin en iyi performans gösteren reklamlarını ve pazarlama stratejilerini anında keşfedin.",
      icon: Crosshair,
      href: "/dashboard/competitor-insights",
      color: "from-blue-500/10 to-cyan-500/10",
      iconColor: "text-cyan-500"
    },
    {
      title: "Instagram Analizi",
      description: "Profilinizi inceletin, içerik stratejinizi ve takipçi etkileşiminizi artıracak AI önerileri alın.",
      icon: LayoutGrid,
      href: "/dashboard/instagram-analyzer",
      color: "from-pink-500/10 to-rose-500/10",
      iconColor: "text-rose-500"
    },
    {
      title: "Mağaza & Ürün Analizi",
      description: "Shopify/E-ticaret sitenizi taratarak dönüşüm oranını (CRO) artıracak eksiklikleri bulun.",
      icon: Store,
      href: "/dashboard/store-analyzer",
      color: "from-emerald-500/10 to-teal-500/10",
      iconColor: "text-teal-500"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 overflow-hidden relative">
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-purple-400/20 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />

      <nav className="border-b border-slate-200 bg-white/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-purple-600" />
            <span className="text-xl font-bold tracking-wider text-slate-900">TAMOC<span className="text-purple-600">.AI</span></span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-sm text-slate-500 hover:text-slate-900 transition">Giriş Yap</Link>
            <Link href="/dashboard/ad-creative" className="bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition">
              Ücretsiz Başla
            </Link>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pt-24 pb-32">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-slate-200 text-sm text-slate-600 mb-6 shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse"></span>
              E-Ticaretin Geleceği
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-8 text-slate-900">
              E-Ticaret Büyümenizi <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600">
                AI ile Şekillendirin
              </span>
            </h1>
            <p className="text-lg text-slate-600 leading-relaxed mb-10">
              Gelişmiş yapay zeka araçlarıyla markanızı bir adım öteye taşıyın. Reklamlardan mağaza optimizasyonuna kadar ihtiyacınız olan her şey tek bir platformda.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
          {tools.map((tool, index) => (
            <motion.div key={tool.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: index * 0.1 }}>
              <Link href={tool.href}>
                <div className="group relative p-8 rounded-3xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full">
                  <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${tool.color}`} />
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                      <tool.icon className={`w-7 h-7 ${tool.iconColor}`} />
                    </div>
                    <h3 className="text-2xl font-semibold mb-3 flex items-center justify-between text-slate-900">
                      {tool.title}
                      <ArrowRight className="w-5 h-5 opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 text-slate-900" />
                    </h3>
                    <p className="text-slate-500 leading-relaxed">
                      {tool.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
  );
}

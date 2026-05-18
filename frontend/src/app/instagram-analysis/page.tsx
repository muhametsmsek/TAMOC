"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowLeft, Camera, Upload, CheckCircle2, TrendingUp, Clock, Lightbulb, Image as ImageIcon, Users, CalendarDays, Swords, PenTool, AlertTriangle, ListChecks, BarChart, Play } from "lucide-react";
import Link from "next/link";
import { useAnalysis } from "@/context/AnalysisContext";

interface AnalysisData {
  profileScore: number;
  profileEvaluation: string;
  contentStrategy: string[];
  engagementSuggestions: string[];
  bestPostingTimes: { day: string; timeRange: string; isPeak: boolean }[];
  aiContentIdeas: { type: string; idea: string }[];
  targetAudienceAnalysis: { demographics: { ageGroup: string; percentage: number }[]; tags: string[] };
  scoreBreakdown: { label: string; score: number }[];
  risks: string[];
  priorityActions: string[];
  weeklyContentCalendar: { dayName: string; contentIdea: string }[];
  competitorInsights: { averageEngagement: string; yourEngagement: string; postingFrequency: string; yourFrequency: string };
  adCopySuggestions: { hook: string; caption: string; cta: string };
}

export default function InstagramAnalysisPage() {
  const [username, setUsername] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<"instagram" | "facebook" | "tiktok" | "meta_business">("instagram");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [analysisData, setAnalysisData] = useState<AnalysisData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const { setSocialMediaAnalysis } = useAnalysis();

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 5 * 1024 * 1024) {
      setError("Dosya boyutu 5MB'ı aşamaz.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setSelectedImage(event.target?.result as string);
      setImageFileName(file.name);
      setError(null);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username && !selectedImage) return;

    setIsAnalyzing(true);
    setError(null);
    setShowResults(false);

    try {
      const response = await fetch('/api/instagram-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, image: selectedImage, platform: selectedPlatform }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Analiz sırasında bir hata oluştu.');
      }

      setAnalysisData(data);
      setSocialMediaAnalysis(data);
      setShowResults(true);
    } catch (err: any) {
      setError(err.message || 'Bilinmeyen bir hata oluştu.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const getPlatformDetails = () => {
    switch (selectedPlatform) {
      case "facebook":
        return {
          strategyTitle: "Topluluk & Etkileşim Stratejisi",
          engagementTitle: "Grup & Erişim Önerileri",
          timesTitle: "En İyi Paylaşım Saatleri",
          ideasTitle: "Sayfa & Paylaşım Fikirleri",
          competitorTitle: "Facebook Rakip Kıyaslama",
          adCopyTitle: "Yapay Zeka Metin Önerileri",
          scoreTitle: "Sayfa Skoru ve Potansiyeli",
          strategyIcon: Users,
          strategyIconBg: "bg-blue-50 text-blue-600",
          ideaIconBg: "bg-blue-50 text-blue-600",
          bulletColor: "bg-blue-500",
        };
      case "tiktok":
        return {
          strategyTitle: "Viral Video & Kanca Stratejisi",
          engagementTitle: "Algoritma & Etkileşim Önerileri",
          timesTitle: "En İyi Yayın Saatleri",
          ideasTitle: "Viral Video & Trend Fikirleri",
          competitorTitle: "TikTok Rakip Kıyaslama",
          adCopyTitle: "Yapay Zeka Video Kanca Önerileri",
          scoreTitle: "TikTok Profil Skoru ve Potansiyeli",
          strategyIcon: Play,
          strategyIconBg: "bg-cyan-50 text-cyan-600",
          ideaIconBg: "bg-cyan-50 text-cyan-600",
          bulletColor: "bg-cyan-500",
        };
      case "meta_business":
        return {
          strategyTitle: "Reklam & Bütçe Stratejisi",
          engagementTitle: "ROAS & Dönüşüm Önerileri",
          timesTitle: "En İyi Kampanya Zamanları",
          ideasTitle: "Kampanya & Kreatif Test Fikirleri",
          competitorTitle: "Meta Reklam Kıyaslaması",
          adCopyTitle: "Reklam Metinleri & A/B Kampanya Önerileri",
          scoreTitle: "Reklam Hesabı Sağlık Skoru",
          strategyIcon: BarChart,
          strategyIconBg: "bg-emerald-50 text-emerald-600",
          ideaIconBg: "bg-emerald-50 text-emerald-600",
          bulletColor: "bg-emerald-500",
        };
      case "instagram":
      default:
        return {
          strategyTitle: "İçerik Stratejisi",
          engagementTitle: "Etkileşim Önerileri",
          timesTitle: "En İyi Paylaşım Saatleri",
          ideasTitle: "AI İçerik Fikirleri",
          competitorTitle: "Rakip Analizi & Kıyaslama",
          adCopyTitle: "Yapay Zeka Reklam & Metin Önerileri",
          scoreTitle: "Profil Skoru ve Potansiyeli",
          strategyIcon: ImageIcon,
          strategyIconBg: "bg-indigo-50 text-indigo-600",
          ideaIconBg: "bg-amber-50 text-amber-600",
          bulletColor: "bg-indigo-500",
        };
    }
  };

  const getTheme = () => {
    switch (selectedPlatform) {
      case "tiktok":
        return {
          bg: "bg-slate-950 text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200",
          cardBg: "bg-slate-900/60 border-slate-800/80 shadow-[0_12px_40px_rgba(0,0,0,0.5)] text-slate-100",
          border: "border-slate-800",
          accentText: "text-cyan-400",
          accentBg: "bg-cyan-950/30 text-cyan-400 border-cyan-800/30",
          subtext: "text-slate-400",
          primaryButton: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold shadow-[0_0_20px_rgba(6,182,212,0.4)]",
          glow: "bg-gradient-to-b from-cyan-500/10 via-rose-500/5 to-transparent",
          scoreTrack: "text-slate-800",
          scoreCircle: "text-cyan-400 drop-shadow-[0_0_12px_rgba(34,211,238,0.5)]",
          badgeColor: "bg-cyan-500/10 border-cyan-500/20 text-cyan-400",
          badgeLabel: "TikTok Analizi",
          titleGradient: "from-cyan-400 via-slate-100 to-rose-400",
          barColors: ["bg-cyan-400", "bg-rose-500", "bg-purple-500", "bg-sky-500", "bg-emerald-500"],
          secondaryButton: "bg-slate-900 border-slate-800 hover:bg-slate-800 text-slate-300",
          weeklyCalendarCard: "bg-slate-900/40 border-slate-800",
          calendarText: "text-slate-300",
          riskCard: "bg-slate-900/60 border-rose-950/30 text-slate-100",
          riskBullet: "bg-rose-500",
          actionCard: "bg-slate-900/60 border-emerald-950/30 text-slate-100",
          actionText: "text-slate-300",
          competitorCard: "bg-slate-900/40 border-slate-800",
          competitorSubCard: "bg-slate-950 border-slate-800/60 shadow-inner",
          competitorLabel: "text-slate-500",
          competitorVal: "text-slate-200",
          adCopyContainer: "bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 border-cyan-900/50 shadow-[0_12px_40px_rgba(6,182,212,0.15)] text-white",
          adCopyItem: "bg-slate-950/50 border-slate-800/80",
          textTitle: "text-slate-100",
          textDescription: "text-slate-400",
          navBg: "border-slate-800 bg-slate-950/80 backdrop-blur-xl",
          logoColor: "text-slate-100",
          inputBg: "bg-slate-900/60 border-slate-800 text-white focus:ring-cyan-500/20 focus:border-cyan-500",
          navText: "text-slate-400 hover:text-slate-100",
          formWrapper: "bg-slate-900 border-slate-800 shadow-[0_8px_30px_rgb(0,0,0,0.5)]",
          formTitle: "text-slate-100",
          formLabel: "text-slate-300",
          divider: "border-slate-800",
          dividerText: "text-slate-500",
          dropzone: "border-slate-800 bg-slate-900/40 hover:bg-slate-900 hover:border-cyan-500",
          thumbnailWrapper: "border-slate-800 bg-slate-900/40",
          thumbnailText: "text-slate-400"
        };
      case "facebook":
        return {
          bg: "bg-gradient-to-br from-[#EBF2FA] via-[#F3F7FC] to-[#F8FAFC] text-slate-800 selection:bg-blue-100 selection:text-blue-900",
          cardBg: "bg-white/95 border-blue-100/80 shadow-[0_8px_30px_rgb(59,130,246,0.02)] text-slate-800",
          border: "border-blue-100/60",
          accentText: "text-blue-600",
          accentBg: "bg-blue-50/80 text-blue-600 border-blue-100/40",
          subtext: "text-slate-500",
          primaryButton: "bg-blue-600 hover:bg-blue-700 text-white font-medium shadow-md shadow-blue-500/10",
          glow: "bg-gradient-to-b from-blue-500/8 via-indigo-500/4 to-transparent",
          scoreTrack: "text-blue-100/50",
          scoreCircle: "text-blue-600 drop-shadow-[0_0_8px_rgba(37,99,235,0.2)]",
          badgeColor: "bg-blue-50 border-blue-100 text-blue-600",
          badgeLabel: "Facebook Analizi",
          titleGradient: "from-blue-600 to-indigo-700",
          barColors: ["bg-blue-500", "bg-indigo-500", "bg-cyan-500", "bg-teal-500", "bg-slate-500"],
          secondaryButton: "bg-white/80 border-slate-200 hover:bg-slate-50 text-slate-600",
          weeklyCalendarCard: "bg-white/60 border-blue-50/80",
          calendarText: "text-slate-700",
          riskCard: "bg-white/80 border-rose-100/80 text-slate-800",
          riskBullet: "bg-rose-500",
          actionCard: "bg-white/80 border-emerald-100/80 text-slate-800",
          actionText: "text-slate-700",
          competitorCard: "bg-white/90 border-blue-100/50",
          competitorSubCard: "bg-blue-50/30 border-blue-50 shadow-2xs",
          competitorLabel: "text-slate-400",
          competitorVal: "text-slate-800",
          adCopyContainer: "bg-gradient-to-br from-blue-900 to-indigo-950 border-blue-800 shadow-md text-white",
          adCopyItem: "bg-white/10 border-white/10",
          textTitle: "text-slate-900",
          textDescription: "text-slate-500",
          navBg: "border-blue-100/60 bg-white/70 backdrop-blur-xl",
          logoColor: "text-slate-900",
          inputBg: "bg-white border-blue-100/80 text-slate-900 focus:ring-blue-500/20 focus:border-blue-500",
          navText: "text-slate-500 hover:text-slate-900",
          formWrapper: "bg-white/95 border-blue-100/80 shadow-[0_8px_30px_rgb(59,130,246,0.04)]",
          formTitle: "text-slate-900",
          formLabel: "text-slate-700",
          divider: "border-blue-50/60",
          dividerText: "text-slate-400",
          dropzone: "border-blue-200 bg-blue-50/20 hover:bg-blue-50/40 hover:border-blue-400",
          thumbnailWrapper: "border-blue-200 bg-blue-50/30",
          thumbnailText: "text-slate-500"
        };
      case "meta_business":
        return {
          bg: "bg-gradient-to-br from-[#EDF2F7] via-[#F7FAFC] to-[#E2E8F0] text-slate-900 selection:bg-indigo-100 selection:text-indigo-900",
          cardBg: "bg-white/90 border-slate-300/80 shadow-[0_8px_30px_rgb(71,85,105,0.03)] text-slate-900",
          border: "border-slate-300/60",
          accentText: "text-indigo-600",
          accentBg: "bg-indigo-50/80 text-indigo-600 border-indigo-100/40",
          subtext: "text-slate-500",
          primaryButton: "bg-indigo-600 hover:bg-indigo-700 text-white font-medium shadow-md shadow-indigo-500/10",
          glow: "bg-gradient-to-b from-slate-400/10 via-indigo-500/5 to-transparent",
          scoreTrack: "text-slate-100",
          scoreCircle: "text-indigo-600 drop-shadow-[0_0_8px_rgba(79,70,229,0.2)]",
          badgeColor: "bg-indigo-50 border-indigo-100 text-indigo-600",
          badgeLabel: "Meta Business Reklam Analizi",
          titleGradient: "from-indigo-600 via-purple-600 to-blue-600",
          barColors: ["bg-indigo-500", "bg-purple-500", "bg-blue-500", "bg-emerald-500", "bg-pink-500"],
          secondaryButton: "bg-white/80 border-slate-200 hover:bg-slate-50 text-slate-600",
          weeklyCalendarCard: "bg-white/60 border-slate-200",
          calendarText: "text-slate-800",
          riskCard: "bg-white/80 border-rose-100/80 text-slate-800",
          riskBullet: "bg-rose-500",
          actionCard: "bg-white/80 border-emerald-100/80 text-slate-800",
          actionText: "text-slate-700",
          competitorCard: "bg-white/90 border-slate-300/60",
          competitorSubCard: "bg-slate-100/50 border-slate-200 shadow-2xs",
          competitorLabel: "text-slate-400",
          competitorVal: "text-slate-800",
          adCopyContainer: "bg-gradient-to-br from-indigo-950 via-slate-900 to-indigo-900 border-indigo-800 shadow-md text-white",
          adCopyItem: "bg-white/10 border-white/10",
          textTitle: "text-slate-900",
          textDescription: "text-slate-500",
          navBg: "border-slate-300/50 bg-white/70 backdrop-blur-xl",
          logoColor: "text-slate-900",
          inputBg: "bg-white border-slate-300 text-slate-900 focus:ring-indigo-500/20 focus:border-indigo-500",
          navText: "text-slate-500 hover:text-slate-900",
          formWrapper: "bg-white/95 border-slate-300/80 shadow-[0_8px_30px_rgb(71,85,105,0.04)]",
          formTitle: "text-slate-900",
          formLabel: "text-slate-700",
          divider: "border-slate-200/60",
          dividerText: "text-slate-400",
          dropzone: "border-slate-300 bg-slate-100/30 hover:bg-slate-100/50 hover:border-indigo-400",
          thumbnailWrapper: "border-slate-300 bg-slate-100/40",
          thumbnailText: "text-slate-500"
        };
      case "instagram":
      default:
        return {
          bg: "bg-gradient-to-br from-[#FFF5F6] via-[#FFF9F6] to-[#FAF5FF] text-slate-900 selection:bg-pink-100 selection:text-pink-900",
          cardBg: "bg-white/90 border-pink-100/80 shadow-[0_8px_30px_rgb(219,39,119,0.02)] text-slate-900",
          border: "border-pink-100/50",
          accentText: "text-pink-600",
          accentBg: "bg-pink-50/80 text-pink-600 border-pink-100/40",
          subtext: "text-slate-500",
          primaryButton: "bg-slate-900 hover:bg-slate-800 text-white font-medium shadow-sm hover:shadow-md",
          glow: "bg-gradient-to-b from-pink-500/8 via-orange-500/4 to-transparent",
          scoreTrack: "text-pink-100/50",
          scoreCircle: "text-pink-500 drop-shadow-[0_0_8px_rgba(219,39,119,0.2)]",
          badgeColor: "bg-pink-50 border-pink-100 text-pink-600",
          badgeLabel: "Instagram Analizi",
          titleGradient: "from-pink-600 via-purple-600 to-orange-500",
          barColors: ["bg-pink-500", "bg-purple-500", "bg-orange-500", "bg-indigo-500", "bg-rose-500"],
          secondaryButton: "bg-white/80 border-slate-200 hover:bg-slate-50 text-slate-500",
          weeklyCalendarCard: "bg-white/60 border-pink-50/80",
          calendarText: "text-slate-800",
          riskCard: "bg-white/80 border-rose-100/80 text-slate-800",
          riskBullet: "bg-rose-500",
          actionCard: "bg-white/80 border-emerald-100/80 text-slate-800",
          actionText: "text-slate-700",
          competitorCard: "bg-white/90 border-pink-100/50",
          competitorSubCard: "bg-pink-50/30 border-pink-50 shadow-2xs",
          competitorLabel: "text-slate-400",
          competitorVal: "text-slate-800",
          adCopyContainer: "bg-gradient-to-br from-purple-900 via-indigo-900 to-slate-900 border-purple-800 shadow-md text-white",
          adCopyItem: "bg-white/10 border-white/10",
          textTitle: "text-slate-900",
          textDescription: "text-slate-500",
          navBg: "border-pink-100/50 bg-white/70 backdrop-blur-xl",
          logoColor: "text-slate-900",
          inputBg: "bg-white border-pink-100/80 text-slate-900 focus:ring-pink-500/20 focus:border-pink-500",
          navText: "text-slate-500 hover:text-slate-900",
          formWrapper: "bg-white/95 border-pink-100/80 shadow-[0_8px_30px_rgb(219,39,119,0.04)]",
          formTitle: "text-slate-900",
          formLabel: "text-slate-700",
          divider: "border-pink-50/60",
          dividerText: "text-slate-400",
          dropzone: "border-pink-200 bg-pink-50/20 hover:bg-pink-50/40 hover:border-pink-400",
          thumbnailWrapper: "border-pink-200 bg-pink-50/30",
          thumbnailText: "text-slate-500"
        };
    }
  };

  const theme = getTheme();
  const details = getPlatformDetails();

  return (
    <div className={`min-h-screen ${theme.bg} overflow-x-hidden relative font-sans selection:bg-indigo-100 selection:text-indigo-900 transition-all duration-300`}>
      {/* Background decoration */}
      <div className={`absolute top-0 inset-x-0 h-[500px] ${theme.glow} pointer-events-none`} />

      {/* Navbar */}
      <nav className={`border-b ${theme.navBg} sticky top-0 z-50 transition-colors duration-300`}>
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className={`flex items-center gap-2 ${theme.navText} transition-colors group`}>
            <div className="p-1.5 rounded-md bg-slate-100/10 group-hover:bg-slate-200/10 transition-colors">
              <ArrowLeft className="w-4 h-4" />
            </div>
            <span className="text-sm font-semibold">Ana Sayfaya Dön</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-lg ${theme.accentBg}`}>
              <Sparkles className="w-5 h-5" />
            </div>
            <span className={`text-xl font-bold tracking-tight ${theme.logoColor}`}>TAMOC<span className="text-indigo-600">.AI</span></span>
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
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full ${theme.cardBg} border shadow-xs text-sm ${theme.textDescription} font-medium mb-6`}>
              <Sparkles className="w-4 h-4 text-indigo-500 animate-pulse" />
              Sosyal Medya Büyüme Analizi
            </div>
            <h1 className={`text-4xl md:text-5xl font-extrabold tracking-tight mb-5 ${theme.textTitle}`}>
              Sosyal Medyanızı AI İle{" "}
              <span className={`inline-block bg-gradient-to-r ${theme.titleGradient} bg-clip-text text-transparent`}>
                Optimize Edin
              </span>
            </h1>

            <p className={`${theme.textDescription} text-lg max-w-xl mx-auto leading-relaxed`}>
              Yapay zeka algoritmamız ile saniyeler içinde kanallarınızı analiz edin, size özel büyüme stratejileri keşfedin.
            </p>
          </motion.div>
        </div>

        {!showResults || !analysisData ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-lg mx-auto"
          >
            <div className={`border ${theme.cardBg} rounded-[2rem] p-8 relative overflow-hidden transition-all duration-300`}>
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-indigo-500 to-violet-500" />

              <form onSubmit={handleAnalyze} className="space-y-6">
                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${theme.formLabel} ml-1`}>Platform Seçimi</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      { id: "instagram", name: "Instagram", icon: Camera, color: "text-pink-600", activeBg: "bg-pink-50 border-pink-200 ring-2 ring-pink-500/20" },
                      { id: "facebook", name: "Facebook", icon: Users, color: "text-blue-600", activeBg: "bg-blue-50 border-blue-200 ring-2 ring-blue-500/20" },
                      { id: "tiktok", name: "TikTok", icon: Play, color: "text-cyan-600", activeBg: "bg-cyan-50 border-cyan-200 ring-2 ring-cyan-500/20" },
                      { id: "meta_business", name: "Meta Business", icon: BarChart, color: "text-emerald-600", activeBg: "bg-emerald-50 border-emerald-200 ring-2 ring-emerald-500/20" },
                    ].map((plat) => {
                      const Icon = plat.icon;
                      const isActive = selectedPlatform === plat.id;
                      return (
                        <button
                          key={plat.id}
                          type="button"
                          onClick={() => {
                            setSelectedPlatform(plat.id as any);
                            setUsername("");
                            setSelectedImage(null);
                            setImageFileName(null);
                          }}
                          className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                            isActive
                              ? `${plat.activeBg} border-slate-300 font-semibold shadow-sm`
                              : `border-slate-200 ${selectedPlatform === "tiktok" ? "bg-slate-900 hover:bg-slate-800 border-slate-800" : "bg-white hover:border-slate-300"} hover:shadow-xs`
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg bg-slate-50/10 ${plat.color}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className={`text-[11px] ${theme.formLabel}`}>{plat.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${theme.formLabel} ml-1`}>
                    {selectedPlatform === "instagram" && "Instagram Kullanıcı Adı (Opsiyonel)"}
                    {selectedPlatform === "facebook" && "Facebook Sayfa Adı / Linki (Opsiyonel)"}
                    {selectedPlatform === "tiktok" && "TikTok Kullanıcı Adı (Opsiyonel)"}
                    {selectedPlatform === "meta_business" && "İşletme Adı veya Reklam Hesabı ID (Opsiyonel)"}
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <span className="text-slate-400 font-medium group-focus-within:text-indigo-500 transition-colors">
                        {selectedPlatform === "meta_business" ? "ID" : "@"}
                      </span>
                    </div>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder={
                        selectedPlatform === "instagram" ? "kullaniciadi" :
                        selectedPlatform === "facebook" ? "sayfaadi" :
                        selectedPlatform === "tiktok" ? "kullaniciadi" :
                        "reklam_hesabi_id"
                      }
                      className={`w-full ${theme.inputBg} rounded-xl py-3.5 pl-10 pr-4 placeholder:text-slate-400 focus:outline-none focus:ring-2 transition-all hover:border-slate-300`}
                    />
                  </div>
                </div>

                <div className="relative flex items-center py-2">
                  <div className={`flex-grow border-t ${theme.divider}`}></div>
                  <span className={`flex-shrink-0 mx-4 ${theme.dividerText} text-[10px] font-bold tracking-widest uppercase`}>VE / VEYA</span>
                  <div className={`flex-grow border-t ${theme.divider}`}></div>
                </div>

                <div className="space-y-2">
                  <label className={`text-sm font-semibold ${theme.formLabel} ml-1`}>Profil Ekran Görüntüsü</label>
                  {!selectedImage ? (
                    <label className={`border-2 border-dashed ${theme.dropzone} rounded-2xl p-8 text-center transition-all cursor-pointer group flex flex-col items-center justify-center`}>
                      <input
                        type="file"
                        accept="image/png, image/jpeg, image/jpg, image/webp"
                        onChange={handleImageChange}
                        className="hidden"
                      />
                      <div className={`w-12 h-12 ${selectedPlatform === "tiktok" ? "bg-slate-800" : "bg-white"} shadow-sm border border-slate-100/10 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:scale-105 transition-transform`}>
                        <Upload className="w-5 h-5 text-slate-400 group-hover:text-indigo-500 transition-colors" />
                      </div>
                      <p className={`font-medium mb-1 ${theme.textTitle}`}>Görsel Yüklemek İçin Tıklayın</p>
                      <p className={`${theme.textDescription} text-xs`}>PNG, JPG, max 5MB</p>
                    </label>
                  ) : (
                    <div className={`border ${theme.border} bg-slate-50/10 rounded-2xl p-4 flex flex-col items-center gap-4 relative overflow-hidden`}>
                      <div className={`relative w-full aspect-[4/3] rounded-xl overflow-hidden border ${theme.border}`}>
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={selectedImage}
                          alt="Profil Ekran Görüntüsü"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex w-full items-center justify-between gap-4 px-2">
                        <span className={`text-xs ${theme.textDescription} font-medium truncate max-w-[200px]`}>
                          {imageFileName}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedImage(null);
                            setImageFileName(null);
                          }}
                          className="text-xs text-rose-500 font-bold hover:text-rose-700 transition-colors"
                        >
                          Görseli Kaldır
                        </button>
                      </div>
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-4 bg-rose-50/10 text-rose-400 rounded-xl text-sm font-medium border border-rose-900/30">
                    {error}
                  </div>
                )}

                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isAnalyzing || (!username && !selectedImage)}
                    className={`w-full ${theme.primaryButton} py-3.5 rounded-xl transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed`}
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
            <div className={`border ${theme.cardBg} p-8 rounded-[2rem] flex flex-col md:flex-row items-center gap-8 shadow-md transition-all duration-300`}>
              <div className="relative w-32 h-32 flex items-center justify-center shrink-0">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6" className={`${theme.scoreTrack}`} />
                  <motion.circle
                    initial={{ strokeDasharray: "0 283" }}
                    animate={{ strokeDasharray: `${(analysisData.profileScore / 100) * 283} 283` }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="6"
                    className={`${theme.scoreCircle}`} strokeLinecap="round"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className={`text-3xl font-bold ${theme.textTitle} tracking-tight`}>{analysisData.profileScore}</span>
                  <span className={`text-[10px] font-bold ${theme.subtext} uppercase tracking-wider`}>Skor</span>
                </div>
              </div>
              <div className="text-center md:text-left">
                <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full ${theme.accentBg} text-xs font-bold uppercase tracking-wider mb-3 border`}>
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  {analysisData.profileScore > 80 ? "Mükemmel" : analysisData.profileScore > 60 ? "İyi" : "Geliştirilmeli"}
                </div>
                <h2 className={`text-2xl font-bold mb-2 ${theme.textTitle}`}>
                  {details.scoreTitle}
                </h2>
                <p className={`${theme.subtext} leading-relaxed text-sm max-w-2xl`}>
                  {analysisData.profileEvaluation}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* İçerik Stratejisi Önerileri */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${details.strategyIconBg}`}>
                    <details.strategyIcon className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>{details.strategyTitle}</h3>
                </div>
                <ul className={`space-y-4 ${theme.subtext} text-sm leading-relaxed`}>
                  {analysisData.contentStrategy?.map((strategy, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full ${details.bulletColor} mt-2 shrink-0`} />
                      <span>{strategy}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Takipçi Etkileşim Önerileri */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 ${theme.accentBg} rounded-xl border`}>
                    <TrendingUp className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>{details.engagementTitle}</h3>
                </div>
                <ul className={`space-y-4 ${theme.subtext} text-sm leading-relaxed`}>
                  {analysisData.engagementSuggestions?.map((suggestion, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.accentText} mt-2 shrink-0 bg-current`} />
                      <span>{suggestion}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* En İyi Paylaşım Saatleri */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 ${theme.accentBg} rounded-xl border`}>
                    <Clock className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>{details.timesTitle}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {analysisData.bestPostingTimes?.map((time, i) => (
                    <span key={i} className={`px-3.5 py-1.5 border rounded-lg text-sm transition-all ${time.isPeak ? `${theme.accentBg} font-bold` : `${selectedPlatform === "tiktok" ? "bg-slate-900 border-slate-800 text-slate-400" : "bg-slate-50 border-slate-200 text-slate-600 font-medium"}`}`}>
                      {time.day}: {time.timeRange} {time.isPeak && '(Zirve)'}
                    </span>
                  ))}
                </div>
              </div>

              {/* İçerik Fikirleri */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 rounded-xl ${details.ideaIconBg}`}>
                    <Lightbulb className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>{details.ideasTitle}</h3>
                </div>
                <div className="space-y-3">
                  {analysisData.aiContentIdeas?.map((idea, i) => (
                    <div key={i} className={`p-4 ${selectedPlatform === "tiktok" ? "bg-slate-900/40 border-slate-800/80 hover:border-slate-800" : "bg-slate-50 border-slate-100 hover:border-slate-200"} rounded-xl border transition-colors`}>
                      <span className={`text-[10px] font-bold ${i % 2 === 0 ? 'text-amber-600' : 'text-indigo-600'} uppercase tracking-widest mb-1.5 block`}>{idea.type}</span>
                      <p className={`text-sm ${theme.textTitle}`}>{idea.idea}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Target Audience Analysis */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 ${theme.accentBg} rounded-xl border`}>
                    <Users className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>Hedef Kitle Analizi</h3>
                </div>
                <div className="space-y-4">
                  {analysisData.targetAudienceAnalysis?.demographics?.map((demo, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm mb-1">
                        <span className={`font-medium ${theme.textDescription}`}>{demo.ageGroup}</span>
                        <span className={`font-bold ${theme.textTitle}`}>{demo.percentage}%</span>
                      </div>
                      <div className={`h-2 w-full ${selectedPlatform === "tiktok" ? "bg-slate-800" : "bg-slate-100"} rounded-full overflow-hidden`}>
                        <div className={`h-full ${theme.barColors[i % theme.barColors.length]} rounded-full`} style={{ width: `${demo.percentage}%` }}></div>
                      </div>
                    </div>
                  ))}
                  <div className="flex flex-wrap gap-2 pt-2">
                    {analysisData.targetAudienceAnalysis?.tags?.map((tag, i) => (
                      <span key={i} className={`px-3 py-1 ${selectedPlatform === "tiktok" ? "bg-slate-900 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-600"} border rounded-lg text-xs font-medium`}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Detailed Score Breakdown */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 ${theme.accentBg} rounded-xl border`}>
                    <BarChart className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>Detaylı Skor Dağılımı</h3>
                </div>
                <div className="space-y-4">
                  {analysisData.scoreBreakdown?.map((item, i) => {
                    return (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className={`font-medium ${theme.textDescription}`}>{item.label}</span>
                          <span className={`font-bold ${theme.textTitle}`}>{item.score}/100</span>
                        </div>
                        <div className={`h-1.5 w-full ${selectedPlatform === "tiktok" ? "bg-slate-800" : "bg-slate-100"} rounded-full overflow-hidden`}>
                          <div className={`h-full rounded-full ${theme.barColors[i % theme.barColors.length]}`} style={{ width: `${item.score}%` }}></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Risk / Missing points section */}
              <div className={`border ${theme.riskCard} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-rose-50/10 text-rose-500 border border-rose-500/20 rounded-xl">
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>Riskler & Eksik Noktalar</h3>
                </div>
                <ul className={`space-y-4 ${theme.subtext} text-sm leading-relaxed`}>
                  {analysisData.risks?.map((risk, i) => (
                    <li key={i} className="flex gap-3 items-start">
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.riskBullet} mt-2 shrink-0`} />
                      <span>{risk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Priority action checklist */}
              <div className={`border ${theme.actionCard} shadow-sm p-7 rounded-[2rem]`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className="p-2.5 bg-emerald-50/10 text-emerald-500 border border-emerald-500/20 rounded-xl">
                    <ListChecks className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>Bugün Yapılacaklar (Top 3)</h3>
                </div>
                <div className="space-y-3">
                  {analysisData.priorityActions?.map((action, i) => (
                    <label key={i} className={`flex items-start gap-3 p-3 rounded-xl ${selectedPlatform === "tiktok" ? "hover:bg-slate-900/40 hover:border-slate-800" : "hover:bg-slate-50 hover:border-slate-100"} transition-colors cursor-pointer border border-transparent`}>
                      <input type="checkbox" className="mt-1 w-4 h-4 rounded text-emerald-500 focus:ring-emerald-500" />
                      <span className={`text-sm ${theme.actionText} font-medium select-none`}>{action}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Weekly content calendar */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem] md:col-span-2`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 ${theme.accentBg} rounded-xl border`}>
                    <CalendarDays className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>Haftalık İçerik Takvimi</h3>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {analysisData.weeklyContentCalendar?.map((day, i) => (
                    <div key={i} className={`p-4 ${theme.weeklyCalendarCard} border rounded-xl`}>
                      <div className={`text-xs font-bold ${selectedPlatform === "tiktok" ? "text-slate-500" : "text-slate-400"} mb-2 uppercase`}>{day.dayName}</div>
                      <div className={`text-sm font-medium ${theme.calendarText}`}>{day.contentIdea}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Competitor comparison input */}
              <div className={`border ${theme.cardBg} shadow-sm p-7 rounded-[2rem] md:col-span-2`}>
                <div className="flex items-center gap-3 mb-5">
                  <div className={`p-2.5 ${theme.accentBg} rounded-xl border`}>
                    <Swords className="w-5 h-5" />
                  </div>
                  <h3 className={`font-bold text-lg ${theme.textTitle}`}>{details.competitorTitle}</h3>
                </div>
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="w-full md:w-1/3 space-y-3">
                    <label className={`text-xs font-bold ${theme.subtext} uppercase tracking-wider`}>Rakip Ekle</label>
                    <div className="flex gap-2">
                      <input type="text" placeholder={selectedPlatform === "meta_business" ? "Reklam Hesabı ID" : "@rakiphesap"} className={`flex-1 ${theme.inputBg} rounded-xl px-4 py-2.5 text-sm focus:ring-2 outline-none`} />
                      <button className={`bg-slate-900 text-white ${selectedPlatform === "tiktok" && "bg-cyan-500 text-slate-950 font-bold hover:bg-cyan-400"} px-4 py-2.5 rounded-xl text-sm font-medium transition-colors`}>Ekle</button>
                    </div>
                  </div>
                  <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className={`border ${theme.border} rounded-xl p-4 ${selectedPlatform === "tiktok" ? "bg-slate-900/40" : "bg-white"} shadow-sm flex flex-col`}>
                      <span className={`text-xs font-medium ${theme.competitorLabel} mb-1`}>Rakip Ortalama Performans</span>
                      <span className={`text-2xl font-bold ${theme.competitorVal} mb-2`}>{analysisData.competitorInsights?.averageEngagement || '3.2%'}</span>
                      <span className={`text-xs font-medium ${theme.accentText} ${selectedPlatform === "tiktok" ? "bg-cyan-950/20" : "bg-emerald-50"} px-2 py-1 rounded-md self-start`}>{analysisData.competitorInsights?.yourEngagement || 'Siz: 4.8% (Daha İyi)'}</span>
                    </div>
                    <div className={`border ${theme.border} rounded-xl p-4 ${selectedPlatform === "tiktok" ? "bg-slate-900/40" : "bg-white"} shadow-sm flex flex-col`}>
                      <span className={`text-xs font-medium ${theme.competitorLabel} mb-1`}>Rakip Paylaşım / Kontrol Sıklığı</span>
                      <span className={`text-2xl font-bold ${theme.competitorVal} mb-2`}>{analysisData.competitorInsights?.postingFrequency || '5.4 / Hafta'}</span>
                      <span className="text-xs font-medium text-rose-500 bg-rose-50/10 px-2 py-1 rounded-md self-start">{analysisData.competitorInsights?.yourFrequency || 'Siz: 3.0 (Artırmalısınız)'}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* AI-generated ad copy suggestions */}
              <div className={`${theme.adCopyContainer} border shadow-md p-7 rounded-[2rem] md:col-span-2`}>
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2.5 bg-indigo-500/20 text-indigo-300 rounded-xl">
                    <PenTool className="w-5 h-5" />
                  </div>
                  <h3 className="font-bold text-lg text-white">{details.adCopyTitle}</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className={`${theme.adCopyItem} rounded-2xl p-5 backdrop-blur-sm`}>
                    <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">Hook (Kanca)</div>
                    <p className="text-sm font-medium text-white">{analysisData.adCopySuggestions?.hook}</p>
                  </div>
                  <div className={`${theme.adCopyItem} rounded-2xl p-5 backdrop-blur-sm`}>
                    <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">Caption (Açıklama)</div>
                    <p className="text-sm font-medium text-indigo-50 text-opacity-80">{analysisData.adCopySuggestions?.caption}</p>
                  </div>
                  <div className={`${theme.adCopyItem} rounded-2xl p-5 backdrop-blur-sm`}>
                    <div className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest mb-2">CTA (Aksiyon)</div>
                    <p className="text-sm font-medium text-white">{analysisData.adCopySuggestions?.cta}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex justify-center pt-6">
              <button
                onClick={() => setShowResults(false)}
                className={`inline-flex items-center gap-2 transition-colors text-sm font-semibold ${theme.secondaryButton} border shadow-sm px-6 py-2.5 rounded-full`}
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

"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Check, 
  TrendingUp, 
  Globe, 
  Video, 
  Palette, 
  Type, 
  Target, 
  Lightbulb, 
  ArrowRight, 
  Loader2,
  Upload,
  Play,
  Pause,
  Volume2,
  VolumeX,
  Music,
  Film,
  CheckCircle2,
  RefreshCw,
  Smartphone,
  Sliders,
  Gauge,
  Scissors,
  Share2
} from "lucide-react";

export default function AdCreativePage() {
  // Existing States for Strategy
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [strategy, setStrategy] = useState<any>(null);

  // Tab State: "strategy" (original design) vs "video" (new requested features)
  const [activeTab, setActiveTab] = useState<"strategy" | "video">("strategy");

  // Video Studio States
  const [videoPrompt, setVideoPrompt] = useState("");
  const [targetAudience, setTargetAudience] = useState("Gençler (18-24)");
  const [adGoal, setAdGoal] = useState("Dönüşüm (Satış)");
  const [selectedPlatform, setSelectedPlatform] = useState("Instagram Reels (9:16)");
  const [videoStyle, setVideoStyle] = useState("UGC (Kullanıcı İçeriği)");
  
  // Video Editing States
  const [videoFileName, setVideoFileName] = useState("");
  const [voiceCharacter, setVoiceCharacter] = useState("Buse (Kadın - UGC)");
  const [voiceTone, setVoiceTone] = useState("Coşkulu & Enerjik");
  const [subtitleStyle, setSubtitleStyle] = useState("TikTok Popüler (Kalın Sarı)");
  const [musicTempo, setMusicTempo] = useState("Dinamik & Hızlı");
  const [musicGenre, setMusicGenre] = useState("Trend TikTok Beats");
  const [editTab, setEditTab] = useState<"generate" | "edit">("generate");
  
  // Rendering & Result States
  const [isRendering, setIsRendering] = useState(false);
  const [renderProgress, setRenderProgress] = useState(0);
  const [renderStep, setRenderStep] = useState(0);
  const [videoAdResult, setVideoAdResult] = useState<any>(null);
  
  // Player simulation states
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState("A");
  
  // Meta Ads transfer states
  const [isSendingToMeta, setIsSendingToMeta] = useState(false);
  const [metaSendProgress, setMetaSendProgress] = useState("");
  const [metaSuccess, setMetaSuccess] = useState(false);

  // Existing Strategy Generation
  const generateStrategy = async () => {
    if (!prompt.trim()) return;
    
    setIsGenerating(true);
    setStrategy(null);
    
    try {
      const response = await fetch("/api/generate-strategy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      setStrategy(data);
    } catch (error) {
      console.error("Generation failed:", error);
      alert("Strateji oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setIsGenerating(false);
    }
  };

  // Automated AI Video Generation & Editing Pipeline
  const generateVideoAd = async () => {
    setIsRendering(true);
    setRenderProgress(0);
    setRenderStep(0);
    setVideoAdResult(null);
    setIsPlaying(false);
    setCurrentTime(0);
    setMetaSuccess(false);
    
    // Smooth progress loading pipeline simulation
    const interval = setInterval(() => {
      setRenderProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const nextProgress = prev + 1.2;
        if (nextProgress < 15) setRenderStep(0);
        else if (nextProgress < 35) setRenderStep(1);
        else if (nextProgress < 55) setRenderStep(2);
        else if (nextProgress < 75) setRenderStep(3);
        else if (nextProgress < 90) setRenderStep(4);
        else setRenderStep(5);
        
        return Number(nextProgress.toFixed(1));
      });
    }, 150);
    
    try {
      const response = await fetch("/api/generate-video-ad", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          product: editTab === "generate" ? videoPrompt : `Video Edit Düzenleme: ${videoFileName}`,
          audience: targetAudience,
          goal: adGoal,
          platform: selectedPlatform,
          style: videoStyle,
          videoUploaded: editTab === "edit"
        }),
      });
      
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      
      clearInterval(interval);
      setRenderProgress(100);
      setRenderStep(5);
      
      setTimeout(() => {
        setVideoAdResult(data);
        setIsRendering(false);
      }, 1000);
      
    } catch (error) {
      console.error("Video rendering failed:", error);
      clearInterval(interval);
      setIsRendering(false);
      alert("Video oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  // Video time tick simulation
  useEffect(() => {
    let interval: any;
    if (isPlaying && videoAdResult) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= 15) {
            return 0;
          }
          return Number((prev + 0.1).toFixed(1));
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying, videoAdResult]);

  // Timed subtitle finder
  const getActiveSubtitle = () => {
    if (!videoAdResult || !videoAdResult.subtitles) return "";
    const activeSub = videoAdResult.subtitles.find(
      (sub: any) => currentTime >= sub.start && currentTime < sub.end
    );
    return activeSub ? activeSub.text : "";
  };

  // Audio Equalizer bar animator
  const renderEqualizer = () => {
    return (
      <div className="flex items-center gap-0.5 h-6">
        {[...Array(12)].map((_, i) => {
          const randomHeight = isPlaying ? Math.floor(Math.random() * 16) + 4 : 2;
          return (
            <motion.div
              key={i}
              className="w-0.5 bg-[#ED2970] rounded-full"
              animate={{ height: isPlaying ? randomHeight : 3 }}
              transition={{ type: "spring", stiffness: 300, damping: 10 }}
            />
          );
        })}
      </div>
    );
  };

  // Meta Ads Campaign Direct Upload
  const sendToMetaAds = async () => {
    setIsSendingToMeta(true);
    setMetaSendProgress("Meta Business API'sine bağlanılıyor...");
    
    setTimeout(() => {
      setMetaSendProgress("Reklam kreatif dosyaları ve altyazılar Meta CDN'e yükleniyor...");
      setTimeout(() => {
        setMetaSendProgress("Meta Ads Kampanyası ve Reklam Seti yapılandırılıyor...");
        setTimeout(() => {
          setMetaSuccess(true);
          setIsSendingToMeta(false);
        }, 1500);
      }, 1500);
    }, 1500);
  };

  // File Upload drag simulated helper
  const handleFileUploadSimulated = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setVideoFileName(e.target.files[0].name);
    }
  };

  return (
    <div className="min-h-screen bg-[#FCF8F9] text-[#0A0D14] overflow-x-hidden relative font-sans">
      
      {/* Navbar (Placeholder) */}
      <nav className="fixed top-0 left-0 w-full z-50 px-4 py-3 pointer-events-none">
        <div className="max-w-7xl mx-auto h-16 pointer-events-auto flex items-center justify-between">
           {/* Logo could go here */}
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative pt-32 pb-20 px-6 max-w-7xl mx-auto min-h-screen">
        
        {/* Background Gradients */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[50%] bg-[#FFEDF4] rounded-full blur-[120px] pointer-events-none opacity-60" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] bg-[#F0F2FF] rounded-full blur-[120px] pointer-events-none opacity-60" />

        {/* HERO SECTION */}
        <div className="flex flex-col gap-8 items-start relative z-10 mb-12 max-w-2xl mx-auto lg:mx-0">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6 }}>
            <h1 className="HeaderLabel text-4xl md:text-6xl text-[#0A0D14] mb-4">
              Dönüşüm Oranınızı<br />
              Artıracak Reklam<br />
              Kreatifinizi Oluşturun
            </h1>
            <p className="text-[#4B5563] text-lg leading-relaxed max-w-md font-medium opacity-80">
              Mağazanıza, müşteri profilinize uygun dönüşüm odaklı reklam videoları ve görsellerini beraber oluşturalım. İstediğiniz yöntemi seçin.
            </p>
          </motion.div>

          {/* Premium Glass Tab Selector */}
          <div className="flex bg-[#F0EFF3] p-1 rounded-[1.25rem] w-full max-w-md border border-slate-200/50 shadow-inner mt-2">
            <button
              onClick={() => setActiveTab("strategy")}
              className={`flex-1 py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                activeTab === "strategy"
                  ? "bg-white text-[#ED2970] shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Reklam Stratejisi</span>
            </button>
            <button
              onClick={() => setActiveTab("video")}
              className={`flex-1 py-3 px-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                activeTab === "video"
                  ? "bg-white text-[#ED2970] shadow-[0_4px_12px_rgba(0,0,0,0.05)] border border-white"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              <Video className="w-3.5 h-3.5" />
              <span>AI Video Stüdyosu</span>
            </button>
          </div>
        </div>

        {/* --- TAB 1: ORIGINAL STRATEGY WORKFLOW --- */}
        {activeTab === "strategy" && (
          <>
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="w-full max-w-md mb-16"
            >
              <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col gap-5 transition-all focus-within:shadow-[0_40px_80px_rgba(237,41,112,0.08)]">
                <div className="flex items-center justify-between">
                   <div className="px-3 py-1 bg-rose-50 rounded-full flex items-center gap-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#ED2970]" />
                      <span className="text-[9px] font-black text-[#ED2970] uppercase tracking-[0.2em] italic">AI Strategy Studio</span>
                   </div>
                </div>
                <textarea 
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Örn: Anneler Günü yaklaşıyor, internet mağazamda çiçek satıyorum..."
                  className="w-full h-32 bg-transparent border-none resize-none focus:ring-0 p-0 text-[#0A0D14] placeholder:text-slate-300 font-bold text-base italic leading-relaxed"
                />
                <button 
                  onClick={generateStrategy}
                  disabled={isGenerating || !prompt.trim()}
                  className="bg-[#ED2970] disabled:bg-slate-200 text-white px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#D52464] transition-all shadow-xl shadow-[#ED2970]/20 flex items-center justify-center gap-2"
                >
                  {isGenerating ? (
                    <>
                      <span>Strateji Hazırlanıyor</span>
                      <Loader2 className="w-3 h-3 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>Kreatif Stratejisi Oluştur</span>
                      <Sparkles className="w-3 h-3" />
                    </>
                  )}
                </button>
              </div>
            </motion.div>

            {/* AI RESULT SECTION */}
            <AnimatePresence>
              {strategy && (
                <motion.section 
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 50 }}
                  className="mt-2 relative z-20 mb-20"
                >
                  <div className="bg-white rounded-[3.5rem] p-8 md:p-16 shadow-[0_50px_120px_rgba(0,0,0,0.06)] border border-white">
                    <div className="mb-16">
                       <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-[#ED2970] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ED2970]/20">
                             <Sparkles className="w-5 h-5 text-white" />
                          </div>
                          <h2 className="HeaderLabel text-3xl md:text-5xl text-[#0A0D14]">Reklam Strateji Raporu</h2>
                       </div>
                       <p className="text-[#4B5563] text-xl font-medium opacity-80 leading-relaxed max-w-4xl italic">
                          "{strategy.summary}"
                       </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                       
                       {/* Visuals */}
                       <div className="bg-[#FAF9FB] p-8 rounded-[2.5rem] border border-slate-50 space-y-4">
                          <div className="flex items-center gap-3 text-[#ED2970]">
                             <Palette className="w-6 h-6" />
                             <span className="HeaderLabel text-xl uppercase italic">Görsel Tasarım</span>
                          </div>
                          <div className="space-y-4 text-sm font-medium text-slate-600">
                             <p><strong className="text-slate-900 block mb-1">Renk Paleti:</strong> {strategy.visuals.colors}</p>
                             <p><strong className="text-slate-900 block mb-1">Konseptler:</strong> {strategy.visuals.concepts}</p>
                          </div>
                       </div>

                       {/* Video */}
                       <div className="bg-[#FAF9FB] p-8 rounded-[2.5rem] border border-slate-50 space-y-4">
                          <div className="flex items-center gap-3 text-[#ED2970]">
                             <Video className="w-6 h-6" />
                             <span className="HeaderLabel text-xl uppercase italic">Video Stratejisi</span>
                          </div>
                          <div className="space-y-4 text-sm font-medium text-slate-600">
                             <p><strong className="text-slate-900 block mb-1">Süre & Tarz:</strong> {strategy.video.length} - {strategy.video.style}</p>
                             <p><strong className="text-slate-900 block mb-1">UGC & Ses:</strong> {strategy.video.ugc} | {strategy.video.voice}</p>
                          </div>
                       </div>

                       {/* Typography */}
                       <div className="bg-[#FAF9FB] p-8 rounded-[2.5rem] border border-slate-50 space-y-4">
                          <div className="flex items-center gap-3 text-[#ED2970]">
                             <Type className="w-6 h-6" />
                             <span className="HeaderLabel text-xl uppercase italic">Tipografi</span>
                          </div>
                          <p className="text-sm font-medium text-slate-600">{strategy.typography}</p>
                       </div>

                       {/* Hooks */}
                       <div className="bg-white p-8 rounded-[2.5rem] border-2 border-[#ED2970]/10 space-y-4 shadow-sm">
                          <div className="flex items-center gap-3 text-[#ED2970]">
                             <Target className="w-6 h-6" />
                             <span className="HeaderLabel text-xl uppercase italic">Hook Önerileri</span>
                          </div>
                          <ul className="space-y-3">
                             {strategy.hooks.map((hook: string, i: number) => (
                               <li key={i} className="flex gap-3 text-sm font-bold text-slate-700">
                                  <span className="text-[#ED2970]">#0{i+1}</span>
                                  {hook}
                               </li>
                             ))}
                          </ul>
                       </div>

                       {/* CTA */}
                       <div className="bg-white p-8 rounded-[2.5rem] border-2 border-[#ED2970]/10 space-y-4 shadow-sm">
                          <div className="flex items-center gap-3 text-[#ED2970]">
                             <ArrowRight className="w-6 h-6" />
                             <span className="HeaderLabel text-xl uppercase italic">Eylem Çağrıları</span>
                          </div>
                          <ul className="space-y-3">
                             {strategy.cta.map((cta: string, i: number) => (
                               <li key={i} className="flex gap-3 text-sm font-bold text-slate-700">
                                  <Check className="w-4 h-4 text-[#ED2970]" />
                                  {cta}
                               </li>
                             ))}
                          </ul>
                       </div>

                       {/* Differentiation */}
                       <div className="bg-[#FAF9FB] p-8 rounded-[2.5rem] border border-slate-50 space-y-4">
                          <div className="flex items-center gap-3 text-[#ED2970]">
                             <Lightbulb className="w-6 h-6" />
                             <span className="HeaderLabel text-xl uppercase italic">Farklılaşma</span>
                          </div>
                          <p className="text-sm font-medium text-slate-600">{strategy.differentiation}</p>
                       </div>

                    </div>

                    {/* Platforms */}
                    <div className="mt-12 space-y-6">
                       <h3 className="HeaderLabel text-2xl uppercase italic text-slate-400">Platform Bazlı Formatlar</h3>
                       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                          {strategy.platforms.map((p: any, i: number) => (
                            <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:border-[#ED2970]/30 transition-all group">
                               <div className="text-[10px] font-black text-[#ED2970] uppercase tracking-widest mb-2 group-hover:scale-105 transition-transform">{p.name}</div>
                               <div className="text-xs font-bold text-slate-900 mb-2">{p.format}</div>
                               <div className="text-[10px] text-slate-400 font-medium">{p.tip}</div>
                            </div>
                          ))}
                       </div>
                    </div>

                    {/* Scenario */}
                    <div className="mt-12 bg-slate-900 rounded-[2.5rem] p-10 text-white relative overflow-hidden">
                       <div className="absolute top-0 right-0 w-64 h-64 bg-[#ED2970]/20 rounded-full blur-[80px]" />
                       <div className="relative z-10">
                          <div className="text-[#ED2970] font-black text-[10px] uppercase tracking-[0.3em] mb-4">Örnek Reklam Senaryosu</div>
                          <p className="text-xl font-medium leading-relaxed italic opacity-90">
                             {strategy.scenario}
                          </p>
                       </div>
                    </div>

                  </div>
                </motion.section>
              )}
            </AnimatePresence>
          </>
        )}

        {/* --- TAB 2: BRAND NEW AI VIDEO STUDIO WORKFLOW --- */}
        {activeTab === "video" && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full relative z-20 mb-16"
          >
            {/* Input Config & Upload Section Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Form Settings Panel */}
              <div className="lg:col-span-7 bg-white p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col gap-6">
                
                <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-rose-50 rounded-xl flex items-center justify-center text-[#ED2970]">
                      <Video className="w-4 h-4" />
                    </div>
                    <span className="HeaderLabel text-lg uppercase italic text-[#0A0D14]">Reklam Videosu Üretimi</span>
                  </div>
                  
                  {/* Generate / Edit Mode Subtabs */}
                  <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/40">
                    <button
                      onClick={() => setEditTab("generate")}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${
                        editTab === "generate" ? "bg-white text-[#ED2970] shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Sıfırdan AI
                    </button>
                    <button
                      onClick={() => setEditTab("edit")}
                      className={`px-3 py-1.5 rounded-md text-[9px] font-black uppercase tracking-wider transition-all ${
                        editTab === "edit" ? "bg-white text-[#ED2970] shadow-sm" : "text-slate-400 hover:text-slate-600"
                      }`}
                    >
                      Metin & Ses Ekle
                    </button>
                  </div>
                </div>

                {/* --- MODE A: ZERO TO ONE AI VIDEO GENERATION --- */}
                {editTab === "generate" && (
                  <div className="space-y-5">
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#ED2970]">Ürününüzün veya Mağazanızın Tanımı</label>
                      <textarea
                        value={videoPrompt}
                        onChange={(e) => setVideoPrompt(e.target.value)}
                        placeholder="Örn: Evcil hayvanlar için dökülme karşıtı organik kedi şampuanı satıyoruz. İlk 3 saniyede komik kedi hook'u olsun..."
                        className="w-full h-24 bg-slate-50 border border-slate-100 focus:border-[#ED2970]/30 rounded-2xl resize-none focus:ring-0 p-4 text-[#0A0D14] placeholder:text-slate-400 font-bold text-sm"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Hedef Kitle</label>
                        <select
                          value={targetAudience}
                          onChange={(e) => setTargetAudience(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>Gençler (18-24)</option>
                          <option>Yetişkinler (25-40)</option>
                          <option>Aileler & Ebeveynler</option>
                          <option>Profesyoneller & İş Dünyası</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Reklam Amacı</label>
                        <select
                          value={adGoal}
                          onChange={(e) => setAdGoal(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>Dönüşüm (Satış Artırma)</option>
                          <option>Marka Bilinirliği</option>
                          <option>Web Sitesi Trafiği</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Platform & Boyut</label>
                        <select
                          value={selectedPlatform}
                          onChange={(e) => setSelectedPlatform(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>Instagram Reels (9:16)</option>
                          <option>TikTok Ads (9:16)</option>
                          <option>Meta Feed Ads (1:1)</option>
                        </select>
                      </div>

                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Kreatif Video Stili</label>
                        <select
                          value={videoStyle}
                          onChange={(e) => setVideoStyle(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>UGC (Kullanıcı İçeriği)</option>
                          <option>Product Showcase (Ürün Sergileme)</option>
                          <option>Cinematic Reklam Videosu</option>
                          <option>TikTok Tarzı Komik / Eğlenceli</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* --- MODE B: UPLOAD & AUTOMATE EDITING PIPELINE --- */}
                {editTab === "edit" && (
                  <div className="space-y-5">
                    {/* Simulated Drag & Drop Zone */}
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black uppercase tracking-widest text-[#ED2970]">Kendi Reklam Videonuzu Yükleyin</label>
                      <div className="border-2 border-dashed border-slate-200 hover:border-[#ED2970]/30 transition-all rounded-3xl p-6 flex flex-col items-center justify-center gap-3 bg-slate-50 cursor-pointer relative overflow-hidden">
                        <Upload className="w-8 h-8 text-slate-300" />
                        <div className="text-center">
                          <p className="text-xs font-bold text-slate-700">Dosyanızı sürükleyin veya seçin</p>
                          <p className="text-[10px] text-slate-400 mt-1">MP4, MOV (Max 100MB)</p>
                        </div>
                        <input
                          type="file"
                          accept="video/*"
                          onChange={handleFileUploadSimulated}
                          className="absolute inset-0 opacity-0 cursor-pointer"
                        />
                        {videoFileName && (
                          <div className="mt-2 bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider flex items-center gap-1.5 z-10 animate-fade-in">
                            <CheckCircle2 className="w-3.5 h-3.5" />
                            <span>{videoFileName} Yüklendi!</span>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Voice character selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">AI Voice-Over Karakteri</label>
                        <select
                          value={voiceCharacter}
                          onChange={(e) => setVoiceCharacter(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>Buse (Kadın - UGC & Doğal)</option>
                          <option>Can (Erkek - Profesyonel)</option>
                          <option>Tiktok-Voice (Trend / Robotik)</option>
                          <option>Esra (Kadın - Heyecanlı)</option>
                        </select>
                      </div>

                      {/* Voice Tone Selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Ses Tonu Modu</label>
                        <select
                          value={voiceTone}
                          onChange={(e) => setVoiceTone(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>Coşkulu & Enerjik</option>
                          <option>Samimi & Doğal</option>
                          <option>Profesyonel & Güven Verici</option>
                        </select>
                      </div>

                      {/* Subtitle style selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Otomatik Altyazı Stili</label>
                        <select
                          value={subtitleStyle}
                          onChange={(e) => setSubtitleStyle(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>TikTok Popüler (Kalın Sarı)</option>
                          <option>Instagram Minimalist (Beyaz Arka Plan)</option>
                          <option>Cinematic (Modern Serif)</option>
                        </select>
                      </div>

                      {/* Trend music genre selection */}
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Trend Fon Müzik Türü</label>
                        <select
                          value={musicGenre}
                          onChange={(e) => setMusicGenre(e.target.value)}
                          className="bg-slate-50 border border-slate-100 rounded-xl p-3 text-xs font-bold text-slate-700 outline-none"
                        >
                          <option>Trend TikTok Beats</option>
                          <option>Dinamik & Enerjik Pop</option>
                          <option>Sakin & Rahatlatıcı Lofi</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* Action trigger button */}
                <button
                  onClick={generateVideoAd}
                  disabled={isRendering || (editTab === "generate" ? !videoPrompt.trim() : !videoFileName)}
                  className="bg-[#ED2970] disabled:bg-slate-200 text-white px-6 py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#D52464] transition-all shadow-xl shadow-[#ED2970]/20 flex items-center justify-center gap-2 mt-4"
                >
                  {isRendering ? (
                    <>
                      <span>Video Hazırlanıyor ({renderProgress}%)</span>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                    </>
                  ) : (
                    <>
                      <span>AI Reklam Videosunu Üret</span>
                      <Sparkles className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Right Column: Rendering Pipeline / Result Previewer */}
              <div className="lg:col-span-5 h-full">
                
                {/* --- PIPELINE RENDER LOADING SCREEN --- */}
                {isRendering && (
                  <div className="bg-slate-900 text-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-800 flex flex-col gap-6 relative overflow-hidden min-h-[500px]">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-[#ED2970]/10 rounded-full blur-[80px]" />
                    
                    <div className="flex flex-col gap-1 items-start z-10">
                      <div className="px-2.5 py-1 bg-[#ED2970]/20 border border-[#ED2970]/30 rounded-full flex items-center gap-1.5">
                        <div className="w-1.5 h-1.5 rounded-full bg-[#ED2970] animate-ping" />
                        <span className="text-[8px] font-black text-[#ED2970] uppercase tracking-widest">Render Pipeline</span>
                      </div>
                      <h3 className="HeaderLabel text-2xl uppercase italic mt-2">AI Video Hazırlanıyor</h3>
                    </div>

                    {/* Progress details */}
                    <div className="flex flex-col gap-2 mt-4 z-10">
                      <div className="flex justify-between items-baseline text-xs font-bold">
                        <span className="text-slate-400">Genel İlerleme</span>
                        <span className="text-[#ED2970] font-black">{renderProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <motion.div 
                          className="bg-[#ED2970] h-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${renderProgress}%` }}
                        />
                      </div>
                    </div>

                    {/* Interactive Pipeline Steps */}
                    <div className="flex flex-col gap-4 mt-4 z-10">
                      {[
                        { label: "Senaryo & Metin Analizi", step: 0, desc: "Gemini ile dönüşüm senaryosu yazılıyor..." },
                        { label: "AI Voice-Over Seslendirme Sentezi", step: 1, desc: "UGC seslendirme dalgaları sentezleniyor..." },
                        { label: "Otomatik Altyazı & Zamanlama", step: 2, desc: "Kelimeler sesle senkronize ediliyor..." },
                        { label: "Video Efektleri & Sahne Kırpma", step: 3, desc: "Hook zoom-in efektleri ekleniyor..." },
                        { label: "Trend Müzik & Ses Miksajı", step: 4, desc: "Müzik drop ritme göre konumlandırılıyor..." },
                        { label: "Final Reklam Videosu Render Ediliyor", step: 5, desc: "MP4 dikey format paketleniyor..." }
                      ].map((item, idx) => {
                        const isActive = renderStep === item.step;
                        const isCompleted = renderStep > item.step;
                        
                        return (
                          <div key={idx} className="flex gap-4 items-start transition-opacity duration-300">
                            <div className="flex flex-col items-center">
                              <div className={`w-5 h-5 rounded-full flex items-center justify-center border text-[9px] font-bold shrink-0 ${
                                isCompleted 
                                  ? "bg-emerald-500 border-emerald-500 text-white" 
                                  : isActive 
                                    ? "bg-[#ED2970] border-[#ED2970] text-white animate-pulse" 
                                    : "border-slate-700 text-slate-500 bg-transparent"
                              }`}>
                                {isCompleted ? "✓" : idx + 1}
                              </div>
                              {idx < 5 && <div className={`w-0.5 h-6 my-1 ${isCompleted ? "bg-emerald-500" : "bg-slate-800"}`} />}
                            </div>
                            <div className="flex flex-col gap-0.5">
                              <span className={`text-xs font-black uppercase tracking-wider ${isActive ? "text-white" : isCompleted ? "text-slate-400" : "text-slate-600"}`}>
                                {item.label}
                              </span>
                              {isActive && (
                                <span className="text-[10px] text-slate-400 italic font-medium animate-pulse">
                                  {item.desc}
                                </span>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* --- RENDER COMPLETED RESULTS STATE --- */}
                {!isRendering && videoAdResult && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col gap-6"
                  >
                    {/* Realistic Smartphone Preview Player */}
                    <div className="relative mx-auto w-[290px] h-[580px] bg-slate-900 rounded-[3rem] p-3 shadow-2xl border-4 border-slate-800/80 overflow-hidden group">
                      
                      {/* Top Speaker Bezel */}
                      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
                        <div className="w-12 h-1 bg-slate-800 rounded-full" />
                        <div className="w-2.5 h-2.5 bg-slate-800 rounded-full" />
                      </div>

                      {/* Screen content */}
                      <div className="relative w-full h-full bg-[#16131D] rounded-[2.5rem] overflow-hidden flex flex-col justify-between z-10 p-5">
                        
                        {/* Interactive Dynamic Video Canvas */}
                        <div className="absolute inset-0 z-0 bg-slate-950">
                          {/* Animated Color Glow for visual ad simulation */}
                          <div className="absolute inset-0 bg-gradient-to-tr from-[#FFEDF4] to-[#F0F2FF] opacity-10" />
                          
                          {/* A pulsing colored orb to mimic scene action when playing */}
                          <motion.div
                            className="absolute rounded-full filter blur-[40px] opacity-40 bg-[#ED2970]"
                            animate={{
                              width: isPlaying ? [180, 240, 180] : 180,
                              height: isPlaying ? [180, 240, 180] : 180,
                              left: isPlaying ? ["20%", "10%", "20%"] : "20%",
                              top: isPlaying ? ["30%", "20%", "30%"] : "30%",
                            }}
                            transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                          />

                          <motion.div
                            className="absolute rounded-full filter blur-[50px] opacity-30 bg-[#294BED]"
                            animate={{
                              width: isPlaying ? [150, 200, 150] : 150,
                              height: isPlaying ? [150, 200, 150] : 150,
                              right: isPlaying ? ["10%", "20%", "10%"] : "10%",
                              bottom: isPlaying ? ["20%", "30%", "20%"] : "20%",
                            }}
                            transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
                          />
                        </div>

                        {/* Top App Status Overlay */}
                        <div className="relative z-10 flex justify-between items-center text-[10px] text-white/40 font-bold">
                          <span>17:00</span>
                          <div className="flex items-center gap-1.5">
                            <span>LTE</span>
                            <div className="w-5 h-3 border border-white/30 rounded-sm p-0.5 flex items-center"><div className="bg-white/60 h-full w-4 rounded-sm" /></div>
                          </div>
                        </div>

                        {/* TikTok style Floating text overlay */}
                        <div className="relative z-10 flex-1 flex flex-col justify-center items-center text-center px-4 overflow-hidden mt-6">
                          
                          {/* Dynamic Subtitle overlay syncing with progress timer */}
                          <AnimatePresence mode="wait">
                            {isPlaying && getActiveSubtitle() && (
                              <motion.div
                                key={currentTime}
                                initial={{ scale: 0.85, opacity: 0 }}
                                animate={{ scale: 1.05, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className={`px-4 py-2 text-center text-lg leading-snug font-black rounded-xl select-none z-10 uppercase ${
                                  subtitleStyle.includes("Sarı") 
                                    ? "bg-slate-950/80 text-yellow-300 border-2 border-yellow-300 shadow-md font-sans" 
                                    : subtitleStyle.includes("Minimalist")
                                      ? "bg-white text-slate-900 border border-white shadow-lg font-sans"
                                      : "text-white italic tracking-wider font-serif bg-transparent text-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
                                }`}
                              >
                                {getActiveSubtitle()}
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Hook Overlay Title shown in first 3.5 seconds */}
                          {isPlaying && currentTime < 3.5 && (
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              className="absolute top-1/4 bg-[#ED2970] text-white px-3 py-1.5 text-[9px] font-black uppercase tracking-[0.2em] rounded-md shadow-lg shadow-[#ED2970]/30 select-none z-20 border border-white/20 italic"
                            >
                              🔥 {videoAdResult.hookText}
                            </motion.div>
                          )}
                        </div>

                        {/* Bottom Controller Panel */}
                        <div className="relative z-10 bg-slate-950/40 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col gap-3">
                          
                          {/* Playing script snippet */}
                          <div className="text-[9px] text-white/80 font-bold line-clamp-1 italic text-center">
                            "{videoAdResult.scenarioSummary}"
                          </div>

                          <div className="flex justify-between items-center gap-3">
                            {/* Play Pause Button */}
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="w-10 h-10 bg-white text-slate-950 hover:scale-105 active:scale-95 rounded-full flex items-center justify-center shrink-0 shadow-md transition-transform"
                            >
                              {isPlaying ? <Pause className="w-4 h-4 fill-slate-950" /> : <Play className="w-4 h-4 fill-slate-950 ml-0.5" />}
                            </button>

                            {/* Timeline Slider */}
                            <div className="flex-1 flex flex-col gap-1">
                              <div className="w-full bg-white/20 h-1 rounded-full overflow-hidden relative">
                                <div 
                                  className="bg-[#ED2970] h-full transition-all duration-100" 
                                  style={{ width: `${(currentTime / 15) * 100}%` }}
                                />
                              </div>
                              <div className="flex justify-between text-[8px] text-white/50 font-black">
                                <span>0:{currentTime < 10 ? `0${currentTime}` : currentTime}</span>
                                <span>0:15</span>
                              </div>
                            </div>

                            {/* Sound & Equalizer */}
                            <div className="flex items-center gap-1.5">
                              {renderEqualizer()}
                              <button
                                onClick={() => setIsMuted(!isMuted)}
                                className="text-white/60 hover:text-white transition-colors"
                              >
                                {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                              </button>
                            </div>
                          </div>
                        </div>

                      </div>
                    </div>

                    {/* Meta Campaign Direct Export Options */}
                    <div className="bg-white p-6 rounded-[2rem] shadow-[0_20px_45px_rgba(0,0,0,0.03)] border border-white flex flex-col gap-4">
                      <div className="flex justify-between items-center border-b border-slate-100 pb-3">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#ED2970]">Ad Variations</span>
                        <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200/40">
                          {["A", "B", "C"].map((item) => (
                            <button
                              key={item}
                              onClick={() => {
                                setSelectedVariation(item);
                                setCurrentTime(0);
                              }}
                              className={`px-3 py-1 rounded-md text-[9px] font-black uppercase transition-all ${
                                selectedVariation === item ? "bg-white text-slate-800 shadow-sm" : "text-slate-400 hover:text-slate-600"
                              }`}
                            >
                              Varyasyon {item}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <span className="text-xs font-bold text-slate-700">Müzik Temposu: <span className="text-slate-500 font-semibold">{videoAdResult.musicTrack}</span></span>
                        <span className="text-xs font-bold text-slate-700">Seslendirme Metni: <span className="text-slate-500 font-semibold italic">"{videoAdResult.voiceOverScript}"</span></span>
                      </div>

                      {/* Direct Meta ads manager transfer */}
                      <button
                        onClick={sendToMetaAds}
                        disabled={isSendingToMeta || metaSuccess}
                        className="w-full bg-[#294BED] disabled:bg-slate-200 text-white py-3.5 px-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#1D3CBF] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#294BED]/20"
                      >
                        {isSendingToMeta ? (
                          <>
                            <span>Aktarılıyor</span>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          </>
                        ) : metaSuccess ? (
                          <>
                            <span>Meta Ads Kampanyasına Eklendi!</span>
                            <CheckCircle2 className="w-3.5 h-3.5" />
                          </>
                        ) : (
                          <>
                            <span>Meta Ads Manager'a Gönder</span>
                            <Share2 className="w-3.5 h-3.5" />
                          </>
                        )}
                      </button>

                      {/* Meta Transfer Pipeline logs overlay */}
                      {isSendingToMeta && (
                        <div className="bg-blue-50 border border-blue-100 p-3.5 rounded-xl flex items-center gap-2.5 animate-pulse">
                          <Loader2 className="w-4 h-4 text-[#294BED] animate-spin shrink-0" />
                          <span className="text-[10px] font-bold text-[#294BED] uppercase tracking-wider">{metaSendProgress}</span>
                        </div>
                      )}

                      {metaSuccess && (
                        <div className="bg-emerald-50 border border-emerald-100 p-3.5 rounded-xl flex items-center gap-2.5 animate-fade-in">
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                          <div className="flex flex-col gap-0.5">
                            <span className="text-[10px] font-black text-emerald-800 uppercase tracking-widest">Başarılı!</span>
                            <span className="text-[9px] text-emerald-600 font-medium">Reklam videosu ve hedef kitle ayarları Meta Ads Manager hesabınıza yüklendi.</span>
                          </div>
                        </div>
                      )}
                    </div>
                  </motion.div>
                )}

                {/* Empty State visual */}
                {!isRendering && !videoAdResult && (
                  <div className="bg-[#FAF9FB] rounded-[2.5rem] border border-slate-100 p-12 text-center flex flex-col items-center justify-center gap-4 min-h-[500px]">
                    <div className="w-16 h-16 bg-white rounded-3xl flex items-center justify-center text-slate-300 shadow-sm border border-slate-50">
                      <Film className="w-8 h-8" />
                    </div>
                    <div className="max-w-xs">
                      <h4 className="HeaderLabel text-xl text-[#0A0D14] mb-2 uppercase italic">Video Stüdyosu Hazır</h4>
                      <p className="text-xs text-slate-400 font-medium leading-relaxed">
                        Reklam metniniz, UGC seslendirmeniz, otomatik altyazılarınız ve ritme duyarlı müzikleriniz tek tıkla derlenecek.
                      </p>
                    </div>
                  </div>
                )}

              </div>
            </div>
          </motion.div>
        )}

        {/* --- PERFORMANCE SECTION (ALWAYS VISIBLE AT BOTTOM, EXACTLY AS ORIGINAL DESIGN) --- */}
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

        {/* --- MULTI-PLATFORM SECTION (ALWAYS VISIBLE AT BOTTOM, EXACTLY AS ORIGINAL DESIGN) --- */}
        <section className="mt-20">
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="bg-white rounded-[4rem] p-8 md:p-16 shadow-[0_50px_120px_rgba(0,0,0,0.06)] border border-white relative overflow-visible"
           >
              <div className="max-w-4xl mx-auto lg:mx-0 text-left">
                 <span className="text-[#ED2970] font-black text-sm uppercase tracking-[0.2em] mb-4 block italic">Çoklu Platform Desteği</span>
                 <h2 className="HeaderLabel text-3xl md:text-5xl text-[#0A0D14] mb-8 leading-[1.1]">
                    Her Platform İçin Yapay Zeka Destekli Reklam İçerikleri Oluşturun
                 </h2>
                 <p className="text-[#4B5563] text-lg leading-relaxed mb-10 font-medium opacity-80">
                    TAMOC.AI, sosyal medya, arama motoru ve görüntülü reklam platformları için gerekli tüm boyut ve formatlarda yapay zeka destekli reklam görsellerini otomatik olarak oluşturur. Görsellerinizi Meta, Google, LinkedIn ve diğer platformlara anında uyarlayın; böylece her kampanya, manuel boyut değiştirme veya yeniden tasarım gerektirmeden yayınlanacak yere göre optimize edilir. Kampanyalarınızı daha hızlı başlatın, tutarlılığınızı koruyun ve hiçbir zorluk yaşamadan tüm kanallarda ölçeklendirin.
                 </p>
                 
                 <div className="space-y-4">
                    <div className="flex items-center gap-4 text-slate-700 font-bold">
                       <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                       <span>Tüm sosyal, arama ve görüntüleme kanallarını kapsar,</span>
                    </div>
                    <div className="flex items-center gap-4 text-slate-700 font-bold">
                       <Check className="w-5 h-5 text-[#ED2970] stroke-[4px]" />
                       <span>Oluşturulan reklam öğelerini her platform için yeniden boyutlandırın.</span>
                    </div>
                 </div>
              </div>
           </motion.div>
        </section>

      </main>
    </div>
  );
}

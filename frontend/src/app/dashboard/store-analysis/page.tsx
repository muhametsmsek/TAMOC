"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Loader2, CheckCircle2, Share2, Sparkles } from "lucide-react";

export default function StoreAnalysisPage() {
  const [storeUrl, setStoreUrl] = useState("");
  const [platform, setPlatform] = useState("Shopify");
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
        body: JSON.stringify({ storeUrl, platform, analysisDepth: "Tam" }),
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
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-3xl mx-auto mt-8"
    >
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <Globe className="w-6 h-6 text-[#ED2970]" />
        <h2 className="HeaderLabel text-3xl md:text-5xl text-[#0A0D14]">Mağaza & Ürün Analizi</h2>
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white flex flex-col gap-4">
        <label className="text-[10px] font-black uppercase tracking-widest text-[#ED2970]">
          Mağaza URL (e.g. https://myshop.com)
        </label>
        <input
          type="url"
          value={storeUrl}
          onChange={(e) => setStoreUrl(e.target.value)}
          placeholder="https://..."
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-[#0A0D14] placeholder:text-slate-400"
        />
        <label className="text-[10px] font-black uppercase tracking-widest text-[#ED2970] mt-4">
          Platform
        </label>
        <select
          value={platform}
          onChange={(e) => setPlatform(e.target.value)}
          className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-3 text-[#0A0D14]"
        >
          <option>Shopify</option>
          <option>WooCommerce</option>
          <option>ikas</option>
          <option>Ticimax</option>
        </select>
        <button
          onClick={analyze}
          disabled={isAnalyzing || !storeUrl.trim()}
          className="mt-4 bg-[#ED2970] disabled:bg-slate-200 text-white px-6 py-3 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] hover:bg-[#D52464] transition-all flex items-center justify-center gap-2"
        >
          {isAnalyzing ? (
            <>
              <span>Analiz Ediliyor...</span>
              <Loader2 className="w-4 h-4 animate-spin" />
            </>
          ) : (
            <>
              <span>Analizi Başlat</span>
              <Sparkles className="w-4 h-4" />
            </>
          )}
        </button>
      </div>

      {/* Result */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="mt-6 bg-rose-50 border border-rose-200 p-4 rounded-[2.5rem] text-rose-800"
          >
            {error}
          </motion.div>
        )}
        {result && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-6 bg-white p-8 rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.04)] border border-white"
          >
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle2 className="w-6 h-6 text-[#ED2970]" />
              <h3 className="HeaderLabel text-2xl text-[#0A0D14]">Analiz Sonucu</h3>
            </div>
            <pre className="text-sm whitespace-pre-wrap" style={{ overflowX: "auto" }}>
{JSON.stringify(result, null, 2)}
            </pre>
            <button
              onClick={() => {
                navigator.clipboard.writeText(JSON.stringify(result, null, 2));
              }}
              className="mt-4 flex items-center gap-2 text-[#ED2970] font-black text-sm"
            >
              <Share2 className="w-4 h-4" />
              <span>Kopyala</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

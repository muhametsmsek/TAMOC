"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface AnalysisData {
  storeAnalysis?: any;
  socialMediaAnalysis?: any;
  competitorAnalysis?: any;
}

interface AnalysisContextType {
  data: AnalysisData;
  setStoreAnalysis: (data: any) => void;
  setSocialMediaAnalysis: (data: any) => void;
  setCompetitorAnalysis: (data: any) => void;
}

const AnalysisContext = createContext<AnalysisContextType | undefined>(undefined);

export function AnalysisProvider({ children }: { children: React.ReactNode }) {
  const [data, setData] = useState<AnalysisData>({});

  // Load from local storage on mount
  useEffect(() => {
    const saved = localStorage.getItem("tamoc_analysis_data");
    if (saved) {
      try {
        setData(JSON.parse(saved));
      } catch (e) {}
    }
  }, []);

  // Save to local storage on change
  useEffect(() => {
    if (Object.keys(data).length > 0) {
      localStorage.setItem("tamoc_analysis_data", JSON.stringify(data));
    }
  }, [data]);

  const setStoreAnalysis = (storeAnalysis: any) => setData((prev) => ({ ...prev, storeAnalysis }));
  const setSocialMediaAnalysis = (socialMediaAnalysis: any) => setData((prev) => ({ ...prev, socialMediaAnalysis }));
  const setCompetitorAnalysis = (competitorAnalysis: any) => setData((prev) => ({ ...prev, competitorAnalysis }));

  return (
    <AnalysisContext.Provider value={{ data, setStoreAnalysis, setSocialMediaAnalysis, setCompetitorAnalysis }}>
      {children}
    </AnalysisContext.Provider>
  );
}

export function useAnalysis() {
  const context = useContext(AnalysisContext);
  if (context === undefined) {
    throw new Error("useAnalysis must be used within an AnalysisProvider");
  }
  return context;
}

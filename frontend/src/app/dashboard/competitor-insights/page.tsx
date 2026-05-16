"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Zap, 
  LayoutDashboard, 
  Settings, 
  Search,
  BrainCircuit,
  Eye,
  MousePointerClick
} from "lucide-react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Mock Grafik Verisi
const data = [
  { name: 'Pzt', roas: 2.1, spend: 400 },
  { name: 'Sal', roas: 2.4, spend: 300 },
  { name: 'Çar', roas: 2.2, spend: 550 },
  { name: 'Per', roas: 2.8, spend: 450 },
  { name: 'Cum', roas: 3.2, spend: 600 },
  { name: 'Cmt', roas: 3.5, spend: 800 },
  { name: 'Paz', roas: 4.1, spend: 950 },
];

export default function Dashboard() {
  return (
    <div className="flex min-h-screen bg-slate-50 text-slate-900">
      {/* Sidebar */}
      <aside className="w-64 border-r border-slate-200 bg-white p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-purple-100 p-2 rounded-lg">
            <Zap className="w-6 h-6 text-purple-600" />
          </div>
          <span className="text-xl font-bold tracking-wider text-slate-900">TAMOC<span className="text-purple-600">.AI</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Button variant="secondary" className="w-full justify-start gap-3 bg-slate-100 hover:bg-slate-200 text-slate-900 shadow-none">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
            <BarChart3 className="w-4 h-4" /> Competitor Insights
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50">
            <Users className="w-4 h-4" /> Audience Analysis
          </Button>
        </nav>

        <Button variant="ghost" className="w-full justify-start gap-3 text-slate-500 hover:text-slate-900 hover:bg-slate-50 mt-auto">
          <Settings className="w-4 h-4" /> Settings
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Competitor Insights AI</h1>
            <p className="text-slate-500 mt-1">Yapay zeka odaklı rakip ve reklam analizleri</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input 
                type="text" 
                placeholder="Rakip mağaza analizi..." 
                className="bg-white border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors w-64 text-slate-900"
              />
            </div>
            <Button className="bg-purple-600 hover:bg-purple-700 text-white rounded-full px-6 shadow-sm">
              Yeni Analiz Başlat
            </Button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Ortalama ROAS</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">3.24x</div>
              <p className="text-xs text-emerald-600 mt-1">+14% geçen haftaya göre</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Tıklama Oranı (CTR)</CardTitle>
              <MousePointerClick className="w-4 h-4 text-blue-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">%4.12</div>
              <p className="text-xs text-blue-600 mt-1">+2.1% sektör ortalamasının üstünde</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">Gösterim (Impression)</CardTitle>
              <Eye className="w-4 h-4 text-purple-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">1.2M</div>
              <p className="text-xs text-slate-400 mt-1">Son 7 gün</p>
            </CardContent>
          </Card>
          <Card className="bg-white border-slate-200 shadow-sm relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-purple-100 rounded-full blur-3xl"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-purple-600">AI Score</CardTitle>
              <BrainCircuit className="w-4 h-4 text-purple-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-slate-900">92/100</div>
              <p className="text-xs text-purple-600 mt-1">Mükemmel reklam sağlığı</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Chart Section */}
          <Card className="col-span-2 bg-white border-slate-200 shadow-sm">
            <CardHeader>
              <CardTitle className="text-slate-900">Performans Trendi (ROAS vs Harcama)</CardTitle>
              <CardDescription className="text-slate-500">Sektörel rakiplerinizle kıyaslamalı haftalık bazda reklam getirisi.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorRoas" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
                    <XAxis dataKey="name" stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <YAxis stroke="#94a3b8" axisLine={false} tickLine={false} />
                    <Tooltip 
                      contentStyle={{ backgroundColor: '#ffffff', borderColor: '#e2e8f0', borderRadius: '8px', color: '#0f172a' }}
                      itemStyle={{ color: '#0f172a' }}
                    />
                    <Area type="monotone" dataKey="roas" stroke="#8b5cf6" strokeWidth={3} fillOpacity={1} fill="url(#colorRoas)" />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* AI Reasoning Panel */}
          <Card className="bg-gradient-to-b from-white to-purple-50/50 border-slate-200 border-t-purple-400 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-400 to-transparent opacity-50"></div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <BrainCircuit className="w-5 h-5 text-purple-600" />
                <CardTitle className="text-lg text-slate-900">AI Strategic Insights</CardTitle>
              </div>
              <CardDescription className="text-slate-500">Aktif kampanyalarınız için yapay zeka tespitleri.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              
              <div className="bg-red-50 border border-red-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-red-100 p-1.5 rounded-full mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-red-500 block"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">Creative Hatası Tespit Edildi</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      "Yaz Koleksiyonu" reklamınız düşük performans gösteriyor çünkü ürün ilk 2 saniyede ekranda belirmiyor. Kullanıcıların %68'i ilk 3 saniyede videoyu kaydırıyor.
                    </p>
                    <Badge variant="outline" className="mt-2 border-red-200 text-red-600 bg-red-100/50">Action Required</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-purple-50 border border-purple-100 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-purple-100 p-1.5 rounded-full mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-purple-600 block"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-slate-900 mb-1">CRO Fırsatı</h4>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      Rakip analizi: Bu ürün tipi için UGC (Kullanıcı Üretimi İçerik) tarzı testimonial videolar %42 daha yüksek dönüşüm sağlıyor.
                    </p>
                    <Badge variant="outline" className="mt-2 border-purple-200 text-purple-700 bg-purple-100/50">Suggestion</Badge>
                  </div>
                </div>
              </div>

            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}

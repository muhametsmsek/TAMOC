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
    <div className="flex min-h-screen bg-[#09090b] text-white">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-[#0c0c0e] p-6 hidden md:flex flex-col">
        <div className="flex items-center gap-3 mb-12">
          <div className="bg-primary/20 p-2 rounded-lg">
            <Zap className="w-6 h-6 text-primary" />
          </div>
          <span className="text-xl font-bold tracking-wider">TAMOC<span className="text-primary">.AI</span></span>
        </div>
        
        <nav className="space-y-2 flex-1">
          <Button variant="secondary" className="w-full justify-start gap-3 bg-zinc-800/50 hover:bg-zinc-800 text-white">
            <LayoutDashboard className="w-4 h-4" /> Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
            <BarChart3 className="w-4 h-4" /> Competitor Insights
          </Button>
          <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 hover:text-white">
            <Users className="w-4 h-4" /> Audience Analysis
          </Button>
        </nav>

        <Button variant="ghost" className="w-full justify-start gap-3 text-zinc-400 mt-auto">
          <Settings className="w-4 h-4" /> Settings
        </Button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold">Competitor Insights AI</h1>
            <p className="text-zinc-400 mt-1">Yapay zeka odaklı rakip ve reklam analizleri</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input 
                type="text" 
                placeholder="Rakip mağaza analizi..." 
                className="bg-zinc-900 border border-zinc-800 rounded-full pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-64"
              />
            </div>
            <Button className="bg-primary hover:bg-primary/90 text-white rounded-full px-6">
              Yeni Analiz Başlat
            </Button>
          </div>
        </header>

        {/* KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Ortalama ROAS</CardTitle>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3.24x</div>
              <p className="text-xs text-emerald-400 mt-1">+14% geçen haftaya göre</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Tıklama Oranı (CTR)</CardTitle>
              <MousePointerClick className="w-4 h-4 text-blue-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">%4.12</div>
              <p className="text-xs text-blue-400 mt-1">+2.1% sektör ortalamasının üstünde</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-zinc-400">Gösterim (Impression)</CardTitle>
              <Eye className="w-4 h-4 text-purple-400" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">1.2M</div>
              <p className="text-xs text-zinc-500 mt-1">Son 7 gün</p>
            </CardContent>
          </Card>
          <Card className="bg-zinc-900/50 border-zinc-800 relative overflow-hidden">
            <div className="absolute right-0 top-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl"></div>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-primary">AI Score</CardTitle>
              <BrainCircuit className="w-4 h-4 text-primary" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-white">92/100</div>
              <p className="text-xs text-primary mt-1">Mükemmel reklam sağlığı</p>
            </CardContent>
          </Card>
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
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
                    <Badge variant="outline" className="mt-2 border-red-500/30 text-red-400 bg-red-500/10">Action Required</Badge>
                  </div>
                </div>
              </div>

              <div className="bg-black/40 border border-primary/20 rounded-lg p-4">
                <div className="flex items-start gap-3">
                  <div className="bg-primary/20 p-1.5 rounded-full mt-0.5">
                    <span className="w-2 h-2 rounded-full bg-primary block"></span>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white mb-1">CRO Fırsatı</h4>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                      Rakip analizi: Bu ürün tipi için UGC (Kullanıcı Üretimi İçerik) tarzı testimonial videolar %42 daha yüksek dönüşüm sağlıyor.
                    </p>
                    <Badge variant="outline" className="mt-2 border-primary/30 text-primary bg-primary/10">Suggestion</Badge>
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

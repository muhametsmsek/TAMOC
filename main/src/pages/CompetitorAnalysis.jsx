import { Search, TrendingDown, TrendingUp, AlertCircle, BarChart2 } from 'lucide-react';

function CompetitorAnalysis() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl mb-2">Rakip Analizi</h1>
          <p className="text-muted">Rakiplerinizin stratejilerini anlık olarak izleyin ve bir adım öne geçin.</p>
        </div>
      </div>

      <div className="glass-panel p-4 flex gap-4">
        <div className="flex-1 relative">
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            className="form-control pl-10" 
            placeholder="Rakip mağaza URL'si veya adı girin..." 
          />
        </div>
        <button className="btn btn-primary">Analiz Et</button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-2 flex flex-col gap-6">
          <div className="glass-panel p-6">
            <h2 className="text-lg mb-6 flex items-center gap-2">
              <BarChart2 size={20} className="text-accent-primary" />
              Fiyat Karşılaştırması
            </h2>
            
            <div className="flex flex-col gap-4">
              <div className="bg-bg-secondary p-4 rounded-lg flex items-center justify-between border border-border-color">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bg-card rounded flex items-center justify-center text-sm font-bold text-accent-primary">Ü1</div>
                  <div>
                    <h4 className="font-medium text-sm">Siyah Basic Tişört</h4>
                    <p className="text-xs text-muted">Sizin Fiyatınız: 249 TL</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-bold">Rakip: 199 TL</span>
                    <TrendingDown size={16} className="text-danger" />
                  </div>
                  <p className="text-xs text-danger mt-1">Rakip %20 daha ucuz</p>
                </div>
              </div>

              <div className="bg-bg-secondary p-4 rounded-lg flex items-center justify-between border border-border-color">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-bg-card rounded flex items-center justify-center text-sm font-bold text-accent-secondary">Ü2</div>
                  <div>
                    <h4 className="font-medium text-sm">Mavi Kot Pantolon</h4>
                    <p className="text-xs text-muted">Sizin Fiyatınız: 899 TL</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-2 justify-end">
                    <span className="text-sm font-bold">Rakip: 950 TL</span>
                    <TrendingUp size={16} className="text-success" />
                  </div>
                  <p className="text-xs text-success mt-1">Fiyat avantajınız var</p>
                </div>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <h2 className="text-lg mb-4">Rakip Reklam Stratejileri</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-border-color text-muted">
                    <th className="pb-3 font-medium">Rakip</th>
                    <th className="pb-3 font-medium">Aktif Reklam Sayısı</th>
                    <th className="pb-3 font-medium">Ana Platform</th>
                    <th className="pb-3 font-medium">Format</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-light">
                    <td className="py-3 font-medium">ModaX</td>
                    <td className="py-3">42 <span className="text-success text-xs ml-1">(+5)</span></td>
                    <td className="py-3">Instagram</td>
                    <td className="py-3">Reels / Video</td>
                  </tr>
                  <tr className="border-b border-border-light">
                    <td className="py-3 font-medium">TrendGiyim</td>
                    <td className="py-3">18 <span className="text-danger text-xs ml-1">(-2)</span></td>
                    <td className="py-3">Facebook</td>
                    <td className="py-3">Carousel (Kaydırmalı)</td>
                  </tr>
                  <tr>
                    <td className="py-3 font-medium">ButikZ</td>
                    <td className="py-3">56</td>
                    <td className="py-3">TikTok</td>
                    <td className="py-3">Kısa Video</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div className="col-span-1 flex flex-col gap-6">
          <div className="glass-panel p-6 bg-gradient-to-b from-[rgba(239,68,68,0.05)] to-transparent border-t-2 border-t-danger">
            <h3 className="text-lg mb-4 flex items-center gap-2 text-danger">
              <AlertCircle size={20} />
              AI Aksiyon Önerileri
            </h3>
            <ul className="flex flex-col gap-4">
              <li className="text-sm">
                <strong className="block text-text-primary mb-1">Fiyat Rekabeti</strong>
                <span className="text-muted leading-relaxed">"Siyah Basic Tişört" ürününde rakip ModaX 199 TL'ye düştü. Kısa süreli bir kampanya ile 189 TL bandına inmeniz önerilir.</span>
              </li>
              <div className="h-px w-full bg-border-light"></div>
              <li className="text-sm">
                <strong className="block text-text-primary mb-1">Yeni Format Deneyin</strong>
                <span className="text-muted leading-relaxed">Rakipleriniz çoğunlukla Video formatına yönelmiş. Statik görsel yerine kısa Reels içerikleri üretmeniz etkileşimi %40 artırabilir.</span>
              </li>
            </ul>
            <button className="btn btn-secondary w-full mt-6 text-xs border-danger text-danger hover:bg-danger hover:text-white">
              Stratejiyi Uygula
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompetitorAnalysis;

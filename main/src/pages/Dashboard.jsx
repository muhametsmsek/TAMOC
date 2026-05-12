import { BarChart, TrendingUp, Users, DollarSign } from 'lucide-react';

function Dashboard() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl mb-2">Gösterge Paneli</h1>
          <p className="text-muted">Mağazanızın genel durumu ve AI analiz özetleri</p>
        </div>
        <button className="btn btn-primary">
          <TrendingUp size={18} />
          Yeni Analiz Başlat
        </button>
      </div>

      <div className="grid grid-cols-3">
        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted text-sm font-medium">Toplam Ziyaretçi</p>
              <h3 className="text-2xl mt-1">24,593</h3>
            </div>
            <div className="btn-icon bg-opacity-20 text-info">
              <Users size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-success text-sm">
            <TrendingUp size={14} />
            <span>+12.5% geçen haftaya göre</span>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-muted text-sm font-medium">Reklam ROAS</p>
              <h3 className="text-2xl mt-1">4.2x</h3>
            </div>
            <div className="btn-icon bg-opacity-20 text-success">
              <DollarSign size={20} />
            </div>
          </div>
          <div className="flex items-center gap-2 text-success text-sm">
            <TrendingUp size={14} />
            <span>+0.8x geçen haftaya göre</span>
          </div>
        </div>

        <div className="glass-panel p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <BarChart size={100} />
          </div>
          <h3 className="text-lg mb-2">AI Önerisi <span className="badge badge-ai ml-2">Yeni</span></h3>
          <p className="text-sm text-muted mb-4 relative z-10">
            "Yaz İndirimi" kampanyanızdaki tıklama oranları düştü. Kreatifleri güncellemeniz önerilir.
          </p>
          <button className="text-accent-secondary text-sm font-medium hover:underline relative z-10">
            Detayları Gör &rarr;
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 mt-4">
        <div className="glass-panel p-6">
          <h3 className="text-lg mb-4">Son Aktiviteler</h3>
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between border-b border-light pb-4 last:border-0 last:pb-0">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-accent-primary"></div>
                  <div>
                    <p className="text-sm font-medium">Yeni ürün açıklaması oluşturuldu</p>
                    <p className="text-xs text-muted">2 saat önce</p>
                  </div>
                </div>
                <button className="text-xs btn-secondary px-3 py-1 rounded">Görüntüle</button>
              </div>
            ))}
          </div>
        </div>
        
        <div className="glass-panel p-6">
          <h3 className="text-lg mb-4">Rakip Uyarıları</h3>
          <div className="flex flex-col gap-4">
            <div className="p-4 bg-danger bg-opacity-10 rounded-md border border-danger border-opacity-20">
              <div className="flex items-start gap-3">
                <span className="text-danger mt-1">⚠️</span>
                <div>
                  <h4 className="text-sm font-semibold text-danger">Fiyat Değişimi</h4>
                  <p className="text-xs text-muted mt-1">Ana rakibiniz "Trendyol" en çok satan ürününüzde %10 indirime gitti.</p>
                </div>
              </div>
            </div>
            <div className="p-4 bg-warning bg-opacity-10 rounded-md border border-warning border-opacity-20">
              <div className="flex items-start gap-3">
                <span className="text-warning mt-1">💡</span>
                <div>
                  <h4 className="text-sm font-semibold text-warning">Yeni Reklam Stratejisi</h4>
                  <p className="text-xs text-muted mt-1">Sektörünüzde "Reels" formatında reklam kullanımı %45 arttı.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

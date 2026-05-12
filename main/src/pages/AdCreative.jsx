import { Wand2, Image as ImageIcon, Copy, RefreshCw } from 'lucide-react';

function AdCreative() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl mb-2">Reklam Kreatifi Geliştirici</h1>
          <p className="text-muted">AI ile dönüşüm oranınızı artıracak görseller ve metinler oluşturun.</p>
        </div>
        <button className="btn btn-primary">
          <Wand2 size={18} />
          Yeni Kreatif Üret
        </button>
      </div>

      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-1 flex flex-col gap-6">
          <div className="glass-panel p-6">
            <h3 className="text-lg mb-4">Parametreler</h3>
            <div className="form-group">
              <label className="form-label">Hedef Kitle</label>
              <select className="form-control">
                <option>Genç Yetişkinler (18-24)</option>
                <option>Profesyoneller (25-34)</option>
                <option>Ebeveynler</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Kampanya Amacı</label>
              <select className="form-control">
                <option>Doğrudan Satış</option>
                <option>Marka Bilinirliği</option>
                <option>Lead Toplama</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Ton</label>
              <select className="form-control">
                <option>Enerjik & Heyecanlı</option>
                <option>Profesyonel</option>
                <option>Samimi & Doğal</option>
              </select>
            </div>
            <button className="btn btn-secondary w-full mt-2">
              <RefreshCw size={16} />
              Önerileri Yenile
            </button>
          </div>
        </div>

        <div className="col-span-2 flex flex-col gap-6">
          <h2 className="text-xl">AI Önerileri</h2>
          
          <div className="glass-panel p-6 border-l-4 border-l-accent-primary">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-accent-primary">#1</span> Yüksek Dönüşüm Potansiyeli
              </h3>
              <span className="badge badge-ai">98% Eşleşme</span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted mb-2 font-medium">Reklam Metni (Copy)</p>
              <div className="bg-bg-secondary p-4 rounded-md relative group">
                <p className="text-sm">Yazın tadını çıkarırken tarzından ödün verme! 🌞 Yeni koleksiyonumuzdaki %20 indirim fırsatını yakala. Sadece 48 saat geçerli! Stoklar tükenmeden hemen tıkla. 👇</p>
                <button className="absolute top-2 right-2 btn-icon opacity-0 group-hover:opacity-100 bg-bg-card">
                  <Copy size={14} />
                </button>
              </div>
            </div>

            <div>
              <p className="text-sm text-muted mb-2 font-medium">Görsel Yönergesi</p>
              <div className="flex items-start gap-4 bg-bg-secondary p-4 rounded-md">
                <div className="w-16 h-16 bg-bg-card rounded flex items-center justify-center flex-shrink-0 text-muted">
                  <ImageIcon size={24} />
                </div>
                <p className="text-sm text-text-secondary">
                  <strong>Kompozisyon:</strong> Canlı sarı arka plan önünde ürünü kullanan mutlu bir model. <br/>
                  <strong>Metin (Görsel İçi):</strong> Kalın ve okunaklı fontlarla "YAZ FIRSATI - %20 İNDİRİM" yazısı sol üst köşede. <br/>
                  <strong>CTA Butonu:</strong> Kontrast yaratacak şekilde siyah veya lacivert tonlarda "Alışverişe Başla" butonu.
                </p>
              </div>
            </div>
          </div>

          <div className="glass-panel p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <span className="text-text-secondary">#2</span> Alternatif - Merak Uyandırıcı
              </h3>
              <span className="badge border border-border-color">85% Eşleşme</span>
            </div>
            
            <div className="mb-4">
              <p className="text-sm text-muted mb-2 font-medium">Reklam Metni (Copy)</p>
              <div className="bg-bg-secondary p-4 rounded-md relative group">
                <p className="text-sm">Herkes bu sezon ne giyiyor? 👀 Dolabının eksik parçasını bulduk. Üstelik şimdi çok özel bir fiyatla. Detaylar linkte...</p>
                <button className="absolute top-2 right-2 btn-icon opacity-0 group-hover:opacity-100 bg-bg-card">
                  <Copy size={14} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdCreative;

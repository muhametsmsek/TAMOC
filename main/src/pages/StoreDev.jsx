import { Edit3, Image as ImageIcon, Check, Star } from 'lucide-react';

function StoreDev() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h1 className="text-2xl mb-2">Mağaza Geliştirme</h1>
          <p className="text-muted">Ürün açıklamalarınızı ve görsellerinizi optimize edin.</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent-secondary bg-opacity-20 text-accent-secondary flex items-center justify-center">
              <Edit3 size={20} />
            </div>
            <h2 className="text-xl">SEO Uyumlu Ürün Açıklaması</h2>
          </div>

          <div className="form-group">
            <label className="form-label">Ürün Adı</label>
            <input type="text" className="form-control" defaultValue="Kadın Siyah Deri Ceket" />
          </div>
          
          <div className="form-group">
            <label className="form-label">Anahtar Kelimeler (Virgülle ayırın)</label>
            <input type="text" className="form-control" defaultValue="deri ceket, kadın dış giyim, kışlık ceket, motorcu ceketi" />
          </div>

          <button className="btn btn-primary w-full mb-6">Açıklama Oluştur</button>

          <div className="bg-bg-secondary p-4 rounded-md border border-border-color">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium text-success flex items-center gap-1">
                <Check size={14} /> Üretildi
              </span>
            </div>
            <p className="text-sm text-text-secondary leading-relaxed">
              Her mevsimin vazgeçilmezi <strong>kadın siyah deri ceket</strong> ile tarzınızı bir üst seviyeye taşıyın. Modern <strong>motorcu ceketi</strong> kesimi ve kaliteli suni deri materyali ile hem şıklığı hem de rahatlığı bir arada sunar. <strong>Kadın dış giyim</strong> koleksiyonunuzun en değerli parçası olacak bu <strong>kışlık ceket</strong>, kot pantolonlardan elbiselere kadar her kombinle mükemmel uyum sağlar.
            </p>
          </div>
        </div>

        <div className="glass-panel p-6">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent-primary bg-opacity-20 text-accent-primary flex items-center justify-center">
              <ImageIcon size={20} />
            </div>
            <h2 className="text-xl">Görsel Kalite Analizi</h2>
          </div>

          <div className="border-2 border-dashed border-border-color rounded-lg p-8 flex flex-col items-center justify-center text-center mb-6 hover:border-accent-primary transition-colors cursor-pointer bg-bg-secondary bg-opacity-50">
            <ImageIcon size={32} className="text-muted mb-4" />
            <p className="text-sm font-medium mb-1">Ürün görselini buraya sürükleyin</p>
            <p className="text-xs text-muted">veya bilgisayarınızdan seçin (JPG, PNG)</p>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-medium text-muted">Örnek Analiz Sonucu</h3>
            <div className="flex items-center justify-between p-3 bg-bg-secondary rounded border border-border-color">
              <span className="text-sm">Arka Plan Temizliği</span>
              <div className="flex items-center gap-2">
                <span className="text-success text-sm">İyi</span>
                <div className="w-16 h-2 bg-bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-success w-4/5"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-secondary rounded border border-border-color">
              <span className="text-sm">Işık ve Kontrast</span>
              <div className="flex items-center gap-2">
                <span className="text-warning text-sm">Geliştirilebilir</span>
                <div className="w-16 h-2 bg-bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-warning w-3/5"></div>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-bg-secondary rounded border border-border-color">
              <span className="text-sm">Çözünürlük</span>
              <div className="flex items-center gap-2">
                <span className="text-success text-sm">Mükemmel</span>
                <div className="w-16 h-2 bg-bg-card rounded-full overflow-hidden">
                  <div className="h-full bg-success w-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StoreDev;

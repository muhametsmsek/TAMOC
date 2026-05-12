import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Link as LinkIcon, CheckCircle2 } from 'lucide-react';

function Onboarding() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  
  const handleNext = () => {
    if (step < 3) setStep(step + 1);
    else navigate('/dashboard');
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="glass-panel max-w-2xl w-full p-8 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-accent-primary rounded-full filter blur-[100px] opacity-20 transform translate-x-1/2 -translate-y-1/2"></div>
        
        <div className="relative z-10">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold mb-2">
              <span className="text-gradient">TAMOC Pro</span>'ya Hoş Geldiniz
            </h1>
            <p className="text-muted">Yapay zeka destekli reklam ve pazarlama platformunuza bağlanın.</p>
          </div>

          <div className="flex justify-between mb-8 relative">
            <div className="absolute top-1/2 left-0 w-full h-0.5 bg-border-color -z-10 transform -translate-y-1/2"></div>
            {[1, 2, 3].map((s) => (
              <div 
                key={s} 
                className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                  step >= s ? 'bg-gradient-primary text-white shadow-glow' : 'bg-bg-secondary text-muted border border-border-color'
                }`}
              >
                {step > s ? <CheckCircle2 size={20} /> : s}
              </div>
            ))}
          </div>

          <div className="min-h-[250px]">
            {step === 1 && (
              <div className="animate-fade-in">
                <h2 className="text-xl mb-4">Mağaza Bilgileri</h2>
                <div className="form-group">
                  <label className="form-label">Mağaza Adı</label>
                  <input type="text" className="form-control" placeholder="Örn: Butik Modam" />
                </div>
                <div className="form-group">
                  <label className="form-label">Web Sitesi URL'si</label>
                  <input type="url" className="form-control" placeholder="https://www.butikmodam.com" />
                </div>
                <div className="form-group">
                  <label className="form-label">Sektör / Kategori</label>
                  <select className="form-control bg-bg-secondary">
                    <option>Giyim & Moda</option>
                    <option>Elektronik</option>
                    <option>Kozmetik</option>
                    <option>Ev & Yaşam</option>
                  </select>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl mb-4">Meta Business Bağlantısı</h2>
                <p className="text-sm text-muted mb-6">
                  Reklam verilerinizi analiz edebilmemiz için Meta (Facebook/Instagram) Business hesabınızı bağlayın.
                </p>
                <div className="border border-border-color rounded-lg p-6 text-center hover:border-accent-primary transition-colors cursor-pointer bg-black bg-opacity-20">
                  <div className="w-16 h-16 bg-[#1877F2] bg-opacity-10 text-[#1877F2] rounded-full flex items-center justify-center mx-auto mb-4">
                    <LinkIcon size={28} />
                  </div>
                  <h3 className="font-semibold mb-2">Meta Hesabını Bağla</h3>
                  <p className="text-xs text-muted">Güvenli OAuth 2.0 bağlantısı</p>
                </div>
              </div>
            )}

            {step === 3 && (
              <div className="animate-fade-in text-center">
                <div className="w-20 h-20 bg-success bg-opacity-10 text-success rounded-full flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={40} />
                </div>
                <h2 className="text-2xl mb-2">Harika! Her Şey Hazır.</h2>
                <p className="text-muted mb-6">
                  Yapay zeka asistanınız mağaza verilerinizi analiz etmeye başladı.
                </p>
                <div className="p-4 bg-bg-secondary rounded-lg border border-border-color text-left mb-4 flex gap-3">
                  <span className="text-accent-secondary">✨</span>
                  <p className="text-sm text-text-secondary">İlk rakip analiziniz ve ürün tavsiyeleriniz gösterge panelinde sizi bekliyor.</p>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between mt-8 pt-6 border-t border-border-color">
            <button 
              className={`btn btn-secondary ${step === 1 ? 'invisible' : ''}`}
              onClick={() => setStep(step - 1)}
            >
              Geri
            </button>
            <button className="btn btn-primary" onClick={handleNext}>
              {step === 3 ? 'Panele Git' : 'Devam Et'}
              {step !== 3 && <ArrowRight size={18} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Onboarding;

import { NextResponse } from 'next/server';
import { GoogleGenerativeAI, SchemaType } from '@google/generative-ai';

// .env.local dosyasından API key'i alıyoruz
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

export async function POST(request: Request) {
  try {
    const { url } = await request.json();

    if (!url) {
      return NextResponse.json({ error: 'Lütfen geçerli bir URL girin' }, { status: 400 });
    }

    // ADIM 1: VERİ KAZIMA (SCRAPING) SİMÜLASYONU
    // Gerçek e-ticaret siteleri (Trendyol, Amazon vb.) botlara karşı Cloudflare/Akamai gibi çok güçlü 
    // güvenlik duvarları kullanır. Basit fetch işlemleri genelde "403 Forbidden" döner.
    // Ancak yine de şansımızı deneyip raw HTML'i almaya çalışıyoruz.
    let pageContent = "";
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 saniye zaman aşımı
      
      const res = await fetch(url, { 
        signal: controller.signal,
        headers: {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
        }
      });
      clearTimeout(timeoutId);
      
      if (!res.ok) {
        return NextResponse.json({ error: `Siteye ulaşılamadı. HTTP Hatası: ${res.status} ${res.statusText}. Bot koruması olabilir.` }, { status: 400 });
      }

      const html = await res.text();
      // HTML etiketlerini temizle
      const rawText = html.replace(/<[^>]*>?/gm, ' ');
      // Çok uzunsa kırp
      pageContent = rawText.substring(0, 30000); 

      if (pageContent.trim().length === 0) {
        return NextResponse.json({ error: 'Sayfa başarıyla çekildi ancak içi tamamen boş görünüyor (Sadece JavaScript ile çalışan bir uygulama olabilir).' }, { status: 400 });
      }

    } catch (e: any) {
      return NextResponse.json({ error: `Site içeriği çekilirken hata oluştu: ${e.message}` }, { status: 500 });
    }

    // ADIM 2: GEMINI AI İLE ANALİZ (STRUCTURED OUTPUT - JSON SCHEMA)
    // Gemini 1.5 Flash modelini kullanıyoruz çünkü hızlı ve e-ticaret analizi için çok yeterli.
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json", // Çıktıyı kesinlikle JSON olarak zorlar
        responseSchema: {
          type: SchemaType.OBJECT,
          properties: {
            weak_points: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.STRING },
              description: "Müşterilerin şikayet ettiği zayıf noktalar (Örn: 'Kargo çok yavaş')",
            },
            summary: {
              type: SchemaType.STRING,
              description: "Yorumların ve sayfanın genel özet analizi",
            },
            opportunity: {
              type: SchemaType.STRING,
              description: "Satıcının bu şikayetleri avantaja çevirmek için uygulayabileceği strateji (Pazar fırsatı)",
            },
            recommended_price: {
                type: SchemaType.NUMBER,
                description: "Satıcının piyasa ile rekabet etmesi için önerilen TL bazında satış fiyatı"
            },
            estimated_roas_trend: {
              type: SchemaType.ARRAY,
              items: { type: SchemaType.NUMBER },
              description: "Bu ürünün veya sektörün son 7 haftalık tahmini (beklenen) sektörel ortalama ROAS değerleri. (Örn: [2.1, 2.4, 2.2, 3.1, 3.5, 3.2, 4.0]). Mutlaka 7 adet mantıklı ondalık sayı içermelidir."
            }
          },
          required: ["weak_points", "summary", "opportunity", "recommended_price", "estimated_roas_trend"],
        },
      },
    });

    // Optimize Edilmiş Sistem Promptu
    const prompt = `
      Sen e-ticaret verilerini analiz eden uzman bir stratejistsin.
      Kullanıcı sana şu linki verdi: ${url}
      Bu linkten okuyabildiğimiz kadarıyla sayfanın ham metin içeriği aşağıdadır.
      Eğer metin anlamsızsa veya analiz edilebilecek veri yoksa, kendi yeteneklerini kullanarak linkteki ürünü/sayfayı/sektörü analiz etmeye çalış.
      Lütfen bu veriyi veya link bilgisini dikkatlice kullanarak biz (rakip satıcı) için zayıf noktaları ve fırsatları bul.
      Ayrıca bu ürünün bulunduğu sektörü/kategoriyi tahmin et ve bu sektöre uygun, mantıklı bir 7 haftalık ROAS (Return on Ad Spend) trendi üret.
      Eğer sayfada hiçbir mantıklı bilgi yoksa, summary kısmına "Yeterli analiz verisi bulunamadı" şeklinde belirt ancak yine de tahmin yürüterek 7 adet ROAS verisi doldur.
      
      Web Sayfasından Okunan Ham Veri:
      ${pageContent}
    `;

    // API'yi çağırıyoruz
    const result = await model.generateContent(prompt);
    const responseText = result.response.text();
    const analysis = JSON.parse(responseText);

    return NextResponse.json(analysis);
  } catch (error: any) {
    console.error("AI Analysis Error:", error);
    return NextResponse.json({ error: error.message || 'Analiz sırasında bir hata oluştu' }, { status: 500 });
  }
}

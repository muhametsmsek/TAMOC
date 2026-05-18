import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { storeUrl, platform, analysisDepth } = await req.json();

    if (!storeUrl) {
      return NextResponse.json({ error: "Mağaza URL'si gereklidir" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API anahtarı yapılandırılmamış" }, { status: 500 });
    }

    const systemPrompt = `
Sen deneyimli bir CRO (Conversion Rate Optimization) uzmanı, e-ticaret danışmanı ve kullanıcı deneyimi (UX) analistisin.
Kullanıcının verdiği e-ticaret mağaza URL'sini ve platform bilgisini dikkate alarak kapsamlı bir mağaza analizi raporu hazırlayacaksın.

Analiz Girdileri:
- Mağaza URL'si: ${storeUrl}
- Platform: ${platform || "Belirtilmemiş (otomatik tespit et)"}
- Analiz Derinliği: ${analysisDepth || "Tam Analiz"}

Görevin şu kategorilerde profesyonel analiz sunmak:

1. ANA SAYFA & TASARIM ANALİZİ: Görsel kalite, marka tutarlılığı, banner etkinliği, güven unsurları, mobil uyumluluk algısı, renk uyumu
2. CTA & DÖNÜŞÜM ANALİZİ: Satın alma butonlarının konumu ve etkinliği, aciliyet hissi, sepete ekle akışı, checkout kolaylığı
3. ÜRÜN SAYFASI ANALİZİ: Görsel kalitesi, profesyonellik, arka plan, ışıklandırma, çekim açısı, UGC ihtiyacı, video eksikliği
4. ÜRÜN AÇIKLAMASI ANALİZİ: Uzunluk, ikna gücü, fayda odaklılık, duygusal satış dili, SEO uyumu, hook kalitesi
5. YORUM & SOSYAL KANIT ANALİZİ: Yorum sayısı ve kalitesi, gerçekçilik algısı, fotoğraflı yorum eksikliği, UGC ihtiyacı
6. GÜVENİLİRLİK ANALİZİ: SSL, iade politikası görünürlüğü, kargo bilgisi, iletişim erişimi, garanti unsurları
7. CRO ÖNERİLERİ: Öncelikli iyileştirmeler, quick wins (hızlı kazanımlar), orta vadeli geliştirmeler
8. GENEL SKOR: Her kategori için 0-100 arası puan ve genel ortalama

Yanıtın JSON formatında olmalı ve tam olarak şu yapıyı içermelidir:
{
  "overallScore": 72,
  "storeName": "Mağaza adı (URL'den çıkar)",
  "platform": "Shopify / WooCommerce / ikas / Ticimax vb.",
  "summary": "Mağaza hakkında 2-3 cümlelik profesyonel özet",
  "scores": {
    "homepage": 75,
    "productPage": 60,
    "productDescription": 55,
    "reviews": 45,
    "trustSignals": 70,
    "cta": 65,
    "mobileExperience": 80
  },
  "strengths": [
    { "title": "Güçlü Yön Başlığı", "detail": "Detaylı açıklama (neden iyi, ne etkisi var)" }
  ],
  "weaknesses": [
    { "title": "Zayıf Yön Başlığı", "detail": "Detaylı açıklama (neden kötü, satışa etkisi)", "severity": "critical" }
  ],
  "criticalIssues": [
    { "issue": "Kritik Sorun", "impact": "Satış/dönüşüm üzerindeki somut etkisi", "fix": "Hemen yapılması gereken aksiyon" }
  ],
  "productAnalysis": {
    "imageQuality": { "score": 60, "issues": ["Arka plan düzensiz", "Işıklandırma yetersiz"], "recommendations": ["Beyaz/nötr arka plan kullan", "Doğal ışık veya softbox kullan"] },
    "descriptionQuality": { "score": 55, "issues": ["Çok kısa", "Fayda değil özellik anlatıyor"], "exampleHook": "Örnek güçlü hook cümlesi", "exampleDescription": "Örnek profesyonel ürün açıklaması (3-4 madde)" },
    "reviewQuality": { "score": 45, "issues": ["Az yorum", "Fotoğrafsız yorumlar"], "recommendations": ["Email ile yorum toplama kampanyası başlat", "Fotoğraflı yorum teşviki için indirim kodu ver"] }
  },
  "quickWins": [
    { "action": "Hızlı Kazanım Eylemi", "effort": "Düşük", "impact": "Yüksek", "timeframe": "1-3 gün" }
  ],
  "aiRecommendations": [
    { "category": "Görsel İyileştirme", "title": "AI Product Photography", "detail": "Açıklama ve nasıl yapılacağı", "tools": ["Midjourney", "Adobe Firefly"] }
  ]
}

Tüm analiz ve açıklamalar Türkçe olmalıdır. Somut, uygulanabilir ve profesyonel bir CRO danışmanı gibi detaylı ol.
JSON dışında hiçbir metin yazma.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: systemPrompt }] }],
          generationConfig: { responseMimeType: "application/json" },
        }),
      }
    );

    const data = await response.json();
    if (data.error) throw new Error(data.error.message);

    const resultText = data.candidates[0].content.parts[0].text;
    return NextResponse.json(JSON.parse(resultText));
  } catch (error: any) {
    console.error("Store Analysis API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

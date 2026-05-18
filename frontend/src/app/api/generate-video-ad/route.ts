import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { product, audience, goal, platform, style, videoUploaded, analysisContext } = await req.json();

    if (!product && !videoUploaded) {
      return NextResponse.json({ error: "Product description or video upload is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const systemPrompt = `
Sen profesyonel bir sosyal medya reklam video editörü ve kreatif direktörsün.
Kullanıcının verdiği girdileri analiz ederek, yüksek dönüşüm oranına (conversion rate) sahip 15 saniyelik dikey video (Instagram Reels / TikTok / YouTube Shorts) reklamı için tam bir AI video üretim ve kurgu reçetesi hazırlayacaksın.

1. Hedef Kitle Psikolojisi: Verilen kitleye en uygun duygusal tetikleyicileri (FOMO, Aidiyet, Başarı, Tasarruf vb.) belirle.
2. Hook (Kanca): İlk 3 saniyede izleyiciyi ekrana kilitleyecek, scroll durdurucu (scroll-stopper) görsel ve işitsel şok etkisi yarat.
3. Görsel Kalite (B-Roll): Hollywood seviyesinde veya en üst düzey UGC kalitesinde, renk paleti ve kamera açılarıyla detaylandırılmış sahne açıklamaları yaz.
4. Ses ve Müzik: Ses tonu (Voice-over) ve müzik temposu (BPM) tam bir uyum içinde, duygu geçişlerini desteklemeli.

Girdiler:
- Ürün/Marka Özeti: ${product || "Kullanıcının yüklediği video içeriği"}
- Hedef Kitle: ${audience || "Sosyal Medya Kullanıcıları"}
- Reklam Amacı: ${goal || "Dönüşüm / Satış odaklı"}
- Platform: ${platform || "TikTok & Instagram"}
- Kreatif Video Stili: ${style || "UGC / Doğal içerik"}

${analysisContext && Object.keys(analysisContext).length > 0 ? `
BUNA EK OLARAK, şu analiz verilerini de kullanarak stratejiyi güçlendir:
${JSON.stringify(analysisContext, null, 2)}

ÇIKTI KURALLARI:
- Rakiplerin zayıf yönlerini (varsa) ve ürün analizindeki zayıflıkları avantaja çevir.
- Hedef kitlenin demografisine göre dili ve hook'ları seç.
` : ''}

Bu verilere dayanarak, videoda kullanılacak yapay zeka seslendirme metnini (voice-over script), sahne sahne kurgu talimatlarını, müzik temposunu, otomatik oluşturulacak zaman damgalı altyazıları (subtitles), ilk 3 saniyede ekranın ortasında patlayacak "Hook" (kanca) yazısını tasarlamalısın. Ek olarak, ürettiğin reklam kreatifi ile ilgili "aiReasoning" (AI mantığı) adında bir açıklama yazmalısın.

Yanıtın JSON formatında olmalı ve tam olarak şu yapıyı içermelidir:
{
  "scenarioSummary": "Senaryonun kısa ve etkileyici özeti (Türkçe).",
  "aiReasoning": "Bu stratejiyi neden seçtiğine dair 2-3 cümlelik analitik pazarlama mantığı (Örn: Rakipler testimonial kullanıyor ama x açısını kaçırmış, kadın hedef kitle için y duygusu seçildi, vs.)",
  "voiceOverScript": "Yapay zekanın seslendireceği tam metin (15 saniyeye uygun, yaklaşık 30-40 kelime, Türkçe).",
  "musicTrack": "Önerilen müzik tarzı ve tempo (örn: TikTok Trend dynamic beat, 128 BPM).",
  "hookText": "İlk 3 saniyede ekranda belirecek çarpıcı ve büyük yazılacak Hook (Kanca) metni.",
  "subtitles": [
    { "text": "İlk altyazı (Örn: Bunu neden daha önce almadım?)", "start": 0.0, "end": 3.0 },
    { "text": "İkinci altyazı parçası (Problemi vurgula)", "start": 3.0, "end": 6.0 },
    { "text": "Üçüncü altyazı parçası (Çözüm ve ürün)", "start": 6.0, "end": 9.0 },
    { "text": "Dördüncü altyazı parçası (Fayda / Sonuç)", "start": 9.0, "end": 12.0 },
    { "text": "Eylem çağrısı ve CTA altyazı parçası", "start": 12.0, "end": 15.0 }
  ],
  "visualScenes": [
    { "sceneNumber": 1, "description": "Detaylı sahne yönetmenliği: Kamera açısı, aydınlatma (Örn: Neon arka plan), oyuncu aksiyonu. (0-3 saniye)", "start": 0.0, "end": 3.0 },
    { "sceneNumber": 2, "description": "Yakın çekim ürün detayı, dinamik geçiş, ışık yansıması. (3-6 saniye)", "start": 3.0, "end": 6.0 },
    { "sceneNumber": 3, "description": "Ürünün kullanım anındaki memnuniyet ifadesi, yavaş çekim (slow-mo). (6-9 saniye)", "start": 6.0, "end": 9.0 },
    { "sceneNumber": 4, "description": "Öncesi/Sonrası (Before/After) veya hızlı kesmelerle ürünün kalitesinin kanıtı. (9-12 saniye)", "start": 9.0, "end": 12.0 },
    { "sceneNumber": 5, "description": "Kapanış: Ekranda büyük harflerle indirim/fırsat yazısı, logomuz, harekete geçirici buton efekti. (12-15 saniye)", "start": 12.0, "end": 15.0 }
  ],
  "ctaText": "CTA butonunda yazacak metin (örn: ŞİMDİ AL & %20 İNDİRİMİ YAKALA)"
}

Yanıtında JSON dışında hiçbir metin olmamalıdır. JSON yapısı tam, geçerli ve parse edilebilir olmalıdır.
`;

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-flash-latest:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: systemPrompt,
                },
              ],
            },
          ],
          generationConfig: {
            responseMimeType: "application/json",
          },
        }),
      }
    );

    const data = await response.json();
    
    if (data.error) {
      throw new Error(data.error.message);
    }

    const resultText = data.candidates[0].content.parts[0].text;
    return NextResponse.json(JSON.parse(resultText));

  } catch (error: any) {
    console.error("Gemini Video API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

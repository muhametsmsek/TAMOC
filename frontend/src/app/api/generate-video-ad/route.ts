import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { product, audience, goal, platform, style, videoUploaded } = await req.json();

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

Girdiler:
- Ürün Açıklaması: ${product || "Kullanıcının yüklediği video içeriği"}
- Hedef Kitle: ${audience || "Sosyal Medya Kullanıcıları"}
- Reklam Amacı: ${goal || "Dönüşüm / Satış odaklı"}
- Platform: ${platform || "TikTok & Instagram"}
- Video Kurgu Stili: ${style || "UGC / Doğal içerik"}

Bu verilere dayanarak, videoda kullanılacak yapay zeka seslendirme metnini (voice-over script), sahne sahne kurgu talimatlarını, müzik temposunu, otomatik oluşturulacak zaman damgalı altyazıları (subtitles) ve ilk 3 saniyede ekranın ortasında patlayacak "Hook" (kanca) yazısını tasarlamalısın.

Yanıtın JSON formatında olmalı ve tam olarak şu yapıyı içermelidir:
{
  "scenarioSummary": "Senaryonun kısa ve etkileyici özeti (Türkçe).",
  "voiceOverScript": "Yapay zekanın seslendireceği tam metin (15 saniyeye uygun, yaklaşık 30-40 kelime, Türkçe).",
  "musicTrack": "Önerilen müzik tarzı ve tempo (örn: TikTok Trend dynamic beat, 128 BPM).",
  "hookText": "İlk 3 saniyede ekranda belirecek çarpıcı ve büyük yazılacak Hook (Kanca) metni.",
  "subtitles": [
    { "text": "İlk altyazı parçası (0-3 saniye arası)", "start": 0.0, "end": 3.0 },
    { "text": "İkinci altyazı parçası (3-6 saniye arası)", "start": 3.0, "end": 6.0 },
    { "text": "Üçüncü altyazı parçası (6-9 saniye arası)", "start": 6.0, "end": 9.0 },
    { "text": "Dördüncü altyazı parçası (9-12 saniye arası)", "start": 9.0, "end": 12.0 },
    { "text": "Eylem çağrısı ve CTA altyazı parçası (12-15 saniye arası)", "start": 12.0, "end": 15.0 }
  ],
  "visualScenes": [
    { "sceneNumber": 1, "description": "İlk 3 saniyede gösterilecek heyecan verici ve merak uyandırıcı ürün açılış karesi.", "duration": 3.0 },
    { "sceneNumber": 2, "description": "Ürünün en önemli problemini çözerken gösterilen kullanım detayı.", "duration": 3.0 },
    { "sceneNumber": 3, "description": "UGC tarzında bir kullanıcının veya modelin ürünü deneyimleyip mutlu olduğu an.", "duration": 3.0 },
    { "sceneNumber": 4, "description": "Ürünün kalitesini veya detaylarını gösteren yakın çekim makro geçiş efekti.", "duration": 3.0 },
    { "sceneNumber": 5, "description": "İndirim, kampanya veya call-to-action (CTA) metninin yer aldığı bitiş karesi.", "duration": 3.0 }
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

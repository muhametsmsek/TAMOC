import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { prompt, context } = await req.json();

    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "API Key not configured" }, { status: 500 });
    }

    const systemPrompt = `
Sen profesyonel bir dijital reklam stratejisti ve kreatif direktörsün. 
Kullanıcının verdiği kısa reklam fikrini analiz ederek, "profesyonel reklam ajansı kalitesinde" kapsamlı bir strateji raporu hazırlayacaksın.

Yanıtın şu bölümleri içermeli ve her biri detaylı olmalıdır:

1. **Görsel Tasarım & Konsept:** Hangi renk paletleri, ne tarz görseller ve nasıl bir atmosfer kullanılmalı?
2. **Video Stratejisi:** Videoların süresi, kurgu tarzı, UGC (Kullanıcı İçeriği) kullanımı, voice-over (yapay zeka vs gerçek ses) tercihleri.
3. **Tipografi & Yazı Stilleri:** Videolarda ve görsellerde hangi font tipleri ve yazı yerleşimleri dikkat çeker?
4. **Hook & CTA:** İlk 3 saniye (Hook) nasıl olmalı? Hangi eylem çağrıları (CTA) dönüşümü artırır?
5. **Platform Bazlı Formatlar:** Instagram Reels, TikTok, Story ve Facebook Ads için özel format ve içerik önerileri.
6. **Hedef Kitle & Dil:** Kitleye uygun tonlama ve reklam dili.
7. **Farklılaşma & Senaryo:** Rakiplerden nasıl ayrışılır? Örnek bir reklam senaryosu.

Yanıtın formatı JSON olmalı ve şu yapıda olmalı:
{
  "summary": "Kısa bir özet",
  "visuals": { "colors": "...", "concepts": "..." },
  "video": { "length": "...", "style": "...", "ugc": "...", "voice": "..." },
  "typography": "...",
  "hooks": ["Hook 1", "Hook 2"],
  "cta": ["CTA 1", "CTA 2"],
  "platforms": [ { "name": "...", "format": "...", "tip": "..." } ],
  "audience": "...",
  "differentiation": "...",
  "scenario": "..."
}

Kullanıcı Girdisi: "${prompt}"
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
    console.error("Gemini API Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

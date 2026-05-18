import { NextResponse } from 'next/server';
import { GoogleGenAI, Type, Schema } from '@google/genai';

// Initialize Gemini client using the key from env
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

const responseSchema: Schema = {
  type: Type.OBJECT,
  properties: {
    profileScore: { type: Type.INTEGER, description: "0-100 arası profil veya hesap skoru" },
    profileEvaluation: { type: Type.STRING, description: "Hesabın genel değerlendirmesi (1-2 cümle)" },
    contentStrategy: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "İçerik/reklam stratejisi için 3 net, uygulanabilir öneri"
    },
    engagementSuggestions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Etkileşim veya dönüşümleri artırmak için 3 net öneri"
    },
    bestPostingTimes: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          day: { type: Type.STRING, description: "Gün kısaltması (örn. Pzt, Çar)" },
          timeRange: { type: Type.STRING, description: "Saat aralığı veya en iyi saatler (örn. 19:00 - 21:00)" },
          isPeak: { type: Type.BOOLEAN, description: "Zirve/en etkili saat ise true, değilse false" }
        }
      }
    },
    aiContentIdeas: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING, description: "İçerik/Kampanya formatı (örn. Reels Fikri, A/B Test Fikri)" },
          idea: { type: Type.STRING, description: "Detaylı içerik veya test fikri açıklaması" }
        }
      }
    },
    targetAudienceAnalysis: {
      type: Type.OBJECT,
      properties: {
        demographics: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              ageGroup: { type: Type.STRING, description: "Yaş grubu (örn. 18-24 Yaş)" },
              percentage: { type: Type.INTEGER, description: "Yüzdelik dilim" }
            }
          }
        },
        tags: {
          type: Type.ARRAY,
          items: { type: Type.STRING },
          description: "Hedef kitleyi tanımlayan ilgi alanları veya etiketler (örn. Alışveriş Severler)"
        }
      }
    },
    scoreBreakdown: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          label: { type: Type.STRING, description: "Skor kategorisi (platforma göre değişir)" },
          score: { type: Type.INTEGER, description: "0-100 arası puan" }
        }
      }
    },
    risks: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Hesaptaki eksiklikler veya riskli durumlar"
    },
    priorityActions: {
      type: Type.ARRAY,
      items: { type: Type.STRING },
      description: "Bugün yapılması gereken acil 3 aksiyon"
    },
    weeklyContentCalendar: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          dayName: { type: Type.STRING, description: "Gün adı (örn. Pazartesi)" },
          contentIdea: { type: Type.STRING, description: "O gün için planlanan aksiyon/içerik" }
        }
      }
    },
    competitorInsights: {
      type: Type.OBJECT,
      properties: {
        averageEngagement: { type: Type.STRING, description: "Rakibin tahmini etkileşim veya dönüşüm oranı (örn. 3.2% veya 2.1% ROAS)" },
        yourEngagement: { type: Type.STRING, description: "Kullanıcının performansı ve kıyas (örn. Siz: 4.8% (Daha İyi))" },
        postingFrequency: { type: Type.STRING, description: "Rakibin sıklığı (örn. 5.4 / Hafta veya Günlük İzleme)" },
        yourFrequency: { type: Type.STRING, description: "Kullanıcının sıklığı ve tavsiye (örn. Siz: 3.0 (Artırmalısınız))" }
      }
    },
    adCopySuggestions: {
      type: Type.OBJECT,
      properties: {
        hook: { type: Type.STRING, description: "Post/Reklam için dikkat çekici giriş metni (Hook)" },
        caption: { type: Type.STRING, description: "Açıklama (caption) veya reklam gövde metni" },
        cta: { type: Type.STRING, description: "Harekete geçirici mesaj (CTA) (örn. Şimdi Satın Al)" }
      }
    }
  },
  required: [
    "profileScore", "profileEvaluation", "contentStrategy", "engagementSuggestions", "bestPostingTimes",
    "aiContentIdeas", "targetAudienceAnalysis", "scoreBreakdown", "risks", "priorityActions",
    "weeklyContentCalendar", "competitorInsights", "adCopySuggestions"
  ]
};

export async function POST(req: Request) {
  try {
    const { username, image, platform } = await req.json();

    const selectedPlatform = (platform || 'instagram').toLowerCase();

    if (!username && !image) {
      return NextResponse.json({ error: 'Kullanıcı adı/Sayfa adı veya bir ekran görüntüsü gereklidir.' }, { status: 400 });
    }

    let contents: any[] = [];
    let promptImageText = "";

    if (image) {
      let mimeType = 'image/png';
      let base64Data = '';

      if (image.startsWith('data:')) {
        const parts = image.split(';base64,');
        mimeType = parts[0].split(':')[1];
        base64Data = parts[1];
      } else {
        base64Data = image;
      }

      contents.push({
        inlineData: {
          data: base64Data,
          mimeType: mimeType
        }
      });
      
      promptImageText = `
        Sana bu ${selectedPlatform} hesabının/panosunun gerçek bir ekran görüntüsünü (screenshot) gönderdim.
        Görseli mecra dinamiklerine göre detaylıca incele:
        - Profil yerleşimi, başlık yazıları, logolar, sayısal veriler ve genel görsel düzeni kontrol et.
        - Analizini bu gerçek görsel gözlemlerine ve mecra dinamiklerine dayandır.
      `;
    }

    let platformSpecificPrompt = "";
    let platformName = "Instagram";
    
    if (selectedPlatform === "facebook") {
      platformName = "Facebook";
      platformSpecificPrompt = `
        Bu analiz bir Facebook Sayfası / Hesabı içindir.
        Lütfen şunlara dikkat et:
        - Topluluk katılımı, gönderi çeşitliliği (görsel, link paylaşımı, uzun metin postları), Facebook Gruplarının kullanımı ve kitle etkileşimini (yorumlaşma, paylaşım) analiz et.
        - Detaylı Skor Dağılımı (scoreBreakdown) için tam olarak şu 5 kategoriyi sun:
          1. "Sayfa Düzeni"
          2. "Paylaşım Çeşitliliği"
          3. "CTA Etkinliği"
          4. "Topluluk Katılımı"
          5. "Erişim Potansiyeli"
        - Yapay Zeka Metin Önerileri (adCopySuggestions) kısmında Facebook kullanıcılarının tıklama ve paylaşma eğilimine uygun samimi ve bilgilendirici metinler üret.
        - Haftalık içerik takviminde Facebook sayfa algoritmasına uygun (günde 1 veya 2 günde 1 kaliteli paylaşım) planlama yap.
      `;
    } else if (selectedPlatform === "tiktok") {
      platformName = "TikTok";
      platformSpecificPrompt = `
        Bu analiz bir TikTok Hesabı içindir.
        Lütfen şunlara dikkat et:
        - Kısa dikey videolar (short videos), viral kancalar (hooks), trend sesler/müzikler, video tutma oranı (retention) ve TikTok SEO'su odaklı analizler yap.
        - Detaylı Skor Dağılımı (scoreBreakdown) için tam olarak şu 5 kategoriyi sun:
          1. "Profil Estetiği"
          2. "Kanca (Hook) Başarısı"
          3. "CTA Etkinliği"
          4. "Trend Uyumu"
          5. "Viral Potansiyeli"
        - Yapay Zeka Metin Önerileri (adCopySuggestions) kısmında TikTok'un hızlı tüketilen video başlıklarına (caption) ve dikkat çeken ilk 3 saniye kancalarına (hook) odaklan.
        - Haftalık içerik takviminde TikTok'un yüksek paylaşım sıklığı beklentisine uygun (günlük dikey video fikirleri) planlama yap.
      `;
    } else if (selectedPlatform === "meta_business") {
      platformName = "Meta Business (Ad Account)";
      platformSpecificPrompt = `
        Bu analiz bir Meta Business Suite / Reklam Hesabı yönetimi içindir.
        Lütfen şunlara dikkat et:
        - Reklam performansı, kreatif kalitesi, ROAS (reklam harcaması getirisi) optimizasyonu, hedef kitle segmentasyonu ve Meta piksel kurulumu/dönüşümler analizi odaklı stratejiler sun.
        - Detaylı Skor Dağılımı (scoreBreakdown) için tam olarak şu 5 kategoriyi sun:
          1. "Hesap Kurulumu"
          2. "Reklam Metinleri"
          3. "Hedef Kitle Seçimi"
          4. "Kreatif Kalitesi"
          5. "Dönüşüm Potansiyeli"
        - Yapay Zeka Metin Önerileri (adCopySuggestions) kısmında doğrudan Facebook/Instagram reklam kampanyalarında yüksek dönüşüm getirecek reklam kreatif kancaları ve açıklamaları üret.
        - Haftalık içerik takviminde organik paylaşımlar yerine, "Kampanya / A-B Testi / Kreatif Yenileme" takvimi planı sun.
      `;
    } else {
      // Default: instagram
      platformName = "Instagram";
      platformSpecificPrompt = `
        Bu analiz bir Instagram Hesabı içindir.
        Lütfen şunlara dikkat et:
        - Reels videoları, görsel ızgara (visual grid) tutarlılığı, kaydırmalı (carousel) postlar, hikaye etkileşim çıkartmaları odaklı analiz yap.
        - Detaylı Skor Dağılımı (scoreBreakdown) için tam olarak şu 5 kategoriyi sun:
          1. "Biyografi (Bio)"
          2. "Reels Hook Başarısı"
          3. "CTA Etkinliği"
          4. "Görsel Tutarlılık"
          5. "Etkileşim Potansiyeli"
        - Haftalık içerik takviminde Instagram algoritmasına uygun (Reels ve Carousel karışık) planlama yap.
      `;
    }

    const usernameContext = username ? `@${username}` : "Bu e-ticaret/marka hesabı";

    const prompt = `
      Sen uzman bir sosyal medya pazarlama stratejistisin (Expert Social Media Marketer).
      Bana ${usernameContext} için profesyonel, veri odaklı ve detaylı bir büyüme analizi çıkar.
      Çıktı KESİNLİKLE Türkçe olmalıdır.
      
      ${platformSpecificPrompt}
      ${promptImageText}
      
      Eğer bir görsel varsa, analizlerin tamamen bu görseldeki gözlemlere uymalıdır (örneğin görseldeki tasarım renkleri, biyografi eksiklikleri vb.).
      Eğer görsel yoksa, kullanıcı adına/sektöre dayanarak seçilen platformun (${platformName}) dinamiklerine son derece uygun ve uygulanabilir stratejiler üret.
      
      Veriler tamamen JSON formatında ve belirttiğim şemaya %100 uygun olmalıdır.
    `;

    contents.push(prompt);

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: contents,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      }
    });

    const text = response.text;
    if (!text) {
      throw new Error("Empty response from Gemini");
    }

    const data = JSON.parse(text);
    return NextResponse.json(data);
  } catch (error) {
    console.error("Gemini API Error:", error);
    return NextResponse.json(
      { error: 'Yapay zeka analiz işlemi sırasında bir hata oluştu. Lütfen tekrar deneyin.' },
      { status: 500 }
    );
  }
}

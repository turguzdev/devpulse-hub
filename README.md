# ⚡ DevPulse Hub - Modern Full-Stack Workspace & API Platform

Next.js App Router, TypeScript ve Tailwind CSS ile geliştirilmiş modern ve tam kapsamlı geliştirici proje yönetim platformu.

## 🌟 Temel Özellikler
- 🎨 **Modern & Slick Dark UI**: Glassmorphism efektleri, neon vurgular ve Tailwind CSS v4 ile donatılmış şık arayüz.
- 📊 **Metrikler ve Özet Panosu (Hero Stats)**: Proje istatistikleri, aktif geliştirme oranları, kategori ve öncelik dağılımı.
- 🔍 **Akıllı Filtreleme ve Arama**: Kategori, durum (Planning, In Progress, In Review, Completed), öncelik ve metin araması.
- ⚡ **Etkileşimli CRUD İşlemleri**: Proje oluşturma, düzenleme, aşama güncelleme, silme ve yıldız verme modalleri.
- 🚀 **Next.js App Router REST API**: /api/projects, /api/stats, /api/health, /api/feedback uç noktaları.
- 🧪 **Canlı API Playground**: Tarayıcı üzerinden doğrudan REST API endpointlerini tetikleme ve canlı JSON yanıtlarını inceleme.
- 💬 **Geri Bildirim & İletişim Havuzu**: Gerçek zamanlı geri bildirim gönderme ve listeleme.

## 🔌 Backend API Endpoints
- GET /api/projects - Projeleri listeler (search, category, status, sort destekler)
- POST /api/projects - Yeni proje oluşturur
- GET /api/projects/:id - Tekil proje detayını getirir
- PATCH /api/projects/:id - Projeyi günceller
- DELETE /api/projects/:id - Projeyi siler
- GET /api/stats - Telemetri ve analitik verilerini döndürür
- GET /api/health - Sunucu sağlık durumunu ve uptime bilgisini verir
- GET /api/feedback - Geri bildirimleri listeler
- POST /api/feedback - Yeni geri bildirim kaydeder

## 🚀 Hızlı Kurulum
`ash
# 1. Bağımlılıkları yükleyin
npm install

# 2. Geliştirici sunucusunu başlatın
npm run dev

# 3. Üretim için derleyin
npm run build
npm run start
`",
    ",
    
- Next.js 15 (App Router)
- React 19 & TypeScript
- Tailwind CSS v4
- Lucide Icons

## 📄 Lisans
MIT

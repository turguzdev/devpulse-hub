# ⚡ DevPulse Hub - Modern Full-Stack Workspace & API Platform

<div align="center">

![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS_v4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![REST API](https://img.shields.io/badge/REST_API-App_Router-06b6d4?style=for-the-badge)
![License](https://img.shields.io/badge/License-MIT-emerald?style=for-the-badge)

**Next.js App Router, TypeScript ve Tailwind CSS ile geliştirilmiş modern, etkileşimli ve tam kapsamlı geliştirici proje yönetim platformu.**

</div>

---

## 🌟 Proje Hakkında

**DevPulse Hub**, geliştiricilerin ve yazılım ekiplerinin projelerini, mikro servislerini, AI modellerini ve Web3 uygulamalarını tek bir merkezi gösterge panelinde takip etmelerini sağlayan tam kapsamlı (Frontend + Backend) bir Next.js platformudur.

Platform; gerçek zamanlı REST API rotaları, interaktif API test konsolu (Playground), sistem telemetrisi, dinamik filtreleme ve modern karanlık tema (Dark Theme) arayüzü sunar.

---

## ✨ Temel Özellikler

### 🖥️ Frontend & Kullanıcı Deneyimi
- 🎨 **Modern & Slick Dark UI**: Glassmorphism efektleri, neon parıltılar ve Tailwind CSS v4 ile şık arayüz.
- 📊 **Metrikler ve Özet Panosu (Hero Stats)**: Toplam proje, geliştirme süreci, başarı oranı ve topluluk yıldızları.
- 🔍 **Akıllı Filtreleme ve Arama**: Kategoriye, duruma (Planning, In Progress, In Review, Completed), önceliğe ve metin aramasına göre dinamik listeleme.
- 🎛️ **Görünüm Seçenekleri**: Grid ve Liste görünümleri arasında anlık geçiş.
- ⚡ **Etkileşimli CRUD İşlemleri**: Proje ekleme, düzenleme, aşama güncelleme, silme ve yıldız verme modalleri.
- 🔔 **Canlı Bildirimler (Toasts)**: Kullanıcı aksiyonlarında anlık geri bildirim bildirimleri.

### ⚙️ Backend & API Mimarisi
- 🚀 **Next.js App Router API Routes**: RESTful mimaride uç noktalar.
- 🗄️ **Dahili Veri Yönetimi**: Kategori, durum, öncelik ve arama parametrelerine göre filtrelenebilir bellek içi veri deposu.
- 📈 **Telemetri & Analitik Endpointi (`/api/stats`)**: Kategori bazlı oranlar, öncelik matrisi ve son aktivite akışı.
- 🩺 **Sağlık & Gecikme Takibi (`/api/health`)**: Sunucu çalışma süresi (uptime), ortam bilgisi ve milisaniye bazlı ping gecikmesi ölçümü.
- 💬 **Geri Bildirim & İletişim Havuzu (`/api/feedback`)**: Kullanıcı önerileri ve puanlama sistemi.

### 🧪 Canlı API Playground
- Tarayıcı üzerinden doğrudan internal REST API endpointlerini tetikleme (`GET`, `POST`, `PATCH`, `DELETE`).
- JSON payload düzenleme, HTTP durum kodları, yanıt süreleri (ms) ve tek tıkla JSON kopyalama.

---

## 🔌 Backend API Endpoints

| Metot | Uç Nokta (Endpoint) | Açıklama |
|---|---|---|
| `GET` | `/api/projects` | Tüm projeleri listeler (Desteklenen query parametreleri: `category`, `status`, `search`, `sort`) |
| `POST` | `/api/projects` | Yeni bir proje kaydı oluşturur |
| `GET` | `/api/projects/:id` | Belirtilen ID'ye sahip proje detayını getirir |
| `PATCH` | `/api/projects/:id` | Proje bilgilerini veya aşamasını günceller |
| `DELETE` | `/api/projects/:id` | Projeyi siler |
| `GET` | `/api/stats` | Kategori dağılımlarını, öncelik matrisini ve telemetri verilerini döndürür |
| `GET` | `/api/health` | Sunucu sağlık durumunu ve çalışma süresini raporlar |
| `GET` | `/api/feedback` | Gönderilen kullanıcı mesajlarını listeler |
| `POST` | `/api/feedback` | Yeni geri bildirim veya hata bildirimi kaydeder |

---

## 🚀 Hızlı Kurulum

Projeyi yerel makinenizde çalıştırmak için:

### 1. Depoyu Klonlayın
```bash
git clone https://github.com/Yagzk/devpulse-hub.git
cd devpulse-hub
```

### 2. Bağımlılıkları Yükleyin
```bash
npm install
```

### 3. Geliştirici Sunucusunu Başlatın
```bash
npm run dev
```

Tarayıcınızda [http://localhost:3000](http://localhost:3000) adresine giderek uygulamayı görüntüleyebilirsiniz.

### 4. Üretim İçin Derleyin (Production Build)
```bash
npm run build
npm run start
```

---

## 🛠️ Kullanılan Teknolojiler

- **Framework**: [Next.js 15 (App Router)](https://nextjs.org/)
- **Dil**: [TypeScript](https://www.typescriptlang.org/)
- **Stil & Arayüz**: [Tailwind CSS v4](https://tailwindcss.com/)
- **İkonlar**: [Lucide React](https://lucide.dev/)
- **Sunucu & API**: Node.js & Next.js Server Handlers

---

## 📄 Lisans

Bu proje [MIT](LICENSE) lisansı altında sunulmaktadır.
"use client";

import React, { useState, useEffect } from "react";
import { MessageSquareCode, Send, Star, Sparkles } from "lucide-react";
import { FeedbackItem } from "@/lib/types";
import { formatDate } from "@/lib/utils";

export function FeedbackHub() {
  const [feedbacks, setFeedbacks] = useState<FeedbackItem[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<"Feedback" | "Bug Report" | "Feature Request" | "General">("Feedback");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ text: string; type: "success" | "error" } | null>(null);

  const fetchFeedbacks = async () => {
    try {
      const res = await fetch("/api/feedback");
      const data = await res.json();
      if (data.success) {
        setFeedbacks(data.data);
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      setStatusMessage({ text: "Lütfen tüm zorunlu alanları doldurun.", type: "error" });
      return;
    }

    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, type, rating, message })
      });

      const data = await res.json();
      if (data.success) {
        setStatusMessage({ text: "Geri bildiriminiz için teşekkürler! Başarıyla iletildi.", type: "success" });
        setName("");
        setEmail("");
        setMessage("");
        setRating(5);
        fetchFeedbacks();
      } else {
        setStatusMessage({ text: data.error || "Gönderim başarısız oldu.", type: "error" });
      }
    } catch {
      setStatusMessage({ text: "Sunucuyla bağlantı kurulamadı.", type: "error" });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold mb-1">
          <MessageSquareCode className="w-4 h-4" />
          <span>Topluluk & İletişim</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Geri Bildirim & İstekler</h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Projeler hakkında önerilerinizi, hata bildirimlerinizi veya iş birliği taleplerinizi doğrudan backend API'mize iletin.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Form */}
        <div className="lg:col-span-5 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
            <Send className="w-4 h-4 text-cyan-400" />
            <span>Mesaj Gönder</span>
          </h3>
          <p className="text-xs text-zinc-400 mb-5">
            Form /api/feedback REST endpointine POST isteği gönderir.
          </p>

          {statusMessage && (
            <div className={`p-3 rounded-xl mb-4 text-xs font-medium ${
              statusMessage.type === "success" 
                ? "bg-emerald-500/15 border border-emerald-500/30 text-emerald-400" 
                : "bg-rose-500/15 border border-rose-500/30 text-rose-400"
            }`}>
              {statusMessage.text}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Adınız Soyadınız *</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Yağız Kaan"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">E-posta Adresi *</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="yagiz@example.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Mesaj Türü</label>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value as any)}
                  className="w-full px-3 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Feedback">Geri Bildirim</option>
                  <option value="Feature Request">Özellik İsteği</option>
                  <option value="Bug Report">Hata Bildirimi</option>
                  <option value="General">Genel / İş Birliği</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Puanlama</label>
                <div className="flex items-center gap-1 py-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 transition hover:scale-110"
                    >
                      <Star className={`w-4 h-4 ${star <= rating ? "fill-amber-400" : "text-zinc-600"}`} />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Mesajınız *</label>
              <textarea
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Fikirlerinizi ve önerilerinizi buraya yazabilirsiniz..."
                className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-zinc-800 text-white text-sm focus:outline-none focus:border-cyan-500"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white font-semibold shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
            >
              {isSubmitting ? "İletiliyor..." : "Mesajı İlet"}
            </button>
          </form>
        </div>

        {/* Live List */}
        <div className="lg:col-span-7 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <span>Gelen Mesajlar & İncelemeler</span>
            </h3>
            <span className="text-xs text-zinc-500 font-mono">{feedbacks.length} mesaj</span>
          </div>

          <div className="space-y-3 max-h-[480px] overflow-y-auto pr-1">
            {feedbacks.map((fb) => (
              <div
                key={fb.id}
                className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800/80 text-xs space-y-2"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 flex items-center justify-center text-white font-bold text-[11px]">
                      {fb.name.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <span className="font-bold text-white block">{fb.name}</span>
                      <span className="text-[10px] text-zinc-500">{fb.email}</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-zinc-800 text-zinc-300">
                      {fb.type}
                    </span>
                    <div className="flex items-center text-amber-400">
                      {[...Array(fb.rating)].map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-amber-400" />
                      ))}
                    </div>
                  </div>
                </div>

                <p className="text-zinc-300 leading-relaxed bg-zinc-900/40 p-2.5 rounded-xl border border-zinc-800/50">
                  {fb.message}
                </p>

                <div className="text-[10px] text-zinc-500 text-right">
                  {formatDate(fb.createdAt)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
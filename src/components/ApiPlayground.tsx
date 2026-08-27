"use client";

import React, { useState } from "react";
import { Terminal, Copy, Check, Play, Clock } from "lucide-react";

interface ApiEndpoint {
  method: "GET" | "POST" | "PATCH" | "DELETE";
  path: string;
  description: string;
  defaultBody?: string;
}

const ENDPOINTS: ApiEndpoint[] = [
  {
    method: "GET",
    path: "/api/projects",
    description: "Tüm projeleri listeler (search, category, status filtrelerini destekler)."
  },
  {
    method: "POST",
    path: "/api/projects",
    description: "Yeni bir proje kaydı oluşturur.",
    defaultBody: JSON.stringify({
      title: "HyperScale - Edge Caching Gateway",
      description: "Distributed edge KV cache ve GraphQL federation çözümü.",
      category: "Cloud & DevOps",
      status: "Planning",
      priority: "High",
      progress: 30,
      tags: ["Go", "Cloudflare", "Next.js"],
      lead: "DevOps Team",
      dueDate: "2026-11-20"
    }, null, 2)
  },
  {
    method: "GET",
    path: "/api/stats",
    description: "Proje sayıları, kategori dağılımı ve aktiviteleri içeren telemetri verilerini döndürür."
  },
  {
    method: "GET",
    path: "/api/health",
    description: "Sunucu çalışma süresi (uptime) ve sistem sağlık durumunu verir."
  },
  {
    method: "GET",
    path: "/api/feedback",
    description: "Gönderilen geri bildirim ve mesajları listeler."
  },
  {
    method: "POST",
    path: "/api/feedback",
    description: "Kullanıcı geri bildirimi veya destek talebi kaydeder.",
    defaultBody: JSON.stringify({
      name: "Kullanıcı Adı",
      email: "ornek@domain.com",
      type: "Feedback",
      message: "API yanıt süreleri oldukça hızlı!",
      rating: 5
    }, null, 2)
  }
];

export function ApiPlayground() {
  const [selectedEndpoint, setSelectedEndpoint] = useState<ApiEndpoint>(ENDPOINTS[0]);
  const [customPath, setCustomPath] = useState(ENDPOINTS[0].path);
  const [requestBody, setRequestBody] = useState("");
  const [responseStatus, setResponseStatus] = useState<number | null>(null);
  const [responseBody, setResponseBody] = useState<string | null>(null);
  const [responseTime, setResponseTime] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleSelectEndpoint = (ep: ApiEndpoint) => {
    setSelectedEndpoint(ep);
    setCustomPath(ep.path);
    setRequestBody(ep.defaultBody || "");
    setResponseBody(null);
    setResponseStatus(null);
    setResponseTime(null);
  };

  const handleExecute = async () => {
    setIsLoading(true);
    setResponseBody(null);
    const start = performance.now();

    try {
      const options: RequestInit = {
        method: selectedEndpoint.method,
        headers: {
          "Content-Type": "application/json"
        }
      };

      if (["POST", "PATCH", "PUT"].includes(selectedEndpoint.method) && requestBody) {
        options.body = requestBody;
      }

      const res = await fetch(customPath, options);
      const elapsed = Math.round(performance.now() - start);
      setResponseTime(elapsed);
      setResponseStatus(res.status);

      const data = await res.json();
      setResponseBody(JSON.stringify(data, null, 2));
    } catch (err: any) {
      const elapsed = Math.round(performance.now() - start);
      setResponseTime(elapsed);
      setResponseStatus(500);
      setResponseBody(JSON.stringify({ error: err.message || "İstek sırasında bağlantı hatası oluştu" }, null, 2));
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (responseBody) {
      navigator.clipboard.writeText(responseBody);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const getMethodBadge = (m: string) => {
    switch (m) {
      case "GET":
        return "bg-emerald-500/15 text-emerald-400 border-emerald-500/30";
      case "POST":
        return "bg-blue-500/15 text-blue-400 border-blue-500/30";
      case "PATCH":
        return "bg-amber-500/15 text-amber-400 border-amber-500/30";
      case "DELETE":
        return "bg-rose-500/15 text-rose-400 border-rose-500/30";
      default:
        return "bg-zinc-800 text-zinc-300";
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800">
        <div className="flex items-center gap-2 text-xs text-cyan-400 font-semibold mb-1">
          <Terminal className="w-4 h-4" />
          <span>Etkileşimli REST API Test Konsolu</span>
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-white">Canlı API Playground</h2>
        <p className="text-zinc-400 text-xs sm:text-sm mt-1">
          Next.js App Router API endpointlerini tarayıcı üzerinden anında tetikleyin, yanıt sürelerini ve JSON çıktılarını canlı olarak inceleyin.
        </p>
      </div>

      {/* Grid: Endpoints + Request/Response */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left: Endpoint List */}
        <div className="lg:col-span-4 p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <h3 className="text-xs font-bold text-zinc-400 uppercase tracking-wider mb-3">Mevcut Endpointler</h3>
          <div className="space-y-2">
            {ENDPOINTS.map((ep, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectEndpoint(ep)}
                className={`w-full text-left p-3 rounded-2xl border transition ${
                  selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method
                    ? "bg-zinc-800 border-cyan-500/50 shadow-md"
                    : "bg-zinc-950/60 border-zinc-800/80 hover:bg-zinc-900 hover:border-zinc-700"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold border ${getMethodBadge(ep.method)}`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-white font-medium">{ep.path}</span>
                </div>
                <p className="text-[11px] text-zinc-400 line-clamp-2">{ep.description}</p>
              </button>
            ))}
          </div>
        </div>

        {/* Right: Request & Live Response Tester */}
        <div className="lg:col-span-8 space-y-4">
          {/* Request Bar */}
          <div className="p-4 sm:p-5 rounded-3xl bg-zinc-900/60 border border-zinc-800 space-y-4">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
              <span className={`flex items-center justify-center px-3 py-2 rounded-xl text-xs font-mono font-bold border ${getMethodBadge(selectedEndpoint.method)}`}>
                {selectedEndpoint.method}
              </span>
              <input
                type="text"
                value={customPath}
                onChange={(e) => setCustomPath(e.target.value)}
                className="flex-1 px-3.5 py-2 rounded-xl bg-zinc-950 border border-zinc-800 text-white font-mono text-xs focus:outline-none focus:border-cyan-500"
              />
              <button
                onClick={handleExecute}
                disabled={isLoading}
                className="flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white text-xs font-bold shadow-lg shadow-cyan-500/20 transition active:scale-95 disabled:opacity-50"
              >
                <Play className={`w-3.5 h-3.5 fill-white ${isLoading ? "animate-pulse" : ""}`} />
                <span>{isLoading ? "Gönderiliyor..." : "İsteği Gönder"}</span>
              </button>
            </div>

            {/* Request Body Editor (if POST/PATCH) */}
            {["POST", "PATCH", "PUT"].includes(selectedEndpoint.method) && (
              <div>
                <label className="block text-xs font-medium text-zinc-400 mb-1.5">JSON İstek Gövdesi (Payload):</label>
                <textarea
                  rows={6}
                  value={requestBody}
                  onChange={(e) => setRequestBody(e.target.value)}
                  className="w-full p-3 rounded-xl bg-zinc-950 border border-zinc-800 text-emerald-400 font-mono text-xs focus:outline-none focus:border-cyan-500 scrollbar-thin"
                />
              </div>
            )}
          </div>

          {/* Response Window */}
          <div className="p-5 rounded-3xl bg-zinc-950 border border-zinc-800">
            <div className="flex items-center justify-between pb-3 border-b border-zinc-800/80 mb-3">
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-zinc-300">HTTP Yanıtı</span>
                {responseStatus && (
                  <span className={`px-2 py-0.5 rounded text-[11px] font-mono font-bold ${
                    responseStatus < 300 ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30" : "bg-rose-500/20 text-rose-400 border border-rose-500/30"
                  }`}>
                    {responseStatus} {responseStatus === 200 ? "OK" : responseStatus === 201 ? "Created" : "Response"}
                  </span>
                )}
                {responseTime !== null && (
                  <span className="text-[11px] text-zinc-400 font-mono flex items-center gap-1">
                    <Clock className="w-3 h-3 text-zinc-500" />
                    {responseTime} ms
                  </span>
                )}
              </div>

              {responseBody && (
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 text-xs transition"
                >
                  {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? "Kopyalandı!" : "Kopyala"}</span>
                </button>
              )}
            </div>

            {responseBody ? (
              <pre className="max-h-96 overflow-y-auto p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 text-xs font-mono text-cyan-300 leading-relaxed scrollbar-thin">
                {responseBody}
              </pre>
            ) : (
              <div className="py-16 text-center text-zinc-600 text-xs">
                Bir endpoint seçin ve sonucu görmek için <strong className="text-zinc-400">"İsteği Gönder"</strong> butonuna tıklayın.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
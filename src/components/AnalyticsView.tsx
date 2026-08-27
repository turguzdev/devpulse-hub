"use client";

import React, { useState, useEffect } from "react";
import { 
  BarChart3, 
  Cpu, 
  ShieldAlert, 
  Server,
  RefreshCw,
  Clock,
  Activity
} from "lucide-react";
import { StatsResponse } from "@/lib/types";
import { formatDate } from "@/lib/utils";

interface AnalyticsViewProps {
  stats: StatsResponse | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export function AnalyticsView({ stats, onRefresh, isLoading }: AnalyticsViewProps) {
  const [healthData, setHealthData] = useState<any>(null);
  const [pingLatency, setPingLatency] = useState<number | null>(null);

  const testPing = async () => {
    const start = performance.now();
    try {
      const res = await fetch("/api/health");
      const data = await res.json();
      const elapsed = Math.round(performance.now() - start);
      setHealthData(data);
      setPingLatency(elapsed);
    } catch {
      setHealthData({ status: "error" });
    }
  };

  useEffect(() => {
    testPing();
  }, []);

  const categories = stats ? Object.entries(stats.categoryBreakdown) : [];

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-zinc-900/70 border border-zinc-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-indigo-400 font-semibold mb-1">
            <BarChart3 className="w-4 h-4" />
            <span>Sistem İstatistikleri & Performans</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-white">Telemetri & Analiz Gösterge Paneli</h2>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Proje havuzunun dağılımı, öncelik yoğunluğu ve gerçek zamanlı sunucu durum analizleri.
          </p>
        </div>
        <button
          onClick={() => {
            onRefresh();
            testPing();
          }}
          disabled={isLoading}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition active:scale-95 disabled:opacity-50 self-start sm:self-auto"
        >
          <RefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin text-cyan-400" : ""}`} />
          <span>Yenile & Ping Testi</span>
        </button>
      </div>

      {/* Grid: 2 Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Cpu className="w-4 h-4 text-cyan-400" />
                <span>Kategori Dağılımı</span>
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Toplam {stats?.totalProjects || 0} Proje</span>
            </div>

            <div className="space-y-3.5">
              {categories.map(([category, count]) => {
                const total = stats?.totalProjects || 1;
                const percentage = Math.round((count / total) * 100);
                return (
                  <div key={category} className="space-y-1">
                    <div className="flex justify-between text-xs">
                      <span className="font-medium text-zinc-300">{category}</span>
                      <span className="text-zinc-400 font-mono">{count} adet (%{percentage})</span>
                    </div>
                    <div className="w-full h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-cyan-500 to-blue-500 transition-all duration-700"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-zinc-800/80 text-[11px] text-zinc-500 flex justify-between">
            <span>En yoğun odak: <strong className="text-zinc-300">Full-Stack & AI</strong></span>
            <span>REST API canlı senkron</span>
          </div>
        </div>

        {/* Priority Matrix & Status Split */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Öncelik & Durum Dağılımı</span>
              </h3>
              <span className="text-xs text-zinc-500 font-mono">Kritiklik Seviyeleri</span>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs text-rose-400 font-semibold block mb-1">Kritik / Acil</span>
                <span className="text-2xl font-black text-white">{stats?.priorityBreakdown?.Critical || 0}</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Anlık müdahale</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs text-orange-400 font-semibold block mb-1">Yüksek Öncelik</span>
                <span className="text-2xl font-black text-white">{stats?.priorityBreakdown?.High || 0}</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Öncelikli geliştirme</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs text-amber-400 font-semibold block mb-1">Orta Öncelik</span>
                <span className="text-2xl font-black text-white">{stats?.priorityBreakdown?.Medium || 0}</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Normal akış</span>
              </div>
              <div className="p-3 rounded-2xl bg-zinc-950 border border-zinc-800">
                <span className="text-xs text-emerald-400 font-semibold block mb-1">Düşük Öncelik</span>
                <span className="text-2xl font-black text-white">{stats?.priorityBreakdown?.Low || 0}</span>
                <span className="text-[10px] text-zinc-500 block mt-0.5">Boş zaman</span>
              </div>
            </div>

            {/* Workflow Progress summary */}
            <div className="p-3.5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-300 font-medium">Genel Havuz Tamamlanma Oranı</span>
                <span className="font-mono text-emerald-400 font-bold">%{stats?.averageProgress || 0}</span>
              </div>
              <div className="w-full h-2.5 bg-zinc-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-700"
                  style={{ width: `${stats?.averageProgress || 0}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-zinc-800/80 text-[11px] text-zinc-500">
            Otomatik hesaplanan ağırlıklı ortalama
          </div>
        </div>
      </div>

      {/* Row 2: Server Health & Activity Stream */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Server & API Health status */}
        <div className="p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Server className="w-4 h-4 text-emerald-400" />
              <h3 className="text-base font-bold text-white">Backend Sunucu Durumu</h3>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">API Durumu</span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-bold font-mono">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  {healthData?.status === "healthy" ? "HEALTHY (200)" : "ONLINE"}
                </span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Ping Gecikmesi</span>
                <span className="text-cyan-400 font-bold font-mono">{pingLatency !== null ? `${pingLatency} ms` : "Hesaplanıyor..."}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Sunucu Uptime</span>
                <span className="text-white font-mono">{healthData?.uptime || "Aktif"}</span>
              </div>

              <div className="flex items-center justify-between p-3 rounded-xl bg-zinc-950 border border-zinc-800">
                <span className="text-zinc-400">Platform Mimarisi</span>
                <span className="text-indigo-400 font-mono font-semibold">Next.js App Router</span>
              </div>
            </div>
          </div>

          <button
            onClick={testPing}
            className="w-full mt-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition"
          >
            Yeniden Ping Gönder
          </button>
        </div>

        {/* Live Activity Stream */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-zinc-900/60 border border-zinc-800">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-indigo-400" />
              <span>Canlı Aktivite & Olay Günlüğü</span>
            </h3>
            <span className="text-xs text-zinc-500 font-mono">Gerçek Zamanlı Loglar</span>
          </div>

          <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
            {stats?.recentActivities && stats.recentActivities.length > 0 ? (
              stats.recentActivities.map((act) => (
                <div
                  key={act.id}
                  className="flex items-start gap-3 p-3 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 text-xs"
                >
                  <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400 mt-0.5">
                    <Clock className="w-3.5 h-3.5" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white">
                        {act.projectTitle || "Sistem İşlemi"}
                      </span>
                      <span className="text-[10px] text-zinc-500 font-mono">
                        {formatDate(act.timestamp)}
                      </span>
                    </div>
                    <p className="text-zinc-400 text-[11px] mt-0.5">{act.details}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-zinc-500 text-xs">
                Henüz kayıtlı aktivite bulunmuyor.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
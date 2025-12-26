"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language.store";
import { useMarketOverlapStore } from "@/store/marketOverlapStore";
import { markets } from "@/data/markets";
import { texts } from "@/data/texts";

const MarketOverlap = () => {
  const [mounted, setMounted] = useState(false);
  const [userCity, setUserCity] = useState("");
  const { language } = useLanguageStore();
  const isRTL = language === "fa";
  const t = texts.marketOverlap[language];

  const stockMarkets = markets.filter((m) => m.type === "stock");
  const { selectedMarkets, toggleMarket, selectAll, selectNone } =
    useMarketOverlapStore();

  useEffect(() => {
    setMounted(true);
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setUserCity(timeZone.split("/").pop()?.replace("_", " ") || "Local");
  }, []);

  /**
   * Calculates overlaps based on User's Local Time
   */
  const calculateOverlaps = () => {
    if (selectedMarkets.length < 2) return [];
    const overlaps = [];
    const userOffset = -new Date().getTimezoneOffset() / 60;

    for (let hour = 0; hour < 24; hour++) {
      const activeMarkets = stockMarkets.filter((market) => {
        if (!selectedMarkets.includes(market.id)) return false;

        const [openH] = market.openTime.split(":").map(Number);
        const [closeH] = market.closeTime.split(":").map(Number);

        // Convert market hours to user local hours
        const marketToUser = (h: number) =>
          (h - market.utcOffset + userOffset + 24) % 24;
        const userOpen = marketToUser(openH);
        const userClose = marketToUser(closeH);

        return userClose > userOpen
          ? hour >= userOpen && hour < userClose
          : hour >= userOpen || hour < userClose;
      });

      if (activeMarkets.length >= 2) {
        overlaps.push({ hour, markets: activeMarkets });
      }
    }
    return overlaps;
  };

  if (!mounted) return null;
  const overlaps = calculateOverlaps();

  return (
    <div
      className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 font-fa"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 mb-2">{t.title}</h2>
        <p className="text-slate-400 font-medium">{t.subtitle}</p>
      </div>

      {/* Selection Grid */}
      <div className="mb-12 bg-slate-50/50 p-6 rounded-2xl border border-slate-100">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6">
          <h3 className="text-lg font-black text-slate-700">
            {t.selectMarkets}{" "}
            <span className="text-blue-600 tabular-nums">
              ({selectedMarkets.length})
            </span>
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => selectAll(stockMarkets.map((m) => m.id))}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-blue-50 hover:text-blue-600 transition-colors"
            >
              {t.all}
            </button>
            <button
              onClick={selectNone}
              className="px-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold hover:bg-rose-50 hover:text-rose-600 transition-colors"
            >
              {t.none}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {stockMarkets.map((market) => {
            const isSelected = selectedMarkets.includes(market.id);
            return (
              <div
                key={market.id}
                onClick={() => toggleMarket(market.id)}
                className={`flex items-center gap-3 p-3 rounded-xl border-2 cursor-pointer transition-all duration-300
                  ${
                    isSelected
                      ? "bg-white shadow-md"
                      : "bg-transparent border-transparent opacity-60 hover:opacity-100"
                  }`}
                style={{
                  borderColor: isSelected ? market.color : "transparent",
                }}
              >
                <div
                  className={`w-5 h-5 rounded-md flex items-center justify-center transition-colors`}
                  style={{
                    backgroundColor: isSelected ? market.color : "#e2e8f0",
                  }}
                >
                  {isSelected && (
                    <span className="text-white text-[10px]">✓</span>
                  )}
                </div>
                <div className="flex-1">
                  <div className="text-sm font-black text-slate-800">
                    {market.city[language]}
                  </div>
                  <div className="text-[10px] font-bold text-slate-400 tabular-nums">
                    {market.openTime}-{market.closeTime}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Overlap Results */}
      <div>
        <div className="flex items-center gap-3 mb-6">
          <div className="w-2 h-6 bg-blue-600 rounded-full" />
          <h3 className="text-lg font-black text-slate-800">
            {t.overlapHours}{" "}
            <span className="tabular-nums text-blue-600">
              ({overlaps.length})
            </span>
          </h3>
          <div className="ms-auto text-[10px] font-black text-slate-400 bg-slate-100 px-3 py-1 rounded-lg uppercase tracking-widest">
            {isRTL ? `مبنا: ساعت ${userCity}` : `Based on ${userCity} Time`}
          </div>
        </div>

        {selectedMarkets.length < 2 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
            {t.selectAtLeast}
          </div>
        ) : overlaps.length === 0 ? (
          <div className="text-center py-16 bg-slate-50 rounded-2xl border-2 border-dashed border-slate-200 text-slate-400 font-bold">
            {t.noOverlap}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {overlaps.map(({ hour, markets: overlappingMarkets }) => (
              <div
                key={hour}
                className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-center mb-4 pb-3 border-bottom border-slate-50">
                  <div className="text-2xl font-black text-slate-800 tabular-nums">
                    {hour.toString().padStart(2, "0")}:00
                  </div>
                  <div className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-black uppercase">
                    {overlappingMarkets.length} {t.markets}
                  </div>
                </div>
                <div className="space-y-2">
                  {overlappingMarkets.map((m) => (
                    <div key={m.id} className="flex items-center gap-2">
                      <div
                        className="w-2 h-2 rounded-full"
                        style={{ backgroundColor: m.color }}
                      />
                      <span className="text-sm font-bold text-slate-600">
                        {m.city[language]}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketOverlap;

"use client";

import { useEffect, useState, useRef } from "react";
import { useLanguageStore } from "@/store/language.store";
import { useTimeStore } from "@/store/time.store";
import { useMarketTimelineStore } from "@/store/marketTimeline.store";
import { markets, Market } from "@/data/markets";
import { texts } from "@/data/texts";

const MarketTimeline = () => {
  const [mounted, setMounted] = useState(false);
  const [userCity, setUserCity] = useState("");
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguageStore();
  const isRTL = language === "fa";

  const { now, start } = useTimeStore();
  const { selectedHour, setSelectedHour } = useMarketTimelineStore();

  /**
   * Syncs time, detects user's timezone city, and handles initial scroll
   */
  useEffect(() => {
    setMounted(true);
    const cleanup = start();

    // Dynamically detect user's timezone city
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const detectedCity =
      timeZone.split("/").pop()?.replace("_", " ") || "Local";
    setUserCity(detectedCity);

    if (scrollContainerRef.current) {
      const currentHour = new Date().getHours();
      const itemWidth = 72;
      const scrollPos =
        currentHour * itemWidth -
        scrollContainerRef.current.offsetWidth / 2 +
        itemWidth / 2;
      scrollContainerRef.current.scrollTo({
        left: isRTL ? -scrollPos : scrollPos,
        behavior: "smooth",
      });
    }

    return () => cleanup();
  }, [start, isRTL]);

  if (!mounted || !now) return null;

  const t = texts.marketTimeline[language];

  /**
   * Checks if a market is open based on the user's specific local hour
   */
  const isMarketOpenAtUserHour = (market: Market, userHour: number) => {
    const userOffset = -new Date().getTimezoneOffset() / 60;
    const [openH, openM] = market.openTime.split(":").map(Number);
    const [closeH, closeM] = market.closeTime.split(":").map(Number);

    const getUserH = (h: number, m: number) => {
      const totalMins = h * 60 + m - market.utcOffset * 60 + userOffset * 60;
      return Math.floor(((totalMins + 1440) % 1440) / 60);
    };

    const marketOpenUserH = getUserH(openH, openM);
    const marketCloseUserH = getUserH(closeH, closeM);

    if (marketCloseUserH > marketOpenUserH) {
      return userHour >= marketOpenUserH && userHour < marketCloseUserH;
    }
    return userHour >= marketOpenUserH || userHour < marketCloseUserH;
  };

  /**
   * Converts a market's operation time to the user's local city time
   */
  const getUserTimeEquivalent = (
    marketTimeStr: string,
    marketUtcOffset: number
  ) => {
    const [hours, minutes] = marketTimeStr.split(":").map(Number);
    const userOffset = -new Date().getTimezoneOffset() / 60;
    const totalMinutes =
      (hours * 60 + minutes - marketUtcOffset * 60 + userOffset * 60 + 1440) %
      1440;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;

    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  const currentUserHour = now.getHours();
  const activeHour = selectedHour ?? currentUserHour;
  const activeMarkets = markets.filter((m) =>
    isMarketOpenAtUserHour(m, activeHour)
  );

  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mx-auto font-fa"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-3xl font-black text-slate-800 mb-2">{t.title}</h2>
        <p className="text-slate-400 font-medium">{t.selectHour}</p>
      </div>

      {/* Timeline */}
      <div className="relative mb-12">
        <div
          ref={scrollContainerRef}
          className="flex gap-4 overflow-x-auto pb-8 no-scrollbar px-4 justify-start sm:justify-center"
        >
          {Array.from({ length: 24 }).map((_, hour) => {
            const marketsAtHour = markets.filter((m) =>
              isMarketOpenAtUserHour(m, hour)
            );
            const isActive = marketsAtHour.length > 0;
            const isCurrent = hour === currentUserHour;
            const isSelected = hour === selectedHour;

            return (
              <div
                key={hour}
                onClick={() =>
                  setSelectedHour(hour === selectedHour ? null : hour)
                }
                className="flex flex-col items-center cursor-pointer transition-all duration-300 min-w-14"
              >
                <div
                  className={`text-[10px] font-black mb-2 uppercase tabular-nums ${
                    isCurrent ? "text-rose-500" : "text-slate-400"
                  }`}
                >
                  {isCurrent && (isRTL ? "اکنون" : "NOW")}
                </div>
                <div
                  className={`text-xs font-black mb-3 transition-all tabular-nums ${
                    isCurrent
                      ? "text-rose-500 scale-110"
                      : isSelected
                      ? "text-blue-600 scale-110"
                      : "text-slate-400"
                  }`}
                >
                  {hour.toString().padStart(2, "0")}:00
                </div>
                <div
                  className={`relative rounded-2xl w-14 h-28 transition-all duration-300 border-2 flex flex-col items-center justify-between py-3
                    ${
                      isActive
                        ? "bg-emerald-50 border-emerald-100"
                        : "bg-slate-50 border-slate-100"
                    }
                    ${
                      isSelected
                        ? "bg-blue-600 border-blue-600 shadow-xl shadow-blue-200 -translate-y-2"
                        : ""
                    }
                    ${
                      isCurrent && !isSelected
                        ? "border-rose-500 ring-2 ring-rose-100"
                        : ""
                    }
                  `}
                >
                  {isActive && (
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-black tabular-nums
                      ${
                        isSelected
                          ? "bg-white text-blue-600"
                          : "bg-emerald-500 text-white"
                      }`}
                    >
                      {marketsAtHour.length}
                    </div>
                  )}
                  <div className="flex flex-wrap justify-center gap-1 px-1">
                    {marketsAtHour.slice(0, 4).map((m) => (
                      <div
                        key={m.id}
                        className={`w-1.5 h-1.5 rounded-full ${
                          isSelected ? "bg-blue-200" : ""
                        }`}
                        style={{
                          backgroundColor: isSelected ? undefined : m.color,
                        }}
                      />
                    ))}
                  </div>
                  {isSelected && (
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 bg-blue-600 rotate-45" />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details */}
      <div className="bg-slate-50/50 rounded-3xl p-8 border border-slate-100">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 mb-8 text-center">
          <div className="flex items-center gap-3">
            <div className="w-3 h-8 bg-blue-600 rounded-full hidden md:block" />
            <h3 className="text-xl font-black text-slate-800">
              {t.activeMarkets}{" "}
              <span className="tabular-nums">
                {activeHour.toString().padStart(2, "0")}:00
              </span>
            </h3>
          </div>
          {/* Dynamic Based-on label */}
          <div className="px-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 text-xs font-black text-blue-600 uppercase tracking-widest">
            {isRTL ? `مبنا: ساعت ${userCity}` : `Based on ${userCity} Time`}
          </div>
        </div>

        {activeMarkets.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeMarkets.map((market) => {
              const userOpen = getUserTimeEquivalent(
                market.openTime,
                market.utcOffset
              );
              const userClose = getUserTimeEquivalent(
                market.closeTime,
                market.utcOffset
              );
              return (
                <div
                  key={market.id}
                  className="group bg-white border border-slate-100 rounded-2xl p-5 hover:border-blue-300 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl shadow-inner group-hover:rotate-12 transition-transform"
                      style={{
                        backgroundColor: `${market.color}15`,
                        color: market.color,
                      }}
                    >
                      🏛️
                    </div>
                    <div>
                      <h4 className="text-base font-black text-slate-800">
                        {market.name[language]}
                      </h4>
                      <p className="text-[11px] font-bold text-slate-400 uppercase tracking-tighter">
                        {market.city[language]} • {market.country[language]}
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-[11px] font-bold p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="text-text-muted uppercase">
                        {isRTL ? "ساعت محلی شهر" : "Local City Time"}
                      </span>
                      <span className="tabular-nums text-text-muted">
                        {market.openTime} - {market.closeTime}
                      </span>
                    </div>
                    {/* Dynamic User City Time Row */}
                    <div className="flex items-center justify-between text-[11px] font-bold p-2 bg-blue-50 rounded-lg border border-blue-100">
                      <span className="text-state-open uppercase">
                        {isRTL ? `ساعت ${userCity}` : `${userCity} Time`}
                      </span>
                      <span className="tabular-nums text-state-open">
                        {userOpen} - {userClose}
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white rounded-2xl border-2 border-dashed border-slate-200">
            <span className="text-4xl mb-4 block">🌙</span>
            <p className="text-slate-400 font-bold">{t.noMarkets}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MarketTimeline;

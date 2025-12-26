"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language.store";
import { markets, Market } from "@/data/markets";
import { texts } from "@/data/texts";

const MarketCards = () => {
  const [mounted, setMounted] = useState(false);
  const { language } = useLanguageStore();
  const isRTL = language === "fa";
  const [currentTime, setCurrentTime] = useState(new Date());
  const [filter, setFilter] = useState<"all" | "open" | "closed">("all");

  /**
   * Initializes component and updates current time every second
   */
  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  if (!mounted) return null;

  const t = texts.marketCards[language];

  /**
   * Converts a specific market time string to Tehran time string
   */
  const getTehranTime = (marketTimeStr: string, marketUtcOffset: number) => {
    const [hours, minutes] = marketTimeStr.split(":").map(Number);
    const tehranOffset = 3.5;
    let totalMinutes =
      hours * 60 + minutes - marketUtcOffset * 60 + tehranOffset * 60;
    totalMinutes = (totalMinutes + 1440) % 1440;
    const h = Math.floor(totalMinutes / 60);
    const m = totalMinutes % 60;
    return `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`;
  };

  /**
   * Determines market operational status based on local time and proximity to transitions
   */
  const getMarketStatus = (market: Market) => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const marketTime = new Date(utc + 3600000 * market.utcOffset);
    const day = marketTime.getDay();
    const hour = marketTime.getHours();
    const minute = marketTime.getMinutes();

    if (!market.daysOpen.includes(day)) return "weekend";

    const [openHour, openMin] = market.openTime.split(":").map(Number);
    const [closeHour, closeMin] = market.closeTime.split(":").map(Number);

    const currentMins = hour * 60 + minute;
    const openMins = openHour * 60 + openMin;
    const closeMins = closeHour * 60 + closeMin;

    if (currentMins >= openMins && currentMins < closeMins) {
      if (closeMins - currentMins <= 30) return "warning";
      if (currentMins - openMins <= 30) return "warning";
      return "open";
    }
    return "closed";
  };

  /**
   * Formats the current local time of the market
   */
  const getMarketLocalTime = (market: Market) => {
    const utc = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const marketTime = new Date(utc + 3600000 * market.utcOffset);
    return marketTime.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    });
  };

  /**
   * Returns Tailwind border color classes based on market status
   */
  const getStatusStyles = (status: string) => {
    switch (status) {
      case "open":
        return "border-emerald-500 shadow-emerald-50";
      case "warning":
        return "border-amber-400 shadow-amber-50";
      case "closed":
        return "border-slate-300 shadow-transparent";
      case "weekend":
        return "border-rose-500 shadow-rose-50";
      default:
        return "border-gray-200";
    }
  };

  const filteredMarkets = markets.filter((market) => {
    if (market.type !== "stock" && market.type !== "forex") return false;
    if (filter === "all") return true;
    const status = getMarketStatus(market);
    return filter === "open"
      ? status === "open" || status === "warning"
      : status === "closed" || status === "weekend";
  });

  return (
    <div dir={isRTL ? "rtl" : "ltr"}>
      {/* Header */}
      <div className="text-center mb-10">
        <h2
          className={`${
            isRTL ? "font-fa" : "font-en"
          } text-3xl font-extrabold mb-3 text-slate-800`}
        >
          {t.title}
        </h2>
        <p
          className={`${isRTL ? "font-fa" : "font-en"} text-slate-500 text-lg`}
        >
          {t.subtitle}
        </p>
      </div>

      {/* Tabs */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        {(["all", "open", "closed"] as const).map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`cursor-pointer px-8 py-2.5 rounded-xl font-bold text-sm transition-all duration-300 transform active:scale-95 ${
              filter === f
                ? "bg-blue-600 text-white shadow-xl translate-y-0.5"
                : "bg-white text-slate-600 hover:bg-slate-50 border border-slate-200"
            } ${isRTL ? "font-fa" : "font-en"}`}
          >
            {t.filters[f]}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {filteredMarkets.map((market) => {
          const status = getMarketStatus(market);
          const localTime = getMarketLocalTime(market);
          const tehranOpen = getTehranTime(market.openTime, market.utcOffset);
          const tehranClose = getTehranTime(market.closeTime, market.utcOffset);
          const statusClass = getStatusStyles(status);

          return (
            <div
              key={market.id}
              className={`relative border-2 rounded-2xl bg-white p-5 transition-all duration-300 hover:shadow-2xl ${statusClass}`}
            >
              {/* StatusLine */}
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h3
                    className={`${
                      isRTL ? "font-fa" : "font-en"
                    } text-xl font-black text-slate-800 mb-1`}
                  >
                    {market.city[language]}
                  </h3>
                  <p
                    className={`${
                      isRTL ? "font-fa" : "font-en"
                    } text-slate-400 text-sm font-medium`}
                  >
                    {market.country[language]}
                  </p>
                </div>

                <div
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider text-white shadow-sm ${
                    status === "open"
                      ? "bg-emerald-500"
                      : status === "warning"
                      ? "bg-amber-400"
                      : status === "weekend"
                      ? "bg-rose-500"
                      : "bg-slate-400"
                  }`}
                >
                  <span
                    className={`w-2 h-2 rounded-full bg-white ${
                      status === "open" || status === "warning"
                        ? "animate-pulse"
                        : ""
                    }`}
                  />
                  {t.status[status === "warning" ? "open" : status]}
                </div>
              </div>

              {/* Clock */}
              <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-xl mb-6 border border-slate-100">
                <div
                  className="w-14 h-14 flex items-center justify-center rounded-xl text-3xl shadow-inner"
                  style={{
                    background: `linear-gradient(135deg, ${market.color}22, ${market.color}44)`,
                  }}
                >
                  🕐
                </div>
                <div className="flex-1">
                  <div
                    className={`${
                      isRTL ? "font-fa" : "font-en"
                    } text-[10px] uppercase font-bold text-slate-400 mb-1 tracking-widest`}
                  >
                    {t.localTime}
                  </div>
                  <div className="font-mono text-2xl font-black text-slate-800 tracking-tighter">
                    {localTime}
                  </div>
                </div>
              </div>

              {/* TradingHours */}
              <div className="space-y-3 mb-6">
                <div
                  className={`${
                    isRTL ? "font-fa" : "font-en"
                  } text-xs font-bold text-slate-500 flex items-center gap-2`}
                >
                  <span className="w-1 h-1 bg-slate-300 rounded-full" />
                  {t.tradingHours}
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold w-12 ${
                      isRTL ? "text-left" : "text-right"
                    } text-slate-400`}
                  >
                    {isRTL ? "محلی" : "LOCAL"}
                  </span>
                  <div className="flex-1 flex items-center justify-between bg-slate-50 px-3 py-2 rounded-lg border border-slate-100 font-mono text-sm font-bold text-slate-600">
                    <span>{market.openTime}</span>
                    <span className="text-slate-300">→</span>
                    <span>{market.closeTime}</span>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <span
                    className={`text-[10px] font-bold w-12 ${
                      isRTL ? "text-left" : "text-right"
                    } text-blue-500`}
                  >
                    {isRTL ? "تهران" : "TEHRAN"}
                  </span>
                  <div className="flex-1 flex items-center justify-between bg-blue-50/50 px-3 py-2 rounded-lg border border-blue-100 font-mono text-sm font-black text-blue-700">
                    <span>{tehranOpen}</span>
                    <span className="text-blue-200">→</span>
                    <span>{tehranClose}</span>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="flex justify-between items-center pt-4 border-t border-slate-100">
                <span
                  className={`${
                    isRTL ? "font-fa" : "font-en"
                  } text-[10px] font-bold text-slate-400 uppercase tracking-widest`}
                >
                  {t.timezone}
                </span>
                <span className="font-mono text-[10px] font-black text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                  UTC {market.utcOffset >= 0 ? "+" : ""}
                  {market.utcOffset}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MarketCards;

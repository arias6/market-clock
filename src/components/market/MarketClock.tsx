"use client";

import { useEffect, useState } from "react";
import { useLanguageStore } from "@/store/language.store";
import { useTimeStore } from "@/store/time.store";
import { markets, Market } from "@/data/markets";
import { texts } from "@/data/texts";

const MarketClock = () => {
  const [mounted, setMounted] = useState(false);
  const [userCity, setUserCity] = useState("");
  const { language } = useLanguageStore();
  const isRTL = language === "fa";
  const { now, start } = useTimeStore();

  /**
   * Initializes the component, starts the timer and detects local timezone
   */
  useEffect(() => {
    setMounted(true);
    const cleanup = start();
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const detectedCity =
      timeZone.split("/").pop()?.replace("_", " ") || "Local";
    setUserCity(detectedCity);
    return () => cleanup();
  }, [start]);

  if (!mounted || !now) return null;

  const t = texts.marketClock[language];

  /**
   * Calculates market status by comparing current time with market hours
   */
  const getMarketStatus = (market: Market) => {
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    const marketTime = new Date(utc + market.utcOffset * 3600000);
    const day = marketTime.getDay();
    const hour = marketTime.getHours();
    const minute = marketTime.getMinutes();

    if (!market.daysOpen.includes(day)) return "closed";

    const [openH, openM] = market.openTime.split(":").map(Number);
    const [closeH, closeM] = market.closeTime.split(":").map(Number);

    const currentMins = hour * 60 + minute;
    const openMins = openH * 60 + openM;
    const closeMins = closeH * 60 + closeM;

    if (currentMins >= openMins && currentMins < closeMins) {
      if (closeMins - currentMins <= 60) return "closing-soon";
      return "open";
    }
    if (openMins - currentMins > 0 && openMins - currentMins <= 60)
      return "opening-soon";
    return "closed";
  };

  /**
   * Helper function to calculate X,Y coordinates on the clock circle
   */
  const getCoordinates = (angleInDegrees: number, radius: number) => {
    const angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
      x: 160 + radius * Math.cos(angleInRadians),
      y: 160 + radius * Math.sin(angleInRadians),
    };
  };

  const radius = 130;
  const centerX = 160;
  const centerY = 160;

  return (
    <div
      className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 mx-auto max-w-7xl font-fa"
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-slate-800 mb-4">{t.title}</h2>
        <div className="inline-flex items-center gap-3 bg-slate-50 px-5 py-2 rounded-xl border border-slate-100">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">
            {isRTL ? "مبنا:" : "Base:"} {userCity}
          </span>
          <span className="text-lg font-black text-blue-600 tabular-nums">
            {now.toLocaleTimeString("en-US", {
              hour: "2-digit",
              minute: "2-digit",
              hour12: false,
            })}
          </span>
        </div>
      </div>

      {/* AnalogClock */}
      <div className="flex justify-center mb-12">
        <div className="relative w-80 h-80">
          <svg
            width="320"
            height="320"
            viewBox="0 0 320 320"
            className="drop-shadow-xl"
          >
            {/* Clock Face */}
            <circle
              cx={centerX}
              cy={centerY}
              r={radius + 10}
              fill="white"
              stroke="#f1f5f9"
              strokeWidth={8}
            />
            <circle cx={centerX} cy={centerY} r={radius} fill="#f8fafc" />

            {/* Hour Markers */}
            {Array.from({ length: 12 }).map((_, i) => {
              const pos = getCoordinates(i * 30, radius - 10);
              const tick = getCoordinates(i * 30, radius);
              return (
                <g key={i}>
                  <line
                    x1={tick.x}
                    y1={tick.y}
                    x2={getCoordinates(i * 30, radius - 5).x}
                    y2={getCoordinates(i * 30, radius - 5).y}
                    stroke="#cbd5e1"
                    strokeWidth={2}
                  />
                  <text
                    x={pos.x}
                    y={pos.y}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    className="text-xs font-black fill-slate-400 tabular-nums"
                  >
                    {i === 0 ? 12 : i}
                  </text>
                </g>
              );
            })}

            {/* Market Arcs */}
            {markets
              .filter((m) => m.type === "stock")
              .map((market) => {
                const status = getMarketStatus(market);
                const [openH, openM] = market.openTime.split(":").map(Number);
                const [closeH, closeM] = market.closeTime
                  .split(":")
                  .map(Number);

                const userOffset = -new Date().getTimezoneOffset() / 60;
                const startTotal =
                  (openH + openM / 60 - market.utcOffset + userOffset) % 12;
                const endTotal =
                  (closeH + closeM / 60 - market.utcOffset + userOffset) % 12;

                const startPos = getCoordinates(startTotal * 30, radius - 25);
                const endPos = getCoordinates(endTotal * 30, radius - 25);
                const largeArc = (endTotal - startTotal + 12) % 12 > 6 ? 1 : 0;

                return (
                  <path
                    key={market.id}
                    d={`M ${startPos.x} ${startPos.y} A ${radius - 25} ${
                      radius - 25
                    } 0 ${largeArc} 1 ${endPos.x} ${endPos.y}`}
                    fill="none"
                    stroke={market.color}
                    strokeWidth={8}
                    strokeLinecap="round"
                    className={`transition-all duration-500 ${
                      status === "open"
                        ? "opacity-100 stroke-[12px]"
                        : "opacity-20"
                    }`}
                  />
                );
              })}

            {/* Clock Hands */}
            {/* Hour Hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={
                getCoordinates(
                  ((now.getHours() % 12) + now.getMinutes() / 60) * 30,
                  radius * 0.5
                ).x
              }
              y2={
                getCoordinates(
                  ((now.getHours() % 12) + now.getMinutes() / 60) * 30,
                  radius * 0.5
                ).y
              }
              stroke="#1e293b"
              strokeWidth={4}
              strokeLinecap="round"
            />
            {/* Minute Hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={getCoordinates(now.getMinutes() * 6, radius * 0.8).x}
              y2={getCoordinates(now.getMinutes() * 6, radius * 0.8).y}
              stroke="#64748b"
              strokeWidth={3}
              strokeLinecap="round"
            />
            {/* Second Hand */}
            <line
              x1={centerX}
              y1={centerY}
              x2={getCoordinates(now.getSeconds() * 6, radius * 0.9).x}
              y2={getCoordinates(now.getSeconds() * 6, radius * 0.9).y}
              stroke="#f43f5e"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
            <circle cx={centerX} cy={centerY} r={4} fill="#f43f5e" />
          </svg>
        </div>
      </div>

      {/* Market Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {markets
          .filter((m) => m.type === "stock")
          .map((market) => {
            const status = getMarketStatus(market);
            return (
              <div
                key={market.id}
                className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center text-center
              ${
                status === "open"
                  ? "border-emerald-500 bg-emerald-50/30"
                  : status === "opening-soon" || status === "closing-soon"
                  ? "border-amber-400 bg-amber-50/30"
                  : "border-slate-100 bg-white"
              }`}
              >
                <div
                  className="w-2 h-2 rounded-full mb-3"
                  style={{ backgroundColor: market.color }}
                />
                <h3 className="font-black text-slate-800 text-lg mb-1">
                  {market.city[language]}
                </h3>
                <p className="text-md font-bold text-slate-400 uppercase">
                  {market.openTime} - {market.closeTime}
                </p>
                <div
                  className={`mt-3 px-4 py-1 rounded-full text-sm font-black uppercase text-white
                ${
                  status === "open"
                    ? "bg-emerald-500"
                    : status === "opening-soon" || status === "closing-soon"
                    ? "bg-amber-400"
                    : "bg-slate-300"
                }`}
                >
                  {status === "open"
                    ? t.open
                    : status === "opening-soon"
                    ? t.openingSoon
                    : status === "closing-soon"
                    ? t.closingSoon
                    : t.closed}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MarketClock;

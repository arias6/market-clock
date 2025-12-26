"use client";

import { texts } from "@/data/texts";
import { useLanguageStore } from "@/store/language.store";

export default function Hero() {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";
  const t = (texts as any).hero[language];

  const scrollToMarkets = () => {
    const section = document.getElementById("market-section");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-surface-soft via-white to-brand-accent min-h-150 flex items-center justify-center">
      <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle,var(--brand-secondary)_1px,transparent_0)] bg-size-[32px_32px]"></div>

      <div className="container-custom relative z-10 py-16 lg:py-24">
        <div className="max-w-4xl mx-auto flex flex-col items-center text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-accent text-brand-primary text-sm font-medium mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            <span className={isRTL ? "font-fa" : "font-en"}>{t.badge}</span>
          </div>

          <h1
            className={`text-4xl md:text-6xl font-black text-text-main mb-6 leading-tight ${
              isRTL ? "font-fa" : "font-en"
            }`}
          >
            {t.title}
            <br />
            <span className="text-brand-primary">{t.subtitle}</span>
          </h1>

          <p
            className={`text-text-muted text-lg md:text-xl mb-10 max-w-2xl leading-relaxed ${
              isRTL ? "font-fa" : "font-en"
            }`}
          >
            {t.description}
          </p>

          <button
            onClick={scrollToMarkets}
            className={`cursor-pointer px-10 py-4 rounded-2xl bg-brand-primary text-white font-bold shadow-xl shadow-brand-primary/20 hover:-translate-y-1 active:scale-95 transition-all ${
              isRTL ? "font-fa" : "font-en"
            }`}
          >
            {t.cta}
          </button>
        </div>
      </div>

      <div className="absolute top-20 left-10 w-72 h-72 bg-brand-primary/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-state-open/10 rounded-full blur-3xl"></div>
    </section>
  );
}

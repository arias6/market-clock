"use client";

import Hero from "@/components/layout/Hero";
import MarketClock from "@/components/market/MarketClock";
import MarketTimeline from "@/components/market/MarketTimeline";
import MarketCards from "@/components/market/MarketCards";
import { useLanguageStore } from "@/store/language.store";
import MarketOverlap from "@/components/market/MarketOverlap";

export default function HomePage() {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";

  return (
    <div 
      dir={isRTL ? "rtl" : "ltr"} 
      className={`${isRTL ? 'font-fa' : 'font-en'} transition-colors duration-300`}
    >
      <Hero />
      
      <section className="py-12 md:py-20 bg-background">
        <div className="container-custom space-y-16 md:space-y-24">
          <div className="animate-slideUp">
            <MarketClock />
          </div>
          
          <div className="animate-slideUp" style={{ animationDelay: '0.2s' }}>
            <MarketTimeline />
          </div>
          <div className="animate-slideUp" style={{ animationDelay: '0.3s' }}>
            <MarketOverlap />
          </div>
          
          <div id="market-section" className="animate-slideUp px-8" style={{ animationDelay: '0.4s' }}>
            <MarketCards />
          </div>
        </div>
      </section>
    </div>
  );
}
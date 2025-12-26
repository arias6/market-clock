"use client";

import { useLanguageStore } from "@/store/language.store";
import { texts } from "@/data/texts";

const GuideSection = () => {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";
  const t = texts.guide[language];

  const guideItems = [
    { icon: "🕒", data: t.sections.analogClock },
    { icon: "📊", data: t.sections.timeline },
    { icon: "🔗", data: t.sections.overlap },
    { icon: "📱", data: t.sections.cards },
  ];

  return (
    <div className={`space-y-20 ${isRTL ? "text-right" : "text-left"}`}>
      {/* 1. Main Mission Intro */}
      <section className="max-w-4xl animate-fadeIn space-y-6">
        <h2 className="text-4xl md:text-5xl font-black text-text-main leading-tight">
          {t.intro.title}
        </h2>
        <p className="text-xl text-text-muted leading-relaxed font-medium border-s-4 border-brand-primary ps-6">
          {t.intro.description}
        </p>
      </section>

      {/* 2. Feature Grid */}
      <section>
        <div className="mb-10">
          <h3 className="text-2xl font-black text-text-main">{t.title}</h3>
          <p className="text-text-light font-bold mt-2">{t.subtitle}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {guideItems.map((item, idx) => (
            <div
              key={idx}
              className="group p-8 bg-surface-primary border border-surface-border rounded-[2.5rem] hover:border-brand-primary transition-all duration-500 animate-slideUp"
              style={{ animationDelay: `${idx * 150}ms` }}
            >
              <div className="w-16 h-16 bg-surface-soft rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:bg-brand-accent transition-colors">
                {item.icon}
              </div>
              <h4 className="text-2xl font-black text-text-main mb-4 italic uppercase">
                {item.data.title}
              </h4>
              <p className="text-text-muted leading-relaxed font-medium">
                {item.data.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Pro Tip Box */}
      <div className="bg-surface-soft border-2 border-dashed border-surface-border p-8 rounded-4xl flex items-center gap-6">
        <span className="text-4xl">💡</span>
        <p className="text-text-main font-bold italic text-lg">{t.tips}</p>
      </div>

      {/* 4. Wish & Success Section (The Heart of the Guide) */}
      <section className="relative overflow-hidden bg-text-main text-white p-10 md:p-20 rounded-[3rem] shadow-2xl animate-fadeIn text-center">
        {/* Decorative background circle */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-[80px]" />

        <div className="relative z-10 max-w-2xl mx-auto space-y-8">
          <h3 className="text-3xl md:text-4xl font-black text-brand-accent">
            {t.wish.title}
          </h3>
          <p className="text-text-light text-lg md:text-xl leading-relaxed font-medium italic">
            "{t.wish.description}"
          </p>
          <div className="pt-4">
            <span className="px-8 py-4 bg-brand-primary hover:bg-brand-secondary text-white rounded-2xl font-black text-xl transition-all inline-block shadow-lg shadow-brand-primary/30 cursor-default">
              {t.wish.button}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};

export default GuideSection;

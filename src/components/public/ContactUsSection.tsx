"use client";

import { useLanguageStore } from "@/store/language.store";

const ContactUsSection = () => {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";

  const contactMethods = [
    {
      label: isRTL ? "ایمیل رسمی" : "Official Email",
      value: "arias713j@gmail.com",
      icon: "✉️",
      link: "mailto:arias713j@gmail.com",
      color: "brand-primary",
    },
    {
      label: isRTL ? "گیت‌هاب" : "GitHub Profile",
      value: "github.com/arias6",
      icon: "🐙",
      link: "https://github.com/arias6",
      color: "text-main",
    },
  ];

  return (
    <div
      className={`grid grid-cols-1 md:grid-cols-2 gap-12 items-start ${
        isRTL ? "font-fa text-right" : "font-en text-left"
      }`}
    >
      {/* Left Side: Text & Intro */}
      <div className="space-y-8 animate-fadeIn">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-6xl font-black text-text-main leading-tight">
            {isRTL ? "بیا با هم در ارتباط" : "Let's Get in"} <br />
            <span className="text-brand-primary">
              {isRTL ? "باشیم" : "Touch"}
            </span>
          </h1>
          <p className="text-lg text-text-muted leading-relaxed font-medium max-w-md">
            {isRTL
              ? "آماده همکاری در پروژه‌های چالش‌برانگیز، مشاوره فنی یا صرفاً گپ زدن درباره تکنولوژی‌های جدید هستم."
              : "I'm open to interesting projects, technical consulting, or just chatting about new technologies."}
          </p>
        </div>

        {/* Quick Location Tag */}
        <div className="inline-flex items-center gap-3 px-4 py-2 bg-surface-soft border border-surface-border rounded-2xl">
          <span className="relative flex h-3 w-3">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-state-open opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-state-open"></span>
          </span>
          <span className="text-sm font-black text-text-main tracking-tighter uppercase">
            {isRTL ? "فعال برای پروژه‌های جدید" : "Available for new projects"}
          </span>
        </div>
      </div>

      {/* Right Side: Contact Cards */}
      <div className="grid gap-4 animate-slideUp [animation-delay:200ms]">
        {contactMethods.map((method, i) => (
          <a
            key={i}
            href={method.link}
            target="_blank"
            rel="noopener noreferrer"
            className="group p-6 bg-surface-primary border border-surface-border rounded-4xl flex items-center gap-6 hover:border-brand-primary hover:shadow-xl hover:shadow-brand-accent transition-all duration-500"
          >
            <div className="w-14 h-14 rounded-2xl bg-surface-soft flex items-center justify-center text-2xl group-hover:scale-110 transition-transform">
              {method.icon}
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="text-[10px] font-black text-text-light uppercase tracking-widest mb-1">
                {method.label}
              </div>
              <div className="text-lg font-bold text-text-main group-hover:text-brand-primary transition-colors truncate tracking-tighter">
                {method.value}
              </div>
            </div>
            <div
              className={`text-xl ${
                isRTL ? "rotate-180" : ""
              } opacity-0 group-hover:opacity-100 transition-all translate-x-2.5 group-hover:translate-x-0`}
            >
              →
            </div>
          </a>
        ))}
      </div>
    </div>
  );
};

export default ContactUsSection;

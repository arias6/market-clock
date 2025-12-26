"use client";

import { useLanguageStore } from "@/store/language.store";
import {
  Boxes,
  Code2,
  Cpu,
  Database,
  LayoutDashboard,
  Server,
} from "lucide-react";

const AboutSection = () => {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";

  const techStack = [
    {
      name: isRTL ? "توسعه فرانت‌اند" : "Frontend Development",
      items: ["JavaScript", "TypeScript", "React", "Next.js", "Vite", "jQuery"],
      color: "brand-primary",
    },
    {
      name: isRTL ? "طراحی رابط کاربری و تجربه کاربری" : "UI / UX & Styling",
      items: [
        "HTML5",
        "CSS3",
        "Tailwind CSS",
        "MUI",
        "Bootstrap",
        "Figma",
        "Adobe XD",
      ],
      color: "brand-secondary",
    },
    {
      name: isRTL ? "بک‌اند و منطق سرور" : "Backend Development",
      items: ["Python", "Django", "Flask"],
      color: "state-open",
    },
    {
      name: isRTL
        ? "دیتابیس، دواپس و زیرساخت"
        : "Database, DevOps & Infrastructure",
      items: [
        "PostgreSQL",
        "MySQL",
        "SQLite",
        "Docker",
        "Linux Server",
        "Monorepo Architecture",
      ],
      color: "state-warning",
    },
  ];

  return (
    <div
      className={`flex flex-col gap-12 ${
        isRTL ? "font-fa text-right" : "font-en text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      {/* HERO */}
      <section className="relative overflow-hidden rounded-[2.5rem] bg-surface-primary border border-surface-border p-8 md:p-16 shadow-sm">
        <div
          className={`absolute top-0 ${
            isRTL ? "left-0" : "right-0"
          } w-64 h-64 bg-brand-accent rounded-full blur-[100px] -translate-y-1/2 ${
            isRTL ? "-translate-x-1/2" : "translate-x-1/2"
          }`}
        />

        <div className="relative z-10 flex flex-col gap-6 max-w-4xl">
          <div className="inline-flex items-center gap-3 text-brand-primary">
            <span className="w-12 h-0.5 bg-brand-primary" />
            <span className="text-sm font-bold uppercase italic tracking-tighter">
              {isRTL
                ? "مهندس نرم‌افزار | توسعه‌دهنده ارشد فول‌استک"
                : "Software Engineer | Senior Full-stack Developer"}
            </span>
          </div>

          <h1 className="text-4xl md:text-7xl font-black text-text-main leading-[1.2]">
            {isRTL ? "طراحی و توسعه" : "Designing & Developing"} <br />
            <span className="text-brand-primary">
              {isRTL
                ? "سیستم‌های نرم‌افزاری واقعی"
                : "Real-world Software Systems"}
            </span>
          </h1>

          <p className="text-lg md:text-xl text-text-muted leading-relaxed font-medium max-w-3xl">
            {isRTL
              ? "من آریاس هستم؛ توسعه‌دهنده ارشد فول‌استک با نزدیک به ۸ سال سابقه حرفه‌ای. در این سال‌ها روی پروژه‌های متنوعی در هر دو حوزه فرانت‌اند و بک‌اند کار کرده‌ام. تمرکز اصلی من طراحی و پیاده‌سازی سیستم‌هایی است که در محیط واقعی، پایدار، قابل توسعه و مقیاس‌پذیر باشند."
              : "I'm Arias, a senior full-stack developer with nearly 8 years of professional experience. Over the years, I have worked on a wide range of frontend and backend projects, focusing on building stable, scalable, and production-ready systems."}
          </p>
        </div>
      </section>

      {/* STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: isRTL ? "سال تجربه" : "Years of Experience", value: "8+" },
          { label: isRTL ? "پروژه‌های بزرگ" : "Large Projects", value: "10+" },
          { label: isRTL ? "تکنولوژی‌ها" : "Technologies", value: "20+" },
          {
            label: isRTL
              ? "داکرایز و مونو ریپو"
              : "Dockerized & Monorepo Architecture",
            value: "100%",
          },
        ].map((stat, i) => (
          <div
            key={i}
            className="bg-surface-soft border border-surface-border p-6 rounded-3xl"
          >
            <div className="text-3xl font-black">{stat.value}</div>
            <div className="text-[10px] uppercase font-bold tracking-widest text-text-light">
              {stat.label}
            </div>
          </div>
        ))}
      </div>

      {/* TECH STACK */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {techStack.map((category, idx) => (
          <div
            key={idx}
            className="p-8 rounded-4xl bg-surface-primary border border-surface-border"
          >
            <h3 className="text-lg font-black mb-6 flex items-center gap-3">
              <span className={`w-3 h-3 rounded-full bg-${category.color}`} />
              {category.name}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.items.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 rounded-xl text-xs font-bold bg-surface-soft border border-surface-border"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* EXPERIENCE */}
      <section className="bg-text-main rounded-[2.5rem] p-10 md:p-16 text-surface-primary">
        <div className="grid md:grid-cols-2 gap-12">
          <div>
            <h2 className="text-3xl font-black mb-6 text-brand-accent">
              {isRTL
                ? "تفکیک تجربه فرانت‌اند و بک‌اند"
                : "Frontend & Backend Experience"}
            </h2>

            <p className="text-text-light leading-relaxed text-lg mb-6">
              {isRTL
                ? "در حوزه فرانت‌اند، روی پروژه‌های متعددی از جمله سامانه‌های جمع‌آوری دیتا، فرم‌سازهای پیشرفته، سایت‌های تامین مالی، صرافی‌های آنلاین و سیستم‌های پاسخ‌گویی هوشمند مشابه Gemini کار کرده‌ام. این پروژه‌ها عمدتاً با تمرکز بر تجربه کاربری، تعامل‌پذیری بالا و معماری مدرن فرانت‌اند توسعه داده شده‌اند."
                : ""}
            </p>

            <p className="text-text-light leading-relaxed text-lg mb-6">
              {isRTL
                ? "در بخش بک‌اند، تمرکز اصلی من روی توسعه منطق سرور و مدیریت داده در پروژه‌های فروشگاهی، سامانه‌های ثبت‌نام و فروش خودرو بوده است. این پروژه‌ها با استفاده از Django و Flask پیاده‌سازی شده و شامل طراحی API، مدیریت دیتابیس، احراز هویت و منطق تجاری بوده‌اند."
                : ""}
            </p>

            <p className="text-text-light leading-relaxed text-lg">
              {isRTL
                ? "در کنار توسعه پروژه‌ها، با زبان Python و ابزارهایی مانند Pandas، Requests و Selenium تجربه گسترده‌ای در پردازش داده، ارتباط با APIها و خودکارسازی فرآیندها داشته‌ام که این مهارت‌ها در بهینه‌سازی و پشتیبانی پروژه‌ها نقش کلیدی داشته‌اند."
                : ""}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Frontend */}
            <div className="bg-brand-primary rounded-2xl min-h-27 flex flex-col justify-center items-center text-center gap-2">
              <LayoutDashboard className="w-6 h-6 opacity-90" />
              <span className="text-lg font-black italic">Frontend</span>
              <span className="text-[10px] uppercase font-bold opacity-80">
                React · Next.js
              </span>
            </div>

            {/* Backend */}
            <div className="bg-brand-secondary rounded-2xl min-h-27 flex flex-col justify-center items-center text-center gap-2">
              <Server className="w-6 h-6 opacity-90" />
              <span className="text-lg font-black italic">Backend</span>
              <span className="text-[10px] uppercase font-bold opacity-80">
                Django · Flask
              </span>
            </div>

            {/* Python */}
            <div className="bg-brand-primary rounded-2xl min-h-27 flex flex-col justify-center items-center text-center gap-2">
              <Code2 className="w-6 h-6 opacity-90" />
              <span className="text-lg font-black italic">Python</span>
              <span className="text-[10px] uppercase font-bold opacity-80">
                Pandas · Selenium · Requests
              </span>
            </div>

            {/* DevOps */}
            <div className="bg-brand-secondary rounded-2xl min-h-27 flex flex-col justify-center items-center text-center gap-2">
              <Boxes className="w-6 h-6 opacity-90" />
              <span className="text-lg font-black italic">DevOps</span>
              <span className="text-[10px] uppercase font-bold opacity-80">
                Docker · Linux
              </span>
            </div>

            {/* Database */}
            <div className="bg-brand-primary rounded-2xl min-h-27 flex flex-col justify-center items-center text-center gap-2">
              <Database className="w-6 h-6 opacity-90" />
              <span className="text-lg font-black italic">Database</span>
              <span className="text-[10px] uppercase font-bold opacity-80">
                PostgreSQL · MySQL
              </span>
            </div>

            {/* Architecture */}
            <div className="bg-brand-secondary rounded-2xl min-h-27 flex flex-col justify-center items-center text-center gap-2">
              <Cpu className="w-6 h-6 opacity-90" />
              <span className="text-lg font-black italic">Architecture</span>
              <span className="text-[10px] uppercase font-bold opacity-80">
                Monorepo · Scalable Systems
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutSection;

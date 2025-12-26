"use client";

import Link from "next/link";
import { useLanguageStore } from "@/store/language.store";
import AboutSection from "@/components/public/AboutSection";

export default function AboutPage() {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";

  return (
    <main
      className={`min-h-screen bg-background py-20 px-8 ${
        isRTL ? "font-fa" : "font-en"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container-custom">
        <div
          className={`mb-12 flex items-center gap-2 text-md font-black uppercase tracking-widest text-text-light 
          ${isRTL ? "justify-start" : "justify-start"}`}
        >
          <Link
            href="/"
            className="hover:text-brand-primary transition-colors cursor-pointer tracking-tighter"
          >
            {isRTL ? "خانه" : "Home"}
          </Link>

          <span className="text-text-light">/</span>

          <span className="text-brand-primary tracking-tighter">
            {isRTL ? "درباره من" : "About Me"}
          </span>
        </div>

        <AboutSection />
      </div>
    </main>
  );
}

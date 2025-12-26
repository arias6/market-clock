"use client";

import Link from "next/link";
import { useState } from "react";
import { texts } from "@/data/texts";
import { useLanguageStore } from "@/store/language.store";
import { useMobileMenuStore } from "@/store/mobileMenu.store";
import { Menu, X, Clock, Globe, ChevronDown } from "lucide-react";

export default function Header() {
  const { language, setLanguage } = useLanguageStore();
  const { open, toggle, close } = useMobileMenuStore();
  const [langMenu, setLangMenu] = useState(false);

  const isRTL = language === "fa";
  const t = texts.header[language];

  const navItems = [
    { href: "/", label: t.nav.home },
    { href: "/about", label: t.nav.about },
    { href: "/contact", label: t.nav.contact },
    { href: "/guide", label: t.nav.guide },
  ];

  return (
    <header
      className="w-full bg-surface-primary border-b border-surface-border relative"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-4 cursor-pointer group"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-primary text-white shadow-lg shadow-brand-primary/20 group-hover:rotate-12 transition-transform duration-300">
              <Clock size={24} />
            </div>
            <span className="text-xl font-black text-text-main tracking-tight">
              {t.title}
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="px-5 py-2 text-sm font-bold text-text-muted hover:text-brand-primary rounded-xl hover:bg-surface-soft transition-all duration-200 cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <div className="relative">
              <button
                onClick={() => setLangMenu(!langMenu)}
                className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-surface-soft border border-surface-border text-xs font-bold text-text-main hover:border-brand-primary transition-all cursor-pointer"
              >
                <Globe size={16} className="text-brand-primary" />
                {language === "fa" ? "فارسی" : "ENGLISH"}
                <ChevronDown
                  size={14}
                  className={`transition-transform ${
                    langMenu ? "rotate-180" : ""
                  }`}
                />
              </button>

              {langMenu && (
                <div className="absolute top-full mt-2 w-32 bg-surface-primary border border-surface-border shadow-xl rounded-xl overflow-hidden z-60 animate-fadeIn">
                  <button
                    onClick={() => {
                      setLanguage("fa");
                      setLangMenu(false);
                    }}
                    className="w-full px-4 py-3 text-right text-sm font-bold hover:bg-surface-soft text-text-main cursor-pointer"
                  >
                    فارسی
                  </button>
                  <button
                    onClick={() => {
                      setLanguage("en");
                      setLangMenu(false);
                    }}
                    className="w-full px-4 py-3 text-left text-sm font-bold hover:bg-surface-soft text-text-main cursor-pointer border-t border-surface-border"
                  >
                    English
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={toggle}
              className="md:hidden p-2.5 rounded-xl bg-surface-soft text-text-main cursor-pointer"
            >
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="md:hidden py-6 border-t border-surface-border flex flex-col gap-2 animate-slideUp">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={close}
                className="px-6 py-4 rounded-xl text-base font-black text-text-main hover:bg-surface-soft cursor-pointer"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}
      </div>
    </header>
  );
}

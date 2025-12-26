"use client";

import Link from "next/link";
import { texts } from "@/data/texts";
import { useLanguageStore } from "@/store/language.store";
import { Twitter, Linkedin, GithubIcon, Heart, Globe, Mail } from "lucide-react";

export default function Footer() {
  const { language } = useLanguageStore();
  const isRTL = language === "fa";
  const t = texts.footer[language];
  const currentYear = new Date().getFullYear();

  return (
    <footer
      className="bg-text-main text-white py-20"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="mx-auto max-w-7xl px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 pb-16">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-primary shadow-lg">
                <Globe size={28} />
              </div>
              <h2 className="text-3xl font-black tracking-tight">
                {t.siteTitle}
              </h2>
            </div>
            <p className="text-text-light text-lg leading-relaxed max-w-md font-medium">
              {t.description}
            </p>
          </div>

          <div>
            <h3 className="text-white font-black text-xl mb-8 border-b border-white/10 pb-2 inline-block">
              {t.quickLinks}
            </h3>
            <ul className="space-y-5">
              {[
                { href: "/", label: t.links.home },
                { href: "/about", label: t.links.about },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-light hover:text-brand-primary font-bold transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-white font-black text-xl mb-8 border-b border-white/10 pb-2 inline-block">
              {t.quickLinks}
            </h3>
            <ul className="space-y-5">
              {[
                { href: "/faq", label: t.links.faq },
                { href: "/guide", label: t.links.guide },
              ].map((link) => (
                <li key={link.label}>
                  <Link
                    href={link.href}
                    className="text-text-light hover:text-brand-primary font-bold transition-colors cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10">
    <div className="flex items-center gap-5">
    {[
      { 
        icon: <GithubIcon size={22} />, 
        label: "Github", 
        href: "https://github.com/arias6", 
        isExternal: true 
      },
      { 
        icon: <Mail size={22} />, 
        label: "Email", 
        href: "mailto:arias713j@gmail.com",
        isExternal: false 
      },
    ].map((social) => (
      <a
        key={social.label}
        href={social.href}
        target={social.isExternal ? "_blank" : undefined}
        rel={social.isExternal ? "noopener noreferrer" : undefined}
        className="w-12 h-12 flex items-center justify-center rounded-2xl bg-white/5 hover:bg-brand-primary hover:scale-110 transition-all duration-300 cursor-pointer text-white"
      >
        {social.icon}
      </a>
    ))}
  </div>

          <div className="flex flex-col md:flex-row items-center gap-4 text-sm font-bold text-text-light uppercase tracking-widest">
            <p>
              © {currentYear} {t.copyright}
            </p>
            <span className="hidden md:block opacity-20">|</span>
            <p className="flex items-center gap-2">
              {t.madeWith}{" "}
              <Heart
                size={16}
                className="text-state-closed fill-state-closed"
              />{" "}
              {t.by}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}

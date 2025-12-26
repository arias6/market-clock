import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const Estedad = localFont({
  src: [
    { path: "../../public/fonts/Estedad.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-Estedad",
});

const inter = localFont({
  src: [
    { path: "../../public/fonts/Inter.ttf", weight: "400", style: "normal" },
  ],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Market Clock | ساعت بازارهای جهانی",
  description: "نمایش زنده وضعیت بازارهای مالی جهانی به وقت ایران",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <body
        suppressHydrationWarning={true}
        className={`${Estedad.variable} ${inter.variable} font-fa antialiased min-h-screen flex flex-col`}
      >
        <Header />
        <main className="grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

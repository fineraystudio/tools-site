"use client";

import Link from "next/link";
import { useState } from "react";
import { QrCode, FileText, Image, Wallet } from "lucide-react";

const TRANSLATIONS = {
  en: {
    title: "Free Online Tools",
    subtitle: "Essential web tools, available in English and Bahasa Melayu",
    private: "100% Private",
    privateDesc: "All processing happens in your browser",
    fast: "Lightning Fast",
    fastDesc: "No uploads, no waiting",
    free: "Completely Free",
    freeDesc: "No sign-up, no limits",
    bilingual: "Bilingual",
    bilingualDesc: "English and Bahasa Melayu",
    tools: [
      {
        name: "QR Code Generator",
        desc: "Create QR codes for text, links, Wi-Fi, and contacts",
        href: "/qr-code",
      },
      {
        name: "PDF Merge",
        desc: "Combine multiple PDF files into one document",
        href: "/pdf-merge",
      },
      {
        name: "Image Compressor",
        desc: "Reduce image file size while keeping quality",
        href: "/image-compressor",
      },
      {
        name: "Pengurus Bayaran",
        desc: "Malay monthly payment tracker with a Zakat calculator and Hijri calendar",
        href: "/pengurus-bayaran",
      },
    ],
  },
  ms: {
    title: "Alat Dalam Talian Percuma",
    subtitle: "Alat web penting, tersedia dalam Bahasa Inggeris dan Bahasa Melayu",
    private: "100% Peribadi",
    privateDesc: "Semua pemprosesan berlaku dalam pelayar anda",
    fast: "Pantas Kilat",
    fastDesc: "Tiada muat naik, tiada menunggu",
    free: "Percuma Sepenuhnya",
    freeDesc: "Tiada daftar, tiada had",
    bilingual: "Dwibahasa",
    bilingualDesc: "Bahasa Inggeris dan Bahasa Melayu",
    tools: [
      {
        name: "Penjana Kod QR",
        desc: "Cipta kod QR untuk teks, pautan, Wi-Fi, dan kenalan",
        href: "/qr-code",
      },
      {
        name: "Gabung PDF",
        desc: "Gabungkan beberapa fail PDF menjadi satu dokumen",
        href: "/pdf-merge",
      },
      {
        name: "Kompres Gambar",
        desc: "Kurangkan saiz fail gambar sambil mengekalkan kualiti",
        href: "/image-compressor",
      },
      {
        name: "Pengurus Bayaran",
        desc: "Rekod bil bulanan dalam Bahasa Melayu, dengan kalkulator zakat dan kalendar Hijrah",
        href: "/pengurus-bayaran",
      },
    ],
  },
};

export default function Home() {
  const [lang, setLang] = useState<"en" | "ms">("en");
  const t = TRANSLATIONS[lang];

  const icons = [QrCode, FileText, Image, Wallet];

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-6xl px-5 py-12">
        <header className="mb-12 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{t.title}</h1>
            <p className="mt-2 text-lg text-muted">{t.subtitle}</p>
          </div>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "en" | "ms")}
            className="rounded-lg border border-border bg-panel px-3 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="en">English</option>
            <option value="ms">Bahasa Melayu</option>
          </select>
        </header>

        <div className="mb-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { title: t.private, desc: t.privateDesc, icon: "🔒" },
            { title: t.fast, desc: t.fastDesc, icon: "⚡" },
            { title: t.free, desc: t.freeDesc, icon: "🆓" },
            { title: t.bilingual, desc: t.bilingualDesc, icon: "🌏" },
          ].map((f) => (
            <div key={f.title} className="rounded-xl border border-border bg-panel p-4">
              <div className="mb-2 text-2xl">{f.icon}</div>
              <h3 className="mb-1 font-semibold">{f.title}</h3>
              <p className="text-sm text-muted">{f.desc}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {t.tools.map((tool, i) => {
            const Icon = icons[i];
            return (
              <Link
                key={tool.href}
                href={tool.href}
                className="group rounded-xl border border-border bg-panel p-6 transition-all hover:border-accent hover:shadow-lg"
              >
                <div className="mb-3 flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-lg bg-panel-2 text-accent">
                    <Icon size={20} />
                  </div>
                  <h2 className="text-lg font-semibold">{tool.name}</h2>
                </div>
                <p className="text-sm text-muted">{tool.desc}</p>
                <div className="mt-4 text-sm font-medium text-accent group-hover:underline">
                  {lang === "en" ? "Try it now →" : "Cuba sekarang →"}
                </div>
              </Link>
            );
          })}
        </div>

        <footer className="mt-16 border-t border-border pt-8 text-center text-sm text-muted">
          <p>
            <Link href="/privacy" className="text-accent hover:underline">
              {lang === "en" ? "Privacy Policy" : "Dasar Privasi"}
            </Link>
          </p>
          <p className="mt-2">
            {lang === "en"
              ? "All tools process data locally in your browser."
              : "Semua alat memproses data secara tempatan dalam pelayar anda."}
          </p>
        </footer>
      </div>
    </div>
  );
}

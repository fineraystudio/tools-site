"use client";

import Link from "next/link";
import { useState } from "react";

const TRANSLATIONS = {
  en: {
    title: "Privacy Policy",
    lastUpdated: "Last updated: October 27, 2026",
    intro: "Your privacy is important to us. This Privacy Policy explains how our tools work and what data (if any) is collected.",
    dataProcessing: "Data Processing",
    dataProcessingDesc: "All processing happens entirely in your browser. When you use our tools:",
    dataPoints: [
      "No files or data are uploaded to any server",
      "All conversions, generations, and processing happen locally on your device",
      "We cannot see, access, or store any of your data",
    ],
    localStorage: "Local Storage",
    localStorageDesc: "We use localStorage only to remember your language preference (English or Bahasa Melayu). No other data is stored.",
    analytics: "Analytics",
    analyticsDesc: "We do not use analytics, tracking cookies, or third-party scripts. Your browsing activity is not tracked.",
    thirdParty: "Third-Party Services",
    thirdPartyDesc: "Our tools do not connect to any third-party services or APIs. Everything runs offline in your browser.",
    contact: "Contact",
    contactDesc: "If you have any questions about this Privacy Policy, please contact us.",
    backHome: "← Back to Home",
  },
  ms: {
    title: "Dasar Privasi",
    lastUpdated: "Kemas kini terakhir: 27 Oktober 2026",
    intro: "Privasi anda penting bagi kami. Dasar Privasi ini menerangkan bagaimana alat kami berfungsi dan data apa (jika ada) yang dikumpul.",
    dataProcessing: "Pemprosesan Data",
    dataProcessingDesc: "Semua pemprosesan berlaku sepenuhnya dalam pelayar anda. Apabila anda menggunakan alat kami:",
    dataPoints: [
      "Tiada fail atau data dimuat naik ke mana-mana pelayan",
      "Semua penukaran, penjanaan, dan pemprosesan berlaku secara tempatan pada peranti anda",
      "Kami tidak dapat melihat, mengakses, atau menyimpan mana-mana data anda",
    ],
    localStorage: "Penyimpanan Tempatan",
    localStorageDesc: "Kami menggunakan localStorage hanya untuk mengingati pilihan bahasa anda (Bahasa Inggeris atau Bahasa Melayu). Tiada data lain disimpan.",
    analytics: "Analitik",
    analyticsDesc: "Kami tidak menggunakan analitik, kuki penjejakan, atau skrip pihak ketiga. Aktiviti pelayaran anda tidak dijejaki.",
    thirdParty: "Perkhidmatan Pihak Ketiga",
    thirdPartyDesc: "Alat kami tidak disambungkan ke mana-mana perkhidmatan atau API pihak ketiga. Semuanya berjalan luar talian dalam pelayar anda.",
    contact: "Hubungi",
    contactDesc: "Jika anda mempunyai sebarang soalan mengenai Dasar Privasi ini, sila hubungi kami.",
    backHome: "← Kembali ke Laman Utama",
  },
};

export default function PrivacyPage() {
  const [lang, setLang] = useState<"en" | "ms">("en");
  const t = TRANSLATIONS[lang];

  return (
    <div className="min-h-screen bg-bg">
      <div className="mx-auto max-w-3xl px-5 py-12">
        <div className="mb-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            {t.backHome}
          </Link>
        </div>

        <header className="mb-8 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
            <p className="mt-2 text-sm text-muted">{t.lastUpdated}</p>
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

        <div className="prose prose-sm max-w-none">
          <p className="mb-8 text-muted">{t.intro}</p>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">{t.dataProcessing}</h2>
            <p className="mb-3 text-muted">{t.dataProcessingDesc}</p>
            <ul className="list-disc space-y-2 pl-6 text-muted">
              {t.dataPoints.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">{t.localStorage}</h2>
            <p className="text-muted">{t.localStorageDesc}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">{t.analytics}</h2>
            <p className="text-muted">{t.analyticsDesc}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">{t.thirdParty}</h2>
            <p className="text-muted">{t.thirdPartyDesc}</p>
          </section>

          <section className="mb-8">
            <h2 className="mb-3 text-xl font-semibold">{t.contact}</h2>
            <p className="text-muted">{t.contactDesc}</p>
          </section>
        </div>
      </div>
    </div>
  );
}

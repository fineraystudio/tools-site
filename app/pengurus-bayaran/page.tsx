"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  CalendarDays,
  Check,
  Download,
  Filter,
  Languages,
  Moon,
  ShieldCheck,
  Wallet,
} from "lucide-react";

import icon from "./images/icon-512.png";
import dashboardShot from "./images/01-dashboard.png";
import formShot from "./images/02-tambah-bayaran.png";
import zakatShot from "./images/03-kalkulator-zakat.png";

// The app is its own installable PWA, deployed from autobots-lab/pengurus-bayaran.
// TODO(launch): confirm this URL once the app's GitHub Pages site is live.
const APP_URL = "https://fineraystudio.github.io/pengurus-bayaran/";

const TRANSLATIONS = {
  ms: {
    backHome: "← Kembali ke Laman Utama",
    kicker: "Apl web · Bahasa Melayu",
    title: "Pengurus Bayaran",
    tagline: "Urus bayaran bulanan anda dengan mudah.",
    intro:
      "Rekod bil dan komitmen bulanan dalam Bahasa Melayu — tandakan apa yang sudah dibayar, lihat jumlah bulanan berbanding tambahan, dan tapis atau susun senarai mengikut status, jenis, tarikh atau amaun.",
    cta: "Buka aplikasi",
    ctaNote: "Percuma · Tiada akaun · Data kekal dalam peranti anda",
    privacy: "Dasar privasi",
    badges: ["Percuma", "Bahasa Melayu", "Data dalam peranti", "Boleh dipasang (PWA)"],
    shotAlt: "Papan pemuka Pengurus Bayaran dengan ringkasan bulanan dan senarai bayaran",
    shotCaption: "Papan pemuka: ringkasan bulanan, kalkulator zakat dan senarai bayaran.",
    featuresTitle: "Apa yang anda dapat",
    featuresSubtitle:
      "Satu halaman ringan — tiada rangka kerja, tiada penjejak, tiada muat naik.",
    features: [
      {
        title: "Bahasa Melayu sepenuhnya",
        desc: "Semua teks, nama bulan dan format tarikh dalam Bahasa Melayu.",
      },
      {
        title: "Ringgit Malaysia (RM)",
        desc: "Jumlah bulanan, tambahan, sudah dibayar dan belum dibayar — semuanya dalam RM.",
      },
      {
        title: "Kalkulator Zakat",
        desc: "Kira zakat 2.5% daripada jumlah simpanan apabila ia mencapai nisab RM 15,000, dengan penerangan ringkas.",
      },
      {
        title: "Kalendar Hijrah",
        desc: "Tarikh Hijrah hari ini, tarikh Hijrah bagi setiap bayaran, dan tapisan 12 bulan Hijrah.",
      },
      {
        title: "Tapis dan susun",
        desc: "Tapis ikut jenis dan status; susun ikut tarikh, amaun atau nama.",
      },
      {
        title: "Simpanan peribadi",
        desc: "Data kekal dalam peranti anda. Eksport dan import JSON untuk sandaran atau tukar peranti.",
      },
    ],
    stepsTitle: "Mula dalam tiga langkah",
    steps: [
      {
        title: "Tambah bayaran",
        desc: "Masukkan bil dan komitmen bulanan anda — sekali sahaja.",
      },
      {
        title: "Tanda dibayar",
        desc: "Tandakan setiap bayaran apabila sudah dijelaskan.",
      },
      {
        title: "Bulan baharu",
        desc: "Komitmen bulanan disalin sendiri; bayaran tambahan kekal dalam bulan asal.",
      },
    ],
    galleryTitle: "Lihat di dalam",
    gallery: [
      {
        src: formShot,
        alt: "Borang tambah bayaran dengan medan nama, amaun, tarikh, jenis dan status",
        caption: "Tambah bayaran: nama, amaun, tarikh, jenis dan status.",
      },
      {
        src: zakatShot,
        alt: "Kalkulator Zakat dengan nisab RM 15,000 dan keputusan amaun zakat",
        caption: "Kalkulator Zakat: nisab RM 15,000 dan kadar 2.5%.",
      },
    ],
    faqTitle: "Soalan lazim",
    faq: [
      {
        q: "Adakah data saya dihantar ke pelayan?",
        a: "Tidak. Semua data disimpan dalam peranti anda menggunakan localStorage. Tiada akaun, tiada pelayan dan tiada muat naik. Anda boleh menyimpan sandaran sendiri dengan eksport JSON.",
      },
      {
        q: "Perlukah saya daftar akaun?",
        a: "Tidak perlu. Buka pautan dan mula merekod — tiada pendaftaran, tiada e-mel, tiada kata laluan.",
      },
      {
        q: "Bagaimana zakat dikira?",
        a: "Zakat dikira 2.5% daripada jumlah simpanan apabila ia mencapai nisab RM 15,000 (nisab ialah ambang, bukan jumlah yang ditolak). Ia kalkulator anggaran; rujuk pihak berkuasa agama untuk pengiraan yang tepat.",
      },
      {
        q: "Boleh dipasang di telefon?",
        a: "Boleh. Buka dalam Chrome atau Safari, kemudian pilih “Tambah ke skrin utama”. Selepas lawatan pertama, aplikasi berfungsi luar talian.",
      },
      {
        q: "Adakah tarikh Hijrah tepat?",
        a: "Tarikh Hijrah dianggarkan mengikut kalendar Umm al-Qura. Tarikh rasmi Malaysia (JAKIM) ditentukan melalui rukyah, jadi ia boleh berbeza sehari.",
      },
    ],
    credit:
      "Berdasarkan Payment Manager daripada projek personal-efficiency-machine oleh Farid Rameli. Lesen MIT.",
    footerNote: "Semua data diproses dalam pelayar anda.",
    finalTitle: "Sedia untuk mengurus bayaran anda?",
    finalDesc: "Buka Pengurus Bayaran — percuma, dalam Bahasa Melayu, terus dalam pelayar.",
  },
  en: {
    backHome: "← Back to Home",
    kicker: "Web app · Bahasa Melayu",
    title: "Pengurus Bayaran",
    tagline: "Manage your monthly payments with ease.",
    intro:
      "Track bills and monthly commitments in Malay — mark what is paid, see monthly versus extra totals, and filter or sort the list by status, type, date or amount.",
    cta: "Open the app",
    ctaNote: "Free · No account · Your data stays on your device",
    privacy: "Privacy policy",
    badges: ["Free", "Bahasa Melayu", "Data on your device", "Installable (PWA)"],
    shotAlt: "Pengurus Bayaran dashboard with monthly summary and payment list",
    shotCaption: "Dashboard: monthly summary, Zakat calculator and payment list.",
    featuresTitle: "What you get",
    featuresSubtitle: "One lightweight page — no framework, no trackers, no uploads.",
    features: [
      {
        title: "Fully in Bahasa Melayu",
        desc: "Every label, month name and date format in Malay.",
      },
      {
        title: "Malaysian Ringgit (RM)",
        desc: "Monthly, extra, paid and unpaid totals — all in RM.",
      },
      {
        title: "Zakat calculator",
        desc: "Work out 2.5% Zakat on total savings once they reach the RM 15,000 nisab, with a short explanation.",
      },
      {
        title: "Hijri calendar",
        desc: "Today's Hijri date, the Hijri date of every payment, and a 12-month Hijri filter.",
      },
      {
        title: "Filter and sort",
        desc: "Filter by type and status; sort by date, amount or name.",
      },
      {
        title: "Private by design",
        desc: "Data stays on your device. Export and import JSON to back up or move phones.",
      },
    ],
    stepsTitle: "Start in three steps",
    steps: [
      {
        title: "Add payments",
        desc: "Enter your bills and monthly commitments — once.",
      },
      {
        title: "Mark as paid",
        desc: "Tick each payment off when it is settled.",
      },
      {
        title: "New month",
        desc: "Monthly commitments carry over automatically; extras stay in their month.",
      },
    ],
    galleryTitle: "A look inside",
    gallery: [
      {
        src: formShot,
        alt: "Add payment form with name, amount, date, type and status fields",
        caption: "Add payment: name, amount, date, type and status.",
      },
      {
        src: zakatShot,
        alt: "Zakat calculator with the RM 15,000 nisab and the Zakat amount",
        caption: "Zakat calculator: RM 15,000 nisab and a 2.5% rate.",
      },
    ],
    faqTitle: "Common questions",
    faq: [
      {
        q: "Is my data sent to a server?",
        a: "No. Everything is stored on your device in localStorage. There is no account, no server and no upload. You can keep your own backup with JSON export.",
      },
      {
        q: "Do I need to sign up?",
        a: "No. Open the link and start recording — no registration, no email, no password.",
      },
      {
        q: "How is Zakat calculated?",
        a: "Zakat is 2.5% of your total savings once they reach the RM 15,000 nisab (nisab is a threshold, not an amount deducted). It is a simple estimator; consult the religious authorities for an exact calculation.",
      },
      {
        q: "Can I install it on my phone?",
        a: "Yes. Open it in Chrome or Safari, then choose “Add to Home Screen”. After the first visit it works offline.",
      },
      {
        q: "Are the Hijri dates exact?",
        a: "Hijri dates follow the Umm al-Qura calendar. Malaysia's official dates (JAKIM) are set by moon sighting, so they can differ by a day.",
      },
    ],
    credit:
      "Based on Payment Manager from the personal-efficiency-machine project by Farid Rameli. MIT licensed.",
    footerNote: "Everything is processed in your browser.",
    finalTitle: "Ready to get your payments in order?",
    finalDesc: "Open Pengurus Bayaran — free, in Bahasa Melayu, right in your browser.",
  },
};

const FEATURE_ICONS = [Languages, Wallet, Moon, CalendarDays, Filter, Download];

export default function PengurusBayaranPage() {
  const [lang, setLang] = useState<"ms" | "en">("ms");
  const t = TRANSLATIONS[lang];

  // The root layout sets lang="en" for the (mostly English) tools; this page is
  // Malay by default, so keep the document language in step with the toggle.
  useEffect(() => {
    const previous = document.documentElement.lang;
    document.documentElement.lang = lang;
    return () => {
      document.documentElement.lang = previous;
    };
  }, [lang]);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pengurus Bayaran",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    inLanguage: "ms",
    url: APP_URL,
    offers: { "@type": "Offer", price: "0", priceCurrency: "MYR" },
    description: TRANSLATIONS.ms.intro,
    featureList: TRANSLATIONS.ms.features.map((f) => f.title),
  };

  return (
    <div className="min-h-screen bg-bg">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="mx-auto max-w-5xl px-5 py-10 sm:py-14">
        <div className="mb-8 flex items-center justify-between gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-accent hover:underline"
          >
            {t.backHome}
          </Link>
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as "ms" | "en")}
            aria-label="Language / Bahasa"
            className="rounded-lg border border-border bg-panel px-3 py-2 text-sm outline-none focus:border-accent"
          >
            <option value="ms">Bahasa Melayu</option>
            <option value="en">English</option>
          </select>
        </div>

        {/* Hero */}
        <section className="relative overflow-hidden rounded-3xl border border-emerald-900/30 bg-gradient-to-br from-emerald-950 via-emerald-900 to-emerald-800 px-6 py-10 text-emerald-50 shadow-xl sm:px-10 sm:py-12">
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                "radial-gradient(circle at 85% 15%, #f3dd94 0, transparent 42%), radial-gradient(circle at 12% 90%, #34d399 0, transparent 45%)",
            }}
          />
          <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center">
            <Image
              src={icon}
              alt="Ikon Pengurus Bayaran"
              width={112}
              height={112}
              priority
              className="h-24 w-24 shrink-0 rounded-2xl shadow-lg ring-1 ring-amber-300/50 sm:h-28 sm:w-28"
            />
            <div>
              <p className="text-xs font-semibold tracking-[0.22em] text-amber-300 uppercase">
                {t.kicker}
              </p>
              <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                {t.title}
              </h1>
              <p className="mt-2 text-lg text-emerald-100 sm:text-xl">{t.tagline}</p>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-emerald-100/80">
                {t.intro}
              </p>
            </div>
          </div>

          <div className="relative mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
            <a
              href={APP_URL}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-md transition-colors hover:bg-amber-200"
            >
              {t.cta} →
            </a>
            <Link
              href="/privacy"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-emerald-100/40 px-5 py-3 text-sm font-medium text-emerald-50 transition-colors hover:bg-white/10"
            >
              <ShieldCheck size={16} />
              {t.privacy}
            </Link>
          </div>
          <p className="relative mt-4 text-xs text-emerald-100/70">{t.ctaNote}</p>

          <ul className="relative mt-6 flex flex-wrap gap-2">
            {t.badges.map((b) => (
              <li
                key={b}
                className="inline-flex items-center gap-1.5 rounded-full border border-emerald-100/25 bg-emerald-950/30 px-3 py-1 text-xs text-emerald-50"
              >
                <Check size={12} className="text-amber-300" />
                {b}
              </li>
            ))}
          </ul>
        </section>

        {/* Dashboard screenshot */}
        <figure className="mt-10">
          <div className="overflow-hidden rounded-2xl border border-border bg-panel p-2 shadow-sm">
            <Image
              src={dashboardShot}
              alt={t.shotAlt}
              sizes="(max-width: 1024px) 100vw, 960px"
              className="h-auto w-full rounded-xl"
            />
          </div>
          <figcaption className="mt-3 text-center text-sm text-muted">
            {t.shotCaption}
          </figcaption>
        </figure>

        {/* Features */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{t.featuresTitle}</h2>
          <p className="mt-2 text-muted">{t.featuresSubtitle}</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {t.features.map((f, i) => {
              const Icon = FEATURE_ICONS[i];
              return (
                <div
                  key={f.title}
                  className="rounded-xl border border-border bg-panel p-5"
                >
                  <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-emerald-700/10 text-emerald-700 dark:bg-emerald-400/10 dark:text-emerald-300">
                    <Icon size={20} />
                  </div>
                  <h3 className="font-semibold">{f.title}</h3>
                  <p className="mt-1 text-sm text-muted">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Steps */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{t.stepsTitle}</h2>
          <ol className="mt-6 grid gap-4 sm:grid-cols-3">
            {t.steps.map((s, i) => (
              <li key={s.title} className="rounded-xl border border-border bg-panel p-5">
                <div className="mb-3 grid h-8 w-8 place-items-center rounded-full bg-emerald-800 font-semibold text-amber-200">
                  {i + 1}
                </div>
                <h3 className="font-semibold">{s.title}</h3>
                <p className="mt-1 text-sm text-muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </section>

        {/* Gallery */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{t.galleryTitle}</h2>
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            {t.gallery.map((g) => (
              <figure key={g.caption}>
                <div className="overflow-hidden rounded-2xl border border-border bg-panel p-2 shadow-sm">
                  <Image
                    src={g.src}
                    alt={g.alt}
                    sizes="(max-width: 640px) 100vw, 460px"
                    className="h-auto w-full rounded-xl"
                  />
                </div>
                <figcaption className="mt-2 text-sm text-muted">{g.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* FAQ */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold tracking-tight">{t.faqTitle}</h2>
          <div className="mt-6 divide-y divide-border rounded-xl border border-border bg-panel">
            {t.faq.map((item) => (
              <details key={item.q} className="group px-5 py-4">
                <summary className="cursor-pointer list-none font-medium marker:hidden">
                  <span className="flex items-start justify-between gap-4">
                    {item.q}
                    <span className="mt-0.5 text-muted transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{item.a}</p>
              </details>
            ))}
          </div>
        </section>

        {/* Final CTA */}
        <section className="mt-16 rounded-2xl border border-emerald-900/30 bg-gradient-to-br from-emerald-900 to-emerald-800 px-6 py-10 text-center text-emerald-50">
          <h2 className="text-2xl font-bold tracking-tight">{t.finalTitle}</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-emerald-100/80">
            {t.finalDesc}
          </p>
          <a
            href={APP_URL}
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl bg-amber-300 px-6 py-3 text-sm font-semibold text-emerald-950 shadow-md transition-colors hover:bg-amber-200"
          >
            {t.cta} →
          </a>
        </section>

        <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted">
          <p>
            <Link href="/privacy" className="text-accent hover:underline">
              {t.privacy}
            </Link>
            <span className="mx-2">·</span>
            {t.footerNote}
          </p>
          <p className="mx-auto mt-3 max-w-2xl text-xs">{t.credit}</p>
          <p className="mt-2 text-xs">
            <Link href="/" className="text-accent hover:underline">
              {t.backHome.replace("← ", "")}
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

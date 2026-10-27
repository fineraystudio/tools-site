import type { Metadata } from "next";

// Project page lives at https://fineraystudio.github.io/tools-site/
const SITE_URL = "https://fineraystudio.github.io/tools-site";
const PAGE_URL = `${SITE_URL}/pengurus-bayaran/`;
const OG_IMAGE = `${SITE_URL}/pengurus-bayaran/og-card.png`;
const TITLE = "Pengurus Bayaran — Rekod Bil Bulanan & Kalkulator Zakat";
const DESCRIPTION =
  "Urus bayaran bulanan anda dengan mudah. Rekod bil dan komitmen dalam Bahasa Melayu, dengan kalkulator zakat, kalendar Hijrah dan jumlah RM. Percuma, tiada akaun, data kekal dalam peranti anda.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  keywords: [
    "pengurus bayaran",
    "rekod bayaran bulanan",
    "pengesan bil",
    "kalkulator zakat",
    "zakat simpanan",
    "kalendar hijrah",
    "payment tracker Bahasa Melayu",
    "expense tracker Malaysia",
  ],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    type: "website",
    url: PAGE_URL,
    siteName: "Alat Percuma",
    locale: "ms_MY",
    title: TITLE,
    description: DESCRIPTION,
    images: [{ url: OG_IMAGE, width: 1200, height: 630, alt: "Pengurus Bayaran" }],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [OG_IMAGE],
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

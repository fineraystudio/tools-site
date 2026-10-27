import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penjana Kod QR — Free QR Code Generator",
  description:
    "Jana kod QR percuma untuk teks, pautan, WiFi atau nombor telefon. Muat turun PNG. Free QR code generator, no sign-up, made in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

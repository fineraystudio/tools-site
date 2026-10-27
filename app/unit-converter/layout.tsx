import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Penukar Unit — Free Unit Converter",
  description:
    "Tukar panjang, berat, suhu dan isipadu antara unit metrik dan imperial. Free online unit converter, works offline in your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

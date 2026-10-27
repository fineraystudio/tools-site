import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gabung PDF — Free Online PDF Merge",
  description:
    "Gabung beberapa fail PDF jadi satu dokumen, susun semula halaman, muat turun. Merge PDF files online free — files never leave your browser.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

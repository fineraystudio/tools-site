import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kompres Gambar — Free Image Compressor",
  description:
    "Kecilkan saiz gambar JPG dan PNG tanpa hilang kualiti. Compress images online free — everything runs in your browser, no uploads.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

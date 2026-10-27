import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dasar Privasi — Privacy Policy",
  description:
    "Semua alat diproses dalam pelayar anda. No uploads, no tracking, no accounts.",
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}

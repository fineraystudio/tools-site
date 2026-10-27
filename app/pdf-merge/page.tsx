"use client";

import Link from "next/link";
import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { ArrowDown, ArrowUp, X } from "lucide-react";
import { Button, Dropzone, Panel } from "@/components/ui";
import { download, formatBytes } from "@/lib/utils";

type Item = { id: string; file: File; pages: number };

const TRANSLATIONS = {
  en: {
    title: "PDF Merge",
    subtitle: "Combine multiple PDF files into one document — free and private",
    addHint: "Add two or more PDFs, then drag them into the order you want",
    pages: "page",
    pagesPlural: "pages",
    files: "files",
    totalPages: "pages total",
    mergeDL: "Merge & download",
    merging: "Merging…",
    clear: "Clear",
    errorRead: "Could not read",
    errorProtected: "It may be password protected.",
  },
  ms: {
    title: "Gabung PDF",
    subtitle: "Gabungkan beberapa fail PDF menjadi satu dokumen — percuma dan peribadi",
    addHint: "Tambah dua atau lebih PDF, kemudian susun mengikut urutan yang anda mahu",
    pages: "halaman",
    pagesPlural: "halaman",
    files: "fail",
    totalPages: "jumlah halaman",
    mergeDL: "Gabung & muat turun",
    merging: "Menggabung…",
    clear: "Kosongkan",
    errorRead: "Tidak dapat membaca",
    errorProtected: "Ia mungkin dilindungi kata laluan.",
  },
};

export default function Page() {
  const [lang, setLang] = useState<"en" | "ms">("en");
  const t = TRANSLATIONS[lang];

  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  const add = async (files: File[]) => {
    setError("");
    const next: Item[] = [];
    for (const f of files) {
      if (f.type !== "application/pdf" && !f.name.toLowerCase().endsWith(".pdf")) continue;
      try {
        const doc = await PDFDocument.load(await f.arrayBuffer(), {
          ignoreEncryption: true,
        });
        next.push({ id: `${f.name}-${Math.random()}`, file: f, pages: doc.getPageCount() });
      } catch {
        setError(`${t.errorRead} "${f.name}". ${t.errorProtected}`);
      }
    }
    setItems((p) => [...p, ...next]);
  };

  const move = (i: number, dir: -1 | 1) => {
    setItems((p) => {
      const next = [...p];
      const j = i + dir;
      if (j < 0 || j >= next.length) return p;
      [next[i], next[j]] = [next[j], next[i]];
      return next;
    });
  };

  const merge = async () => {
    setBusy(true);
    setError("");
    try {
      const out = await PDFDocument.create();
      for (const it of items) {
        const src = await PDFDocument.load(await it.file.arrayBuffer(), {
          ignoreEncryption: true,
        });
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      const bytes = await out.save();
      download(new Blob([bytes as BlobPart], { type: "application/pdf" }), "merged.pdf");
    } catch (e) {
      setError((e as Error).message);
    }
    setBusy(false);
  };

  const totalPages = items.reduce((a, i) => a + i.pages, 0);

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8">
      <header className="mb-7 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{t.title}</h1>
          <p className="mt-1 text-sm text-muted">{t.subtitle}</p>
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

      <Panel className="mb-4">
        <Dropzone
          multiple
          accept="application/pdf"
          onFiles={add}
          hint={t.addHint}
        />
        {error ? <div className="mt-3 text-sm text-err">{error}</div> : null}
      </Panel>

      {items.length > 0 ? (
        <>
          <div className="mb-4 grid gap-2">
            {items.map((it, i) => (
              <Panel key={it.id} className="flex flex-wrap items-center gap-3 py-3">
                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-md bg-panel-2 font-mono text-xs">
                  {i + 1}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-medium">{it.file.name}</div>
                  <div className="text-xs text-muted">
                    {it.pages} {it.pages === 1 ? t.pages : t.pagesPlural} · {formatBytes(it.file.size)}
                  </div>
                </div>
                <Button size="sm" onClick={() => move(i, -1)} disabled={i === 0}>
                  <ArrowUp size={13} />
                </Button>
                <Button
                  size="sm"
                  onClick={() => move(i, 1)}
                  disabled={i === items.length - 1}
                >
                  <ArrowDown size={13} />
                </Button>
                <Button
                  size="sm"
                  onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))}
                >
                  <X size={13} />
                </Button>
              </Panel>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button variant="primary" onClick={merge} disabled={busy || items.length < 1}>
              {busy ? t.merging : t.mergeDL}
            </Button>
            <Button onClick={() => setItems([])}>{t.clear}</Button>
            <span className="text-sm text-muted">
              {items.length} {t.files} · {totalPages} {t.totalPages}
            </span>
          </div>
        </>
      ) : null}

      <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          {lang === "en"
            ? "All processing happens in your browser. No data is sent to any server."
            : "Semua pemprosesan berlaku dalam pelayar anda. Tiada data dihantar ke mana-mana pelayan."}
        </p>
        <p className="mt-2">
          <Link href="/privacy" className="text-accent hover:underline">
            {lang === "en" ? "Privacy Policy" : "Dasar Privasi"}
          </Link>
        </p>
      </footer>
    </div>
  );
}

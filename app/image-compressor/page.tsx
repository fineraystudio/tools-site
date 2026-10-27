"use client";

import Link from "next/link";
import { useCallback, useRef, useState } from "react";
import { X } from "lucide-react";
import { Button, Dropzone, Field, Input, Panel, Select } from "@/components/ui";
import {
  canvasToBlob,
  download,
  formatBytes,
  loadImage,
  readAsDataURL,
  stripExtension,
} from "@/lib/utils";

type Item = {
  id: string;
  file: File;
  url: string;
  out?: { blob: Blob; url: string };
};

const TRANSLATIONS = {
  en: {
    title: "Image Compressor",
    subtitle: "Compress images for free — reduce file size, keep quality",
    addHint: "Drop as many images as you like — nothing is uploaded",
    quality: "Quality",
    outputFormat: "Output format",
    maxDimension: "Max dimension",
    maxDimHint: "px, longest side",
    compress: "Compress",
    compressing: "Compressing…",
    downloadAll: "Download all",
    clear: "Clear",
    formatJPEG: "JPEG (smallest)",
    formatWebP: "WebP",
    formatPNG: "PNG (lossless)",
    download: "Download",
  },
  ms: {
    title: "Kompres Gambar",
    subtitle: "Kompres gambar percuma — kurangkan saiz fail, kekalkan kualiti",
    addHint: "Lepaskan berapa banyak gambar yang anda suka — tiada dimuat naik",
    quality: "Kualiti",
    outputFormat: "Format output",
    maxDimension: "Dimensi maksimum",
    maxDimHint: "px, sisi terpanjang",
    compress: "Kompres",
    compressing: "Mengompres…",
    downloadAll: "Muat turun semua",
    clear: "Kosongkan",
    formatJPEG: "JPEG (terkecil)",
    formatWebP: "WebP",
    formatPNG: "PNG (tanpa kehilangan)",
    download: "Muat turun",
  },
};

export default function Page() {
  const [lang, setLang] = useState<"en" | "ms">("en");
  const t = TRANSLATIONS[lang];

  const [items, setItems] = useState<Item[]>([]);
  const [quality, setQuality] = useState(0.7);
  const [format, setFormat] = useState("image/jpeg");
  const [maxDim, setMaxDim] = useState(2400);
  const [busy, setBusy] = useState(false);
  const seq = useRef(0);

  const addFiles = async (files: File[]) => {
    const next: Item[] = [];
    for (const f of files) {
      if (!f.type.startsWith("image/")) continue;
      next.push({ id: `c${seq.current++}`, file: f, url: await readAsDataURL(f) });
    }
    setItems((p) => [...p, ...next]);
  };

  const compress = useCallback(async () => {
    setBusy(true);
    const done: Item[] = [];
    for (const it of items) {
      const img = await loadImage(it.url);
      const scale = Math.min(1, maxDim / Math.max(img.naturalWidth, img.naturalHeight));
      const canvas = document.createElement("canvas");
      canvas.width = Math.max(1, Math.round(img.naturalWidth * scale));
      canvas.height = Math.max(1, Math.round(img.naturalHeight * scale));
      const ctx = canvas.getContext("2d")!;
      ctx.imageSmoothingQuality = "high";
      if (format === "image/jpeg") {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      const blob = await canvasToBlob(canvas, format, quality);
      done.push({ ...it, out: { blob, url: URL.createObjectURL(blob) } });
    }
    setItems(done);
    setBusy(false);
  }, [items, quality, format, maxDim]);

  const totalIn = items.reduce((a, i) => a + i.file.size, 0);
  const totalOut = items.reduce((a, i) => a + (i.out?.blob.size ?? 0), 0);
  const saved = totalIn && totalOut ? 1 - totalOut / totalIn : 0;
  const ext = format.split("/")[1].replace("jpeg", "jpg");

  return (
    <div className="mx-auto w-full max-w-5xl px-5 py-8">
      <header className="mb-8 flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">{t.title}</h1>
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

      <Panel className="mb-4">
        <Dropzone multiple accept="image/*" onFiles={addFiles} hint={t.addHint} />
      </Panel>

      {items.length > 0 ? (
        <>
          <Panel className="mb-4">
            <div className="grid items-end gap-4 sm:grid-cols-3">
              <Field label={t.quality} hint={`${Math.round(quality * 100)}%`}>
                <input
                  type="range"
                  min={0.1}
                  max={1}
                  step={0.05}
                  value={quality}
                  onChange={(e) => setQuality(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </Field>
              <Field label={t.outputFormat}>
                <Select value={format} onChange={(e) => setFormat(e.target.value)}>
                  <option value="image/jpeg">{t.formatJPEG}</option>
                  <option value="image/webp">{t.formatWebP}</option>
                  <option value="image/png">{t.formatPNG}</option>
                </Select>
              </Field>
              <Field label={t.maxDimension} hint={t.maxDimHint}>
                <Input
                  type="number"
                  min={100}
                  value={maxDim}
                  onChange={(e) => setMaxDim(Number(e.target.value))}
                />
              </Field>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <Button variant="primary" onClick={compress} disabled={busy}>
                {busy ? t.compressing : t.compress}
              </Button>
              <Button
                disabled={!items.some((i) => i.out)}
                onClick={() =>
                  items.forEach((i, idx) => {
                    if (!i.out) return;
                    setTimeout(
                      () =>
                        download(i.out!.blob, `${stripExtension(i.file.name)}-min.${ext}`),
                      idx * 250,
                    );
                  })
                }
              >
                {t.downloadAll}
              </Button>
              <Button onClick={() => setItems([])}>{t.clear}</Button>
              {totalOut ? (
                <span className="ml-auto text-sm">
                  {formatBytes(totalIn)} → {formatBytes(totalOut)}{" "}
                  <span className={saved > 0 ? "text-ok" : "text-warn"}>
                    ({saved > 0 ? "−" : "+"}
                    {Math.abs(Math.round(saved * 100))}%)
                  </span>
                </span>
              ) : null}
            </div>
          </Panel>

          <div className="grid gap-3">
            {items.map((it) => {
              const pct = it.out ? 1 - it.out.blob.size / it.file.size : 0;
              return (
                <Panel key={it.id} className="flex flex-wrap items-center gap-4">
                  <div className="grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-lg border border-border bg-panel-2">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={it.out?.url ?? it.url}
                      alt=""
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="truncate text-sm font-medium">{it.file.name}</div>
                    <div className="text-xs text-muted">
                      {formatBytes(it.file.size)}
                      {it.out ? (
                        <>
                          {" → "}
                          <span className="text-ok">{formatBytes(it.out.blob.size)}</span>{" "}
                          ({pct > 0 ? "−" : "+"}
                          {Math.abs(Math.round(pct * 100))}%)
                        </>
                      ) : null}
                    </div>
                  </div>
                  {it.out ? (
                    <Button
                      size="sm"
                      onClick={() =>
                        download(it.out!.blob, `${stripExtension(it.file.name)}-min.${ext}`)
                      }
                    >
                      {t.download}
                    </Button>
                  ) : null}
                  <button
                    onClick={() => setItems((p) => p.filter((x) => x.id !== it.id))}
                    className="grid h-8 w-8 cursor-pointer place-items-center rounded-md border border-border text-muted hover:text-fg"
                  >
                    <X size={14} />
                  </button>
                </Panel>
              );
            })}
          </div>
        </>
      ) : null}

      <footer className="mt-8 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          <Link href="/privacy" className="text-accent hover:underline">
            {lang === "en" ? "Privacy Policy" : "Dasar Privasi"}
          </Link>
        </p>
        <p className="mt-2">
          {lang === "en"
            ? "All processing happens in your browser — no uploads, completely private."
            : "Semua pemprosesan berlaku dalam pelayar anda — tiada muat naik, sepenuhnya peribadi."}
        </p>
      </footer>
    </div>
  );
}

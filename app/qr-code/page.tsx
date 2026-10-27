"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import QRCode from "qrcode";
import { Button, Field, Input, Panel, Select, Tabs, Textarea } from "@/components/ui";
import { download } from "@/lib/utils";

type Mode = "text" | "url" | "wifi" | "vcard";

const TRANSLATIONS = {
  en: {
    title: "QR Code Generator",
    subtitle: "Create QR codes for free — text, links, Wi-Fi, and contact cards",
    text: "Text",
    url: "Link",
    wifi: "Wi-Fi",
    contact: "Contact",
    textLabel: "Text",
    urlLabel: "URL",
    networkName: "Network name (SSID)",
    password: "Password",
    security: "Security",
    hiddenNetwork: "Hidden network",
    fullName: "Full name",
    organisation: "Organisation",
    jobTitle: "Job title",
    phone: "Phone",
    email: "Email",
    website: "Website",
    appearance: "Appearance",
    size: "Size",
    quietZone: "Quiet zone",
    errorCorrection: "Error correction",
    foreground: "Foreground",
    background: "Background",
    preview: "Preview",
    nothing: "Nothing to encode yet",
    downloadPNG: "Download PNG",
    downloadSVG: "Download SVG",
    charactersEncoded: "characters encoded",
  },
  ms: {
    title: "Penjana Kod QR",
    subtitle: "Cipta kod QR percuma — teks, pautan, Wi-Fi, dan kad kenalan",
    text: "Teks",
    url: "Pautan",
    wifi: "Wi-Fi",
    contact: "Kenalan",
    textLabel: "Teks",
    urlLabel: "URL",
    networkName: "Nama rangkaian (SSID)",
    password: "Kata laluan",
    security: "Keselamatan",
    hiddenNetwork: "Rangkaian tersembunyi",
    fullName: "Nama penuh",
    organisation: "Organisasi",
    jobTitle: "Jawatan",
    phone: "Telefon",
    email: "E-mel",
    website: "Laman web",
    appearance: "Rupa",
    size: "Saiz",
    quietZone: "Zon senyap",
    errorCorrection: "Pembetulan ralat",
    foreground: "Latar depan",
    background: "Latar belakang",
    preview: "Pratonton",
    nothing: "Tiada apa untuk dikod lagi",
    downloadPNG: "Muat turun PNG",
    downloadSVG: "Muat turun SVG",
    charactersEncoded: "aksara dikod",
  },
};

export default function Page() {
  const [lang, setLang] = useState<"en" | "ms">("en");
  const t = TRANSLATIONS[lang];

  const [mode, setMode] = useState<Mode>("text");
  const [text, setText] = useState("Hello from Tools");
  const [url, setUrl] = useState("https://example.com");
  const [wifi, setWifi] = useState({ ssid: "", password: "", type: "WPA", hidden: false });
  const [card, setCard] = useState({
    name: "",
    org: "",
    title: "",
    phone: "",
    email: "",
    website: "",
  });

  const [size, setSize] = useState(512);
  const [margin, setMargin] = useState(2);
  const [ecc, setEcc] = useState<"L" | "M" | "Q" | "H">("M");
  const [dark, setDark] = useState("#000000");
  const [light, setLight] = useState("#ffffff");

  const [png, setPng] = useState("");
  const [svg, setSvg] = useState("");
  const [error, setError] = useState("");

  const payload = useMemo(() => {
    const esc = (s: string) => s.replace(/([\;,:"])/g, "\\$1");
    switch (mode) {
      case "text":
        return text;
      case "url":
        return url;
      case "wifi":
        return `WIFI:T:${wifi.type};S:${esc(wifi.ssid)};P:${esc(wifi.password)};${
          wifi.hidden ? "H:true;" : ""
        };`;
      case "vcard":
        return [
          "BEGIN:VCARD",
          "VERSION:3.0",
          `N:${card.name}`,
          `FN:${card.name}`,
          card.org ? `ORG:${card.org}` : "",
          card.title ? `TITLE:${card.title}` : "",
          card.phone ? `TEL;TYPE=CELL:${card.phone}` : "",
          card.email ? `EMAIL:${card.email}` : "",
          card.website ? `URL:${card.website}` : "",
          "END:VCARD",
        ]
          .filter(Boolean)
          .join("\n");
    }
  }, [mode, text, url, wifi, card]);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      if (!payload.trim()) {
        setPng("");
        setSvg("");
        setError("");
        return;
      }
      try {
        const opts = {
          width: size,
          margin,
          errorCorrectionLevel: ecc,
          color: { dark, light },
        } as const;
        const [p, s] = await Promise.all([
          QRCode.toDataURL(payload, opts),
          QRCode.toString(payload, { ...opts, type: "svg" }),
        ]);
        if (cancelled) return;
        setPng(p);
        setSvg(s);
        setError("");
      } catch (e) {
        if (!cancelled) {
          setError((e as Error).message);
          setPng("");
          setSvg("");
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [payload, size, margin, ecc, dark, light]);

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

      <div className="mb-4">
        <Tabs
          value={mode}
          onChange={setMode}
          options={[
            { value: "text", label: t.text },
            { value: "url", label: t.url },
            { value: "wifi", label: t.wifi },
            { value: "vcard", label: t.contact },
          ]}
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="grid gap-4">
          <Panel>
            {mode === "text" ? (
              <Field label={t.textLabel}>
                <Textarea
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  className="min-h-32"
                />
              </Field>
            ) : null}

            {mode === "url" ? (
              <Field label={t.urlLabel}>
                <Input value={url} onChange={(e) => setUrl(e.target.value)} />
              </Field>
            ) : null}

            {mode === "wifi" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t.networkName}>
                  <Input
                    value={wifi.ssid}
                    onChange={(e) => setWifi({ ...wifi, ssid: e.target.value })}
                  />
                </Field>
                <Field label={t.password}>
                  <Input
                    value={wifi.password}
                    onChange={(e) => setWifi({ ...wifi, password: e.target.value })}
                  />
                </Field>
                <Field label={t.security}>
                  <Select
                    value={wifi.type}
                    onChange={(e) => setWifi({ ...wifi, type: e.target.value })}
                  >
                    <option value="WPA">WPA / WPA2</option>
                    <option value="WEP">WEP</option>
                    <option value="nopass">{lang === "en" ? "Open" : "Terbuka"}</option>
                  </Select>
                </Field>
                <label className="flex items-end gap-2 pb-2 text-sm text-muted">
                  <input
                    type="checkbox"
                    checked={wifi.hidden}
                    onChange={(e) => setWifi({ ...wifi, hidden: e.target.checked })}
                    className="accent-[var(--accent)]"
                  />
                  {t.hiddenNetwork}
                </label>
              </div>
            ) : null}

            {mode === "vcard" ? (
              <div className="grid gap-3 sm:grid-cols-2">
                <Field label={t.fullName}>
                  <Input
                    value={card.name}
                    onChange={(e) => setCard({ ...card, name: e.target.value })}
                  />
                </Field>
                <Field label={t.organisation}>
                  <Input
                    value={card.org}
                    onChange={(e) => setCard({ ...card, org: e.target.value })}
                  />
                </Field>
                <Field label={t.jobTitle}>
                  <Input
                    value={card.title}
                    onChange={(e) => setCard({ ...card, title: e.target.value })}
                  />
                </Field>
                <Field label={t.phone}>
                  <Input
                    value={card.phone}
                    onChange={(e) => setCard({ ...card, phone: e.target.value })}
                  />
                </Field>
                <Field label={t.email}>
                  <Input
                    value={card.email}
                    onChange={(e) => setCard({ ...card, email: e.target.value })}
                  />
                </Field>
                <Field label={t.website}>
                  <Input
                    value={card.website}
                    onChange={(e) => setCard({ ...card, website: e.target.value })}
                  />
                </Field>
              </div>
            ) : null}
          </Panel>

          <Panel>
            <div className="mb-3 text-sm font-medium">{t.appearance}</div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field label={t.size} hint={`${size}px`}>
                <input
                  type="range"
                  min={128}
                  max={1024}
                  step={32}
                  value={size}
                  onChange={(e) => setSize(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </Field>
              <Field label={t.quietZone} hint={`${margin} ${lang === "en" ? "modules" : "modul"}`}>
                <input
                  type="range"
                  min={0}
                  max={8}
                  value={margin}
                  onChange={(e) => setMargin(Number(e.target.value))}
                  className="w-full accent-[var(--accent)]"
                />
              </Field>
              <Field label={t.errorCorrection}>
                <Select value={ecc} onChange={(e) => setEcc(e.target.value as "L")}>
                  <option value="L">L — 7% {lang === "en" ? "recovery" : "pemulihan"}</option>
                  <option value="M">M — 15% {lang === "en" ? "recovery" : "pemulihan"}</option>
                  <option value="Q">Q — 25% {lang === "en" ? "recovery" : "pemulihan"}</option>
                  <option value="H">H — 30% {lang === "en" ? "recovery" : "pemulihan"}</option>
                </Select>
              </Field>
              <div className="flex gap-3">
                <Field label={t.foreground}>
                  <input
                    type="color"
                    value={dark}
                    onChange={(e) => setDark(e.target.value)}
                    className="h-9 w-full cursor-pointer rounded-lg border border-border bg-panel p-1"
                  />
                </Field>
                <Field label={t.background}>
                  <input
                    type="color"
                    value={light}
                    onChange={(e) => setLight(e.target.value)}
                    className="h-9 w-full cursor-pointer rounded-lg border border-border bg-panel p-1"
                  />
                </Field>
              </div>
            </div>
          </Panel>
        </div>

        <Panel className="h-fit">
          <div className="mb-3 text-sm font-medium">{t.preview}</div>
          <div className="grid place-items-center rounded-lg border border-border bg-panel-2 p-4">
            {png ? (
              <img src={png} alt="QR code" className="w-full max-w-64" />
            ) : (
              <div className="py-16 text-sm text-muted">{t.nothing}</div>
            )}
          </div>
          {error ? <div className="mt-2 text-sm text-err">{error}</div> : null}
          <div className="mt-3 grid gap-2">
            <Button
              variant="primary"
              disabled={!png}
              onClick={() => {
                const a = document.createElement("a");
                a.href = png;
                a.download = "qr-code.png";
                a.click();
              }}
            >
              {t.downloadPNG}
            </Button>
            <Button
              disabled={!svg}
              onClick={() => download(svg, "qr-code.svg", "image/svg+xml")}
            >
              {t.downloadSVG}
            </Button>
          </div>
          <p className="mt-3 text-xs text-muted">
            {payload.length} {t.charactersEncoded}
          </p>
        </Panel>
      </div>

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

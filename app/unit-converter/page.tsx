"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowLeftRight } from "lucide-react";
import { Button, Chip, Field, Input, Panel, Select } from "@/components/ui";

type Units = Record<string, number>;

const CATEGORIES: Record<string, Units> = {
  Length: {
    Millimetre: 0.001,
    Centimetre: 0.01,
    Metre: 1,
    Kilometre: 1000,
    Inch: 0.0254,
    Foot: 0.3048,
    Yard: 0.9144,
    Mile: 1609.344,
    "Nautical mile": 1852,
  },
  Mass: {
    Milligram: 1e-6,
    Gram: 0.001,
    Kilogram: 1,
    Tonne: 1000,
    Ounce: 0.028349523125,
    Pound: 0.45359237,
    Stone: 6.35029318,
  },
  Area: {
    "Square metre": 1,
    "Square kilometre": 1e6,
    "Square foot": 0.09290304,
    "Square yard": 0.83612736,
    Acre: 4046.8564224,
    Hectare: 10000,
  },
  Volume: {
    Millilitre: 0.001,
    Litre: 1,
    "Cubic metre": 1000,
    "Teaspoon (US)": 0.00492892159375,
    "Tablespoon (US)": 0.01478676478125,
    "Cup (US)": 0.2365882365,
    "Pint (US)": 0.473176473,
    "Gallon (US)": 3.785411784,
    "Gallon (UK)": 4.54609,
  },
  Speed: {
    "Metre / second": 1,
    "Kilometre / hour": 0.277777778,
    "Mile / hour": 0.44704,
    Knot: 0.514444444,
  },
  Time: {
    Millisecond: 0.001,
    Second: 1,
    Minute: 60,
    Hour: 3600,
    Day: 86400,
    Week: 604800,
    Year: 31557600,
  },
  "Data size": {
    Byte: 1,
    Kilobyte: 1000,
    Kibibyte: 1024,
    Megabyte: 1e6,
    Mebibyte: 1024 ** 2,
    Gigabyte: 1e9,
    Gibibyte: 1024 ** 3,
    Terabyte: 1e12,
    Tebibyte: 1024 ** 4,
  },
};

const TEMPS = ["Celsius", "Fahrenheit", "Kelvin"] as const;
type Temp = (typeof TEMPS)[number];

function tempConvert(v: number, from: Temp, to: Temp) {
  const c = from === "Celsius" ? v : from === "Fahrenheit" ? ((v - 32) * 5) / 9 : v - 273.15;
  if (to === "Celsius") return c;
  if (to === "Fahrenheit") return (c * 9) / 5 + 32;
  return c + 273.15;
}

function pretty(n: number) {
  if (!Number.isFinite(n)) return "—";
  if (n !== 0 && (Math.abs(n) < 1e-6 || Math.abs(n) >= 1e12)) return n.toExponential(6);
  return String(Number(n.toPrecision(10)));
}

const TRANSLATIONS = {
  en: {
    title: "Unit Converter",
    subtitle: "Convert between units of length, mass, volume, and more",
    value: "Value",
    from: "From",
    to: "To",
    result: "Result",
    inEveryUnit: "in every unit",
    Length: "Length",
    Mass: "Mass",
    Area: "Area",
    Volume: "Volume",
    Speed: "Speed",
    Time: "Time",
    "Data size": "Data size",
    Temperature: "Temperature",
  },
  ms: {
    title: "Penukar Unit",
    subtitle: "Tukar antara unit panjang, jisim, isipadu, dan lain-lain",
    value: "Nilai",
    from: "Dari",
    to: "Kepada",
    result: "Hasil",
    inEveryUnit: "dalam setiap unit",
    Length: "Panjang",
    Mass: "Jisim",
    Area: "Luas",
    Volume: "Isipadu",
    Speed: "Kelajuan",
    Time: "Masa",
    "Data size": "Saiz data",
    Temperature: "Suhu",
  },
};

export default function Page() {
  const [lang, setLang] = useState<"en" | "ms">("en");
  const t = TRANSLATIONS[lang];

  const names = [...Object.keys(CATEGORIES), "Temperature"];
  const [category, setCategory] = useState("Length");
  const [value, setValue] = useState("1");
  const [from, setFrom] = useState("Metre");
  const [to, setTo] = useState("Foot");

  const unitNames = useMemo(
    () => (category === "Temperature" ? [...TEMPS] : Object.keys(CATEGORIES[category])),
    [category],
  );

  const chooseCategory = (c: string) => {
    const names = c === "Temperature" ? [...TEMPS] : Object.keys(CATEGORIES[c]);
    setCategory(c);
    setFrom(names[0]);
    setTo(names[1] ?? names[0]);
  };

  const num = parseFloat(value);
  const result = useMemo(() => {
    if (!Number.isFinite(num)) return NaN;
    if (category === "Temperature") return tempConvert(num, from as Temp, to as Temp);
    const units = CATEGORIES[category];
    if (!units[from] || !units[to]) return NaN;
    return (num * units[from]) / units[to];
  }, [num, category, from, to]);

  const allConversions = useMemo(() => {
    if (!Number.isFinite(num)) return [];
    return unitNames.map((u) => {
      const v =
        category === "Temperature"
          ? tempConvert(num, from as Temp, u as Temp)
          : (num * CATEGORIES[category][from]) / CATEGORIES[category][u];
      return [u, v] as const;
    });
  }, [num, unitNames, category, from]);

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

      <div className="mb-4 flex flex-wrap gap-2">
        {names.map((c) => (
          <Chip key={c} active={category === c} onClick={() => chooseCategory(c)}>
            {t[c as keyof typeof t] || c}
          </Chip>
        ))}
      </div>

      <Panel className="mb-4">
        <div className="grid items-end gap-3 sm:grid-cols-[1fr_auto_1fr]">
          <div className="grid gap-3">
            <Field label={t.value}>
              <Input
                type="number"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </Field>
            <Field label={t.from}>
              <Select value={from} onChange={(e) => setFrom(e.target.value)}>
                {unitNames.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </Select>
            </Field>
          </div>

          <Button
            className="mb-1 self-end"
            onClick={() => {
              setFrom(to);
              setTo(from);
            }}
            aria-label="Swap units"
          >
            <ArrowLeftRight size={15} />
          </Button>

          <div className="grid gap-3">
            <Field label={t.result}>
              <div className="flex h-9 items-center rounded-lg border border-border bg-panel-2 px-3 font-mono text-sm">
                {pretty(result)}
              </div>
            </Field>
            <Field label={t.to}>
              <Select value={to} onChange={(e) => setTo(e.target.value)}>
                {unitNames.map((u) => (
                  <option key={u}>{u}</option>
                ))}
              </Select>
            </Field>
          </div>
        </div>
      </Panel>

      <Panel>
        <div className="mb-3 text-sm font-medium">
          {value || 0} {from} {t.inEveryUnit}
        </div>
        <div className="grid gap-x-6 gap-y-1.5 sm:grid-cols-2 lg:grid-cols-3">
          {allConversions.map(([u, v]) => (
            <div
              key={u}
              className="flex items-baseline justify-between gap-3 border-b border-border py-1.5 text-sm"
            >
              <span className="text-muted">{u}</span>
              <span className="font-mono">{pretty(v)}</span>
            </div>
          ))}
        </div>
      </Panel>

      <footer className="mt-12 border-t border-border pt-6 text-center text-sm text-muted">
        <p>
          {lang === "en"
            ? "All calculations happen in your browser. No data is sent to any server."
            : "Semua pengiraan berlaku dalam pelayar anda. Tiada data dihantar ke mana-mana pelayan."}
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

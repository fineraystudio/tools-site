"use client";

import React, { useCallback, useRef, useState } from "react";
import { Check, Copy, Download, UploadCloud } from "lucide-react";

export function cx(...parts: (string | false | null | undefined)[]) {
  return parts.filter(Boolean).join(" ");
}

/* ---------------------------------- Button --------------------------------- */

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "outline" | "danger";
  size?: "sm" | "md";
};

export function Button({
  variant = "outline",
  size = "md",
  className,
  ...rest
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap cursor-pointer";
  const sizes = { sm: "h-8 px-2.5 text-xs", md: "h-9 px-3.5 text-sm" }[size];
  const variants = {
    primary: "bg-accent text-accent-fg hover:opacity-90",
    outline: "border border-border bg-panel hover:bg-panel-2",
    ghost: "hover:bg-panel-2",
    danger: "border border-border text-err hover:bg-panel-2",
  }[variant];
  return <button className={cx(base, sizes, variants, className)} {...rest} />;
}

/* --------------------------------- Inputs ---------------------------------- */

const fieldBase =
  "w-full rounded-lg border border-border bg-panel px-3 text-sm outline-none placeholder:text-muted focus:border-accent transition-colors";

export function Input({
  className,
  ...rest
}: React.InputHTMLAttributes<HTMLInputElement>) {
  return <input className={cx(fieldBase, "h-9", className)} {...rest} />;
}

export function Select({
  className,
  ...rest
}: React.SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <select
      className={cx(fieldBase, "h-9 cursor-pointer appearance-none pr-8", className)}
      style={{
        backgroundImage:
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%239aa1ae' stroke-width='2' stroke-linecap='round'><path d='m6 9 6 6 6-6'/></svg>\")",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "right 8px center",
      }}
      {...rest}
    />
  );
}

export function Textarea({
  className,
  ...rest
}: React.TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <textarea
      spellCheck={false}
      className={cx(
        fieldBase,
        "scrollbar-thin min-h-40 resize-y py-2.5 font-mono text-[13px] leading-relaxed",
        className,
      )}
      {...rest}
    />
  );
}

export function Label({ children, hint }: { children: React.ReactNode; hint?: string }) {
  return (
    <div className="mb-1.5 flex items-baseline justify-between gap-3">
      <span className="text-xs font-medium tracking-wide text-muted uppercase">
        {children}
      </span>
      {hint ? <span className="text-xs text-muted">{hint}</span> : null}
    </div>
  );
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label hint={hint}>{label}</Label>
      {children}
    </div>
  );
}

/* ---------------------------------- Cards ---------------------------------- */

export function Panel({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cx("rounded-xl border border-border bg-panel p-4", className)}>
      {children}
    </div>
  );
}

export function Row({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cx("flex flex-wrap items-end gap-3", className)}>{children}</div>;
}

/* -------------------------------- Copy button ------------------------------- */

export function CopyButton({
  value,
  label = "Copy",
  size = "sm",
  className,
}: {
  value: string;
  label?: string;
  size?: "sm" | "md";
  className?: string;
}) {
  const [done, setDone] = useState(false);
  const copy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(value);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = value;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      ta.remove();
    }
    setDone(true);
    setTimeout(() => setDone(false), 1200);
  }, [value]);
  return (
    <Button size={size} onClick={copy} disabled={!value} className={className}>
      {done ? <Check size={14} className="text-ok" /> : <Copy size={14} />}
      {done ? "Copied" : label}
    </Button>
  );
}

export function DownloadButton({
  onClick,
  children = "Download",
  variant = "primary",
  disabled,
}: {
  onClick: () => void;
  children?: React.ReactNode;
  variant?: ButtonProps["variant"];
  disabled?: boolean;
}) {
  return (
    <Button variant={variant} onClick={onClick} disabled={disabled}>
      <Download size={14} />
      {children}
    </Button>
  );
}

/* --------------------------------- Dropzone -------------------------------- */

export function Dropzone({
  accept,
  multiple,
  onFiles,
  hint,
}: {
  accept?: string;
  multiple?: boolean;
  onFiles: (files: File[]) => void;
  hint?: string;
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  const handle = (list: FileList | null) => {
    if (!list || list.length === 0) return;
    onFiles(Array.from(list));
  };

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        handle(e.dataTransfer.files);
      }}
      onClick={() => inputRef.current?.click()}
      className={cx(
        "flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border border-dashed px-6 py-10 text-center transition-colors",
        over ? "border-accent bg-panel-2" : "border-border bg-panel hover:bg-panel-2",
      )}
    >
      <UploadCloud size={22} className="text-muted" />
      <div className="text-sm font-medium">
        Drop {multiple ? "files" : "a file"} here, or click to browse
      </div>
      {hint ? <div className="text-xs text-muted">{hint}</div> : null}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        hidden
        onChange={(e) => {
          handle(e.target.files);
          e.target.value = "";
        }}
      />
    </div>
  );
}

/* --------------------------------- Messages -------------------------------- */

export function Note({
  tone = "muted",
  children,
}: {
  tone?: "muted" | "ok" | "err" | "warn";
  children: React.ReactNode;
}) {
  const color = {
    muted: "text-muted",
    ok: "text-ok",
    err: "text-err",
    warn: "text-warn",
  }[tone];
  return <p className={cx("text-sm", color)}>{children}</p>;
}

export function Chip({
  active,
  children,
  onClick,
}: {
  active?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cx(
        "cursor-pointer rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        active
          ? "border-accent bg-accent text-accent-fg"
          : "border-border bg-panel text-muted hover:bg-panel-2",
      )}
    >
      {children}
    </button>
  );
}

export function Tabs<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="inline-flex rounded-lg border border-border bg-panel p-0.5">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => onChange(o.value)}
          className={cx(
            "cursor-pointer rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
            value === o.value ? "bg-accent text-accent-fg" : "text-muted hover:text-fg",
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

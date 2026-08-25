"use client";

import { useId, useState } from "react";

const MAX_BYTES = 4 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

export function ImageUpload({ label, value, onChange, required = false }: { label: string; value: string; onChange: (value: string) => void; required?: boolean }) {
  const id = useId();
  const [error, setError] = useState<string | null>(null);
  const selectFile = (file?: File) => {
    setError(null);
    if (!file) return;
    if (!ALLOWED_TYPES.has(file.type)) { setError("Choose a JPG, PNG, or WebP image."); return; }
    if (file.size > MAX_BYTES) { setError("Image must be smaller than 4 MB."); return; }
    const reader = new FileReader();
    reader.onload = () => onChange(String(reader.result));
    reader.onerror = () => setError("The image could not be read. Please try another file.");
    reader.readAsDataURL(file);
  };

  return <div className="grid gap-3">
    <label htmlFor={id} className="text-xs font-semibold uppercase tracking-[0.18em] text-gold">{label}</label>
    <label htmlFor={id} className="group cursor-pointer overflow-hidden border border-dashed border-gold/30 bg-ink/70 transition hover:border-gold/70">
      {value ? <img src={value} alt="Selected cover preview" className="h-52 w-full object-cover" /> : <div className="flex h-40 flex-col items-center justify-center px-6 text-center"><span className="text-3xl text-gold">＋</span><span className="mt-2 text-sm text-white/70">Choose a downloaded image</span><span className="mt-1 text-xs text-white/40">JPG, PNG or WebP · up to 4 MB</span></div>}
    </label>
    <input id={id} required={required && !value} type="file" accept="image/jpeg,image/png,image/webp" className="sr-only" onChange={(event) => selectFile(event.target.files?.[0])} />
    {value && <button type="button" onClick={() => onChange("")} className="w-fit text-xs uppercase tracking-[0.16em] text-white/50 hover:text-gold">Remove image</button>}
    {error && <p className="text-sm text-red-200">{error}</p>}
  </div>;
}

import Link from "next/link";
import { toko } from "@/lib/toko";

export default function Header() {
  return (
    <header className="border-b border-garis/80 bg-latar/90">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-5 sm:py-6">
        <Link href="/" className="inline-flex items-center gap-3 text-xl font-extrabold tracking-tight text-teks sm:text-2xl">
          <span className="grid size-11 place-items-center rounded-full bg-harga-latar text-xl sm:size-12 sm:text-2xl" aria-hidden="true">
            ☕
          </span>
          <span>{toko.nama}</span>
        </Link>
        <span className="hidden rounded-full border border-garis px-4 py-2 text-sm font-semibold text-teks-lembut sm:inline-flex">
          santai dulu, nikmati ceritanya ♡
        </span>
      </div>
    </header>
  );
}

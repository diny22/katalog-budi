"use client";

import { useState } from "react";
import { toko } from "@/lib/toko";
import { formatRupiah } from "@/lib/format";

export default function TombolWhatsApp({ produk }) {
  const [jumlah, setJumlah] = useState(1);

  // Varian disesuaikan dengan jenis menu: kopi/minuman vs camilan/makanan/umum
  const kategoriKecil = produk.kategori?.toLowerCase() || "";
  const opsiVarian =
    kategoriKecil.includes("minum") || kategoriKecil.includes("kopi")
      ? ["Dingin (Es)", "Hangat", "Kurang Manis"]
      : ["Reguler", "Spesial", "Ekstra"];

  const [varian, setVarian] = useState(opsiVarian[0]);

  const nomor = toko.nomorWhatsApp.replace(/\D/g, "");
  const totalHarga = produk.harga * jumlah;

  const pesan = `Halo, saya ingin memesan:
- Produk: ${produk.nama}
- Varian: ${varian}
- Jumlah: ${jumlah} item
- Total: ${formatRupiah(totalHarga)}`;

  const href = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;

  const tambah = () => setJumlah((prev) => prev + 1);
  const kurang = () => setJumlah((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="flex flex-col gap-4 rounded-2xl border border-garis bg-permukaan/60 p-4 sm:p-5">
      {/* Pilihan Varian */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold uppercase tracking-wider text-teks-lembut">
          Pilihan Varian
        </label>
        <div className="flex flex-wrap gap-2">
          {opsiVarian.map((item) => {
            const aktif = item === varian;
            return (
              <button
                key={item}
                type="button"
                onClick={() => setVarian(item)}
                className={`rounded-xl px-3.5 py-1.5 text-xs font-bold transition-colors ${
                  aktif
                    ? "bg-utama text-white shadow-sm"
                    : "border border-garis bg-latar text-teks hover:border-utama hover:text-utama"
                }`}
              >
                {item}
              </button>
            );
          })}
        </div>
      </div>

      {/* Pilihan Jumlah */}
      <div className="flex items-center justify-between gap-4 border-t border-garis/60 pt-4">
        <div>
          <span className="block text-xs font-bold uppercase tracking-wider text-teks-lembut">
            Jumlah Pesanan
          </span>
          <span className="text-sm font-extrabold text-harga">
            Total: {formatRupiah(totalHarga)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={kurang}
            disabled={jumlah <= 1}
            aria-label="Kurangi jumlah"
            className="grid size-9 place-items-center rounded-lg border border-garis bg-latar text-base font-bold text-teks transition-colors hover:border-utama disabled:cursor-not-allowed disabled:opacity-40"
          >
            −
          </button>
          <span className="w-8 text-center text-base font-bold text-teks">
            {jumlah}
          </span>
          <button
            type="button"
            onClick={tambah}
            aria-label="Tambah jumlah"
            className="grid size-9 place-items-center rounded-lg border border-garis bg-latar text-base font-bold text-teks transition-colors hover:border-utama"
          >
            +
          </button>
        </div>
      </div>

      {/* Tombol Pesan via WhatsApp */}
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-1 inline-flex w-full items-center justify-center rounded-lg bg-utama px-5 py-3 font-semibold text-white shadow-sm transition-colors hover:bg-utama-gelap sm:w-auto"
      >
        Pesan via WhatsApp ({jumlah})
      </a>
    </div>
  );
}

import Link from "next/link";
import { formatRupiah } from "@/lib/format";

export default function KartuProduk({ produk }) {
  return (
    <Link
      href={`/produk/${produk.id}`}
      className="group flex flex-col overflow-hidden rounded-3xl border border-garis bg-latar shadow-sm transition duration-200 hover:-translate-y-1 hover:border-utama/40 hover:shadow-lg"
    >
      <img
        src={produk.foto_url}
        alt={produk.nama}
        className="aspect-square w-full bg-permukaan object-cover transition duration-300 group-hover:scale-[1.02]"
      />
      <div className="flex flex-1 flex-col items-start gap-2 p-3 sm:p-4">
        <p className="rounded-full bg-permukaan px-2.5 py-1 text-[10px] font-bold text-utama sm:text-xs">
          {produk.kategori}
        </p>
        <h3 className="text-sm font-bold leading-snug group-hover:text-utama sm:text-base">
          {produk.nama}
        </h3>
        <p className="line-clamp-2 text-xs leading-relaxed text-teks-lembut sm:text-sm">
          {produk.deskripsi}
        </p>
        <p className="mt-auto rounded-full bg-harga-latar px-3 py-1 text-xs font-extrabold text-harga sm:text-sm">
          {formatRupiah(produk.harga)}
        </p>
      </div>
    </Link>
  );
}

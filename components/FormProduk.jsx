"use client";

import { useActionState } from "react";
import Input from "@/components/Input";
import Tombol from "@/components/Tombol";
import { tambahProduk, ubahProduk } from "@/app/admin/actions";

export default function FormProduk({ produk = {}, labelTombol }) {
  const aksi = produk.id ? ubahProduk.bind(null, produk.id) : tambahProduk;
  const [state, formAction, isPending] = useActionState(aksi, null);

  return (
    <form action={formAction} className="flex max-w-xl flex-col gap-4">
      {state?.error && (
        <div className="rounded-lg border border-bahaya/20 bg-permukaan p-3 text-sm font-semibold text-bahaya">
          {state.error}
        </div>
      )}
      <Input
        label="Nama produk"
        name="nama"
        placeholder="Contoh: Es Kopi Susu Gula Aren"
        defaultValue={produk.nama}
        required
      />
      <Input
        label="Harga (Rp)"
        name="harga"
        type="number"
        min="0"
        step="1"
        placeholder="Contoh: 24000"
        defaultValue={produk.harga}
        required
      />
      <Input
        label="Kategori"
        name="kategori"
        placeholder="Contoh: Kopi, Non-kopi, Pastry, atau Dessert"
        defaultValue={produk.kategori}
      />
      <Input
        label="Link foto"
        name="foto_url"
        placeholder="https://... atau /produk/nama-file.svg"
        defaultValue={produk.foto_url}
      />
      <Input
        label="Deskripsi"
        name="deskripsi"
        textarea
        placeholder="Jelaskan rasa, bahan, dan penyajian produk."
        defaultValue={produk.deskripsi}
      />
      <div className="flex gap-3">
        <Tombol type="submit" disabled={isPending}>
          {isPending ? "Menyimpan..." : labelTombol}
        </Tombol>
        <Tombol href="/admin" varian="garis">
          Batal
        </Tombol>
      </div>
    </form>
  );
}

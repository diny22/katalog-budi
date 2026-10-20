import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";

export default function HalamanTambahProduk() {
  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Tambah menu kafe</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Isi nama, harga, kategori, foto, dan deskripsi menu.
        </p>
      </div>
      <FormProduk labelTombol="Simpan produk" />
    </div>
  );
}

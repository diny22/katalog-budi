// DATA CONTOH: hanya untuk tampilan awal sebelum terhubung ke database.
// Nama kolom sama persis dengan tabel "produk" di docs/schema.sql.
// Setelah US-01 selesai, halaman tidak lagi memakai file ini.

export const produkContoh = [
  {
    id: 1,
    nama: "Es Kopi Susu Gula Aren",
    harga: 24000,
    deskripsi:
      "Espresso house blend, susu segar, dan gula aren legit disajikan dingin. Favorit untuk menemani hari.",
    foto_url: "/produk/kopi.svg",
    kategori: "Minuman",
  },
  {
    id: 2,
    nama: "Caffe Latte",
    harga: 28000,
    deskripsi:
      "Espresso pilihan berpadu dengan susu steamed lembut dan lapisan foam yang halus.",
    foto_url: "/produk/keripik.svg",
    kategori: "Kopi",
  },
  {
    id: 3,
    nama: "Matcha Latte",
    harga: 30000,
    deskripsi:
      "Matcha dengan aroma khas yang diracik bersama susu creamy, cocok untuk jeda yang menenangkan.",
    foto_url: "/produk/sambal.svg",
    kategori: "Non-kopi",
  },
  {
    id: 4,
    nama: "Butter Croissant",
    harga: 22000,
    deskripsi:
      "Pastry berlapis dengan aroma butter, renyah di luar dan lembut di bagian dalam.",
    foto_url: "/produk/nastar.svg",
    kategori: "Pastry",
  },
  {
    id: 5,
    nama: "Tiramisu Cup",
    harga: 32000,
    deskripsi:
      "Dessert berlapis sponge, krim lembut, dan cita rasa kopi dengan taburan cokelat.",
    foto_url: "/produk/tas.svg",
    kategori: "Dessert",
  },
  {
    id: 6,
    nama: "Cinnamon Roll",
    harga: 25000,
    deskripsi:
      "Roti gulung empuk dengan isian kayu manis hangat dan lapisan glaze manis.",
    foto_url: "/produk/batik.svg",
    kategori: "Pastry",
  },
];

export function cariProdukContoh(id) {
  return produkContoh.find((produk) => String(produk.id) === String(id));
}

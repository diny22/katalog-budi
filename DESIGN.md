# Panduan Tampilan

Ikuti panduan ini setiap kali membuat atau mengubah tampilan, supaya semua halaman terlihat konsisten. Untuk menyesuaikan dengan usahamu, ganti nilai warna di `app/globals.css` (bagian `@theme`) dan isi `lib/toko.js`.

## Warna

| Token | Nilai awal | Dipakai untuk |
| --- | --- | --- |
| `latar` | `#fffaf3` | Latar halaman dan kartu |
| `permukaan` | `#f7eee3` | Latar bagian sekunder, footer, kepala tabel |
| `garis` | `#eadccd` | Garis tepi dan pemisah |
| `teks` | `#38271f` | Teks utama |
| `teks-lembut` | `#816d60` | Teks pendukung: kategori, keterangan |
| `utama` | `#9a5b3f` | Tombol utama, tautan aktif, nama toko |
| `utama-gelap` | `#75432f` | Tombol utama saat disorot |
| `harga` / `harga-latar` | `#75432f` / `#f5e4ca` | Label harga |
| `bahaya` | `#b42318` | Aksi hapus dan pesan error |

Pakai sebagai kelas Tailwind, misalnya `bg-utama`, `text-teks-lembut`, `border-garis`. Jangan menulis kode warna langsung di kelas.

## Huruf

- Satu jenis huruf: Plus Jakarta Sans.
- Judul halaman: `text-2xl` sampai `text-5xl`, `font-extrabold`.
- Teks biasa: ukuran bawaan, panjang baris maksimal sekitar 70 karakter (`max-w-prose`).
- Tulisan memakai huruf kecil biasa (sentence case), bukan HURUF BESAR semua.

## Komponen

Gunakan komponen yang sudah ada sebelum membuat yang baru:

| Komponen | Fungsi |
| --- | --- |
| `Tombol` | Tombol dan tautan berbentuk tombol (varian `utama`, `garis`, `bahaya`) |
| `Input` | Kolom isian beserta label, termasuk textarea |
| `KartuProduk` | Kartu di katalog |
| `TabelProduk` | Daftar produk di halaman admin |
| `FormProduk` | Form tambah dan ubah produk |
| `NavAdmin` | Menu di halaman admin |

## Tata letak

- Lebar konten maksimal `max-w-5xl`, rata kiri.
- Katalog: 2 kolom di HP, 3 kolom di layar lebar.
- Selalu cek tampilan di lebar HP (sekitar 390 px).

## Bahasa

- Gunakan bahasa Indonesia yang singkat dan jelas.
- Label tombol menyebut aksinya: "Simpan produk", bukan "Submit".
- Pesan error menjelaskan apa yang salah dan cara memperbaikinya.

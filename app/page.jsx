import KartuProduk from "@/components/KartuProduk";
import { produkContoh } from "@/lib/data-contoh";
import { toko } from "@/lib/toko";

// US-01: halaman ini masih memakai data contoh.
// Tugas peserta: ambil daftar produk dari tabel "produk" di Supabase, di sisi server.
export default function HalamanKatalog() {
  const daftarProduk = produkContoh;

  return (
    <>
      <section className="py-6 sm:py-10">
        <div className="relative isolate overflow-hidden rounded-[2rem] bg-permukaan px-6 py-8 sm:px-10 sm:py-12">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-20 -z-10 size-64 rounded-full bg-latar/70 sm:size-80"
          />
          <div
            aria-hidden="true"
            className="absolute -bottom-28 right-24 -z-10 size-56 rounded-full bg-harga-latar/70"
          />
          <div className="grid items-center gap-8 md:grid-cols-[1.05fr_0.95fr]">
            <div>
              <p className="inline-flex items-center gap-2 rounded-full border border-garis bg-latar/80 px-3 py-1.5 text-xs font-semibold text-utama">
                <span aria-hidden="true">☕</span>
                Kopi, pastry, dan cerita kecil
              </p>
              <h1 className="mt-5 max-w-xl text-4xl font-extrabold leading-[1.12] tracking-tight sm:text-5xl">
                Singgah sebentar,
                <span className="block text-utama">nyamannya lama.</span>
              </h1>
              <p className="mt-4 max-w-lg leading-relaxed text-teks-lembut">
                {toko.tagline}. Temukan teman ngobrol favoritmu, dari kopi susu
                yang creamy sampai pastry hangat.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#menu"
                  className="inline-flex min-h-11 items-center justify-center rounded-full bg-utama px-5 py-2.5 text-sm font-bold text-white transition hover:bg-utama-gelap"
                >
                  Lihat menu
                  <span aria-hidden="true" className="ml-2">↓</span>
                </a>
                <p className="text-sm text-teks-lembut">
                  <span aria-hidden="true" className="mr-1.5">◷</span>
                  Buka {toko.jamBuka.replace("Setiap hari, ", "")}
                </p>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-sm rotate-2">
              <div className="absolute -left-4 top-8 z-10 -rotate-6 rounded-2xl border border-garis bg-latar px-4 py-3 shadow-sm sm:-left-5 sm:px-5 sm:py-4">
                <p className="text-xs font-semibold text-teks-lembut">dibuat dengan</p>
                <p className="mt-0.5 text-sm font-extrabold text-utama">♡ sepenuh hati</p>
              </div>
              <img
                src="/produk/kopi.svg"
                alt="Ilustrasi es kopi susu gula aren"
                className="aspect-square w-full rounded-[2rem] border-4 border-latar object-cover shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      <section id="menu" aria-labelledby="judul-produk" className="scroll-mt-6 pb-4 pt-5">
        <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-sm font-bold text-utama">Ada yang enak nih!</p>
            <h2 id="judul-produk" className="mt-1 text-2xl font-extrabold tracking-tight sm:text-3xl">
              Menu untuk mood baik
            </h2>
          </div>
          <p className="rounded-full bg-permukaan px-3 py-1.5 text-xs font-medium text-teks-lembut">
            Menu pilihan · data contoh
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 sm:gap-5 md:grid-cols-3">
          {daftarProduk.map((produk) => (
            <KartuProduk key={produk.id} produk={produk} />
          ))}
        </div>
      </section>
    </>
  );
}

import Link from "next/link";
import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { createServerClient } from "@/lib/supabase/server";

export default async function HalamanKatalog({ searchParams }) {
  const params = (await searchParams) || {};
  const cari = params.q?.toString().trim() || "";
  const kategoriDipilih = params.kategori?.toString().trim() || "Semua";

  let daftarProduk = null;
  let daftarKategori = ["Semua"];
  let pesanError = null;

  try {
    const supabase = createServerClient();

    // Ambil semua kategori unik dari database untuk pilihan filter
    const { data: dataKategori } = await supabase
      .from("produk")
      .select("kategori");

    if (dataKategori) {
      const kategoriUnik = Array.from(
        new Set(
          dataKategori
            .map((p) => p.kategori)
            .filter((k) => k && typeof k === "string")
        )
      );
      daftarKategori = ["Semua", ...kategoriUnik];
    }

    // Bangun query produk dengan filter kategori dan pencarian
    let query = supabase.from("produk").select("*");

    if (kategoriDipilih && kategoriDipilih !== "Semua") {
      query = query.eq("kategori", kategoriDipilih);
    }

    if (cari) {
      query = query.ilike("nama", `%${cari}%`);
    }

    query = query.order("id", { ascending: true });

    const { data, error } = await query;

    if (error) {
      pesanError = error.message;
    } else {
      daftarProduk = data;
    }
  } catch (err) {
    pesanError = err.message || "Gagal terhubung ke database.";
  }

  return (
    <>
      <section className="py-10 sm:py-14">
        <h1 className="max-w-2xl text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl">
          {toko.nama}
        </h1>
        <p className="mt-3 max-w-xl text-lg text-teks-lembut">{toko.tagline}</p>
        <p className="mt-4 text-sm text-teks-lembut">{toko.jamBuka}</p>
      </section>

      <section aria-labelledby="judul-produk" className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h2 id="judul-produk" className="text-xl font-bold">
              Produk kami
            </h2>
            {daftarProduk && (
              <span className="text-xs font-semibold text-teks-lembut">
                {daftarProduk.length} menu tersedia
              </span>
            )}
          </div>

          {/* Form Pencarian */}
          <form method="GET" action="/" className="flex flex-col gap-2.5 sm:flex-row">
            <div className="relative flex-1">
              <input
                type="text"
                name="q"
                defaultValue={cari}
                placeholder="Cari nama produk..."
                className="w-full rounded-xl border border-garis bg-latar px-4 py-2.5 text-sm text-teks placeholder:text-teks-lembut focus:border-utama focus:outline-none"
              />
            </div>
            {kategoriDipilih !== "Semua" && (
              <input type="hidden" name="kategori" value={kategoriDipilih} />
            )}
            <button
              type="submit"
              className="inline-flex items-center justify-center rounded-xl bg-utama px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-utama-gelap"
            >
              Cari
            </button>
            {(cari || kategoriDipilih !== "Semua") && (
              <Link
                href="/"
                className="inline-flex items-center justify-center rounded-xl border border-garis bg-latar px-4 py-2.5 text-sm font-semibold text-teks-lembut transition-colors hover:border-utama hover:text-utama"
              >
                Reset
              </Link>
            )}
          </form>

          {/* Filter Kategori */}
          {daftarKategori.length > 1 && (
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {daftarKategori.map((kat) => {
                const aktif = kat === kategoriDipilih;
                const paramsQuery = new URLSearchParams();
                if (cari) paramsQuery.set("q", cari);
                if (kat !== "Semua") paramsQuery.set("kategori", kat);
                const queryStr = paramsQuery.toString();
                const href = queryStr ? `/?${queryStr}` : "/";

                return (
                  <Link
                    key={kat}
                    href={href}
                    className={`rounded-full px-3.5 py-1.5 text-xs font-bold transition-colors ${
                      aktif
                        ? "bg-utama text-white shadow-sm"
                        : "border border-garis bg-latar text-teks-lembut hover:border-utama hover:text-utama"
                    }`}
                  >
                    {kat}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {pesanError ? (
          <div className="rounded-3xl border border-garis bg-permukaan p-6 sm:p-8">
            <div className="flex flex-col items-center text-center">
              <span
                className="mb-3 grid size-12 place-items-center rounded-full bg-bahaya/10 text-2xl text-bahaya"
                aria-hidden="true"
              >
                ⚠️
              </span>
              <p className="text-base font-bold text-bahaya">Gagal memuat produk</p>
              <p className="mt-1 max-w-lg text-sm text-teks-lembut">{pesanError}</p>
            </div>
          </div>
        ) : !daftarProduk || daftarProduk.length === 0 ? (
          <div className="rounded-2xl border border-garis bg-permukaan py-12 text-center">
            <p className="text-base text-teks-lembut">
              {cari || kategoriDipilih !== "Semua"
                ? "Tidak ada produk yang sesuai dengan pencarian atau filter kategori."
                : "Belum ada produk"}
            </p>
            {(cari || kategoriDipilih !== "Semua") && (
              <Link
                href="/"
                className="mt-3 inline-block text-sm font-semibold text-utama underline underline-offset-4"
              >
                Lihat semua produk
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
            {daftarProduk.map((produk) => (
              <KartuProduk key={produk.id} produk={produk} />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

import KartuProduk from "@/components/KartuProduk";
import { toko } from "@/lib/toko";
import { createServerClient } from "@/lib/supabase/server";

export default async function HalamanKatalog() {
  let daftarProduk = null;
  let pesanError = null;

  try {
    const supabase = createServerClient();
    const { data, error } = await supabase
      .from("produk")
      .select("*")
      .order("id", { ascending: true });

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

      <section aria-labelledby="judul-produk" className="flex flex-col gap-5">
        <h2 id="judul-produk" className="text-xl font-bold">
          Produk kami
        </h2>

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

              <div className="mt-5 w-full max-w-md rounded-2xl border border-garis bg-latar p-4 text-left text-xs leading-relaxed text-teks-lembut">
                <p className="font-bold text-teks">Petunjuk penyelesaian:</p>
                <ol className="mt-2 list-decimal space-y-1 pl-4">
                  <li>
                    Buka file <span className="font-mono font-semibold text-teks">.env.local</span>.
                  </li>
                  <li>
                    Isi <span className="font-mono font-semibold text-teks">SUPABASE_URL</span> dan{" "}
                    <span className="font-mono font-semibold text-teks">SUPABASE_SECRET_KEY</span> dari dashboard Supabase Anda.
                  </li>
                  <li>
                    Pastikan tabel produk sudah dibuat melalui SQL Editor (<span className="font-mono text-teks">docs/schema.sql</span>).
                  </li>
                  <li>
                    Restart server terminal (<span className="font-mono text-teks">Ctrl + C</span> lalu jalankan ulang <span className="font-mono text-teks">npm run dev</span>).
                  </li>
                </ol>
              </div>
            </div>
          </div>
        ) : !daftarProduk || daftarProduk.length === 0 ? (
          <div className="rounded-2xl border border-garis bg-permukaan py-12 text-center">
            <p className="text-base text-teks-lembut">Belum ada produk</p>
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

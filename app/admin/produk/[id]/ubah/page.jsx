import { notFound, redirect } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { createAuthClient } from "@/lib/supabase/auth";

export default async function HalamanUbahProduk({ params }) {
  const { id } = await params;
  const supabase = await createAuthClient();
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    redirect("/admin/login");
  }

  const { data: produk, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    throw new Error(`Gagal memuat produk: ${error.message}`);
  }

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Ubah menu kafe</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Perbarui detail menu, lalu simpan perubahan.
        </p>
      </div>
      <FormProduk produk={produk} labelTombol="Simpan perubahan" />
    </div>
  );
}

import { notFound, redirect } from "next/navigation";
import NavAdmin from "@/components/NavAdmin";
import FormProduk from "@/components/FormProduk";
import { createAuthClient } from "@/lib/supabase/auth";
import { createServerClient } from "@/lib/supabase/server";

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

  let produk = null;
  const { data, error } = await supabase
    .from("produk")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!error && data) {
    produk = data;
  } else {
    try {
      const serverClient = createServerClient();
      const res = await serverClient
        .from("produk")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (res.data) {
        produk = res.data;
      }
    } catch {
      // Abaikan error fallback
    }
  }

  if (!produk) {
    notFound();
  }

  return (
    <div className="flex flex-col gap-6 py-8">
      <NavAdmin />
      <div>
        <h1 className="text-2xl font-extrabold">Ubah produk</h1>
        <p className="mt-1 text-sm text-teks-lembut">
          Perbarui detail produk, lalu simpan perubahan.
        </p>
      </div>
      <FormProduk produk={produk} labelTombol="Simpan perubahan" />
    </div>
  );
}

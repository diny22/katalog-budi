"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAuthClient } from "@/lib/supabase/auth";

export async function login(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const email = data?.get("email");
  const password = data?.get("password");

  if (!email || !password) {
    return { error: "Email dan password wajib diisi." };
  }

  let isSuccess = false;
  try {
    const supabase = await createAuthClient();
    const { error } = await supabase.auth.signInWithPassword({
      email: email.toString().trim(),
      password: password.toString(),
    });

    if (error) {
      return { error: "Email atau password salah. Silakan coba lagi." };
    }

    isSuccess = true;
  } catch (err) {
    return {
      error:
        err.message || "Terjadi kesalahan saat memproses login. Silakan coba lagi.",
    };
  }

  if (isSuccess) {
    redirect("/admin");
  }
}

export async function logout() {
  const supabase = await createAuthClient();
  await supabase.auth.signOut();
  redirect("/admin/login");
}

export async function gantiPassword(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const passwordBaru = data?.get("password_baru")?.toString() || "";
  const konfirmasiPassword =
    data?.get("konfirmasi_password")?.toString() || "";

  if (!passwordBaru || !konfirmasiPassword) {
    return { error: "Semua kolom password wajib diisi." };
  }

  if (passwordBaru.length < 8) {
    return { error: "Password baru minimal 8 karakter." };
  }

  if (passwordBaru !== konfirmasiPassword) {
    return { error: "Password baru dan konfirmasi password tidak sama." };
  }

  try {
    const supabase = await createAuthClient();

    // Wajib periksa bahwa admin sudah login di server sebelum mengubah data (aturan keamanan)
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      return {
        error: "Sesi tidak valid atau telah berakhir. Silakan login kembali.",
      };
    }

    const { error } = await supabase.auth.updateUser({
      password: passwordBaru,
    });

    if (error) {
      return { error: error.message || "Gagal mengganti password." };
    }

    return { success: "Password berhasil diganti." };
  } catch (err) {
    return {
      error:
        err.message ||
        "Terjadi kesalahan saat mengganti password. Silakan coba lagi.",
    };
  }
}

async function pastikanAdmin() {
  const supabase = await createAuthClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { error: "Sesi admin tidak valid. Silakan login kembali." };
  }

  return { supabase };
}

function ambilDataProduk(data) {
  if (!data || typeof data.get !== "function") {
    return { error: "Data formulir tidak valid." };
  }

  const nama = data.get("nama")?.toString().trim() || "";
  const hargaInput = data.get("harga")?.toString().trim() || "";
  const harga = Number(hargaInput);

  if (!nama || !hargaInput) {
    return { error: "Nama produk dan harga wajib diisi." };
  }

  if (!Number.isSafeInteger(harga) || harga < 0) {
    return { error: "Harga harus berupa angka bulat nol atau lebih." };
  }

  return {
    produk: {
      nama,
      harga,
      kategori: data.get("kategori")?.toString().trim() || null,
      foto_url: data.get("foto_url")?.toString().trim() || null,
      deskripsi: data.get("deskripsi")?.toString().trim() || null,
    },
  };
}

export async function tambahProduk(prevState, formData) {
  const data = formData instanceof FormData ? formData : prevState;
  const hasilValidasi = ambilDataProduk(data);
  if (hasilValidasi.error) {
    return hasilValidasi;
  }

  try {
    const hasilAdmin = await pastikanAdmin();
    if (hasilAdmin.error) {
      return hasilAdmin;
    }

    const { error } = await hasilAdmin.supabase
      .from("produk")
      .insert(hasilValidasi.produk);

    if (error) {
      return { error: `Produk gagal ditambahkan: ${error.message}` };
    }
  } catch (error) {
    return {
      error:
        error.message || "Terjadi kesalahan saat menambahkan produk. Silakan coba lagi.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  redirect("/admin");
}

export async function ubahProduk(id, prevState, formData) {
  const idProduk = Number(id);
  if (!Number.isSafeInteger(idProduk) || idProduk < 1) {
    return { error: "ID produk tidak valid." };
  }

  const data =
    formData instanceof FormData
      ? formData
      : prevState instanceof FormData
      ? prevState
      : null;
  const hasilValidasi = ambilDataProduk(data);
  if (hasilValidasi.error) {
    return hasilValidasi;
  }

  try {
    const hasilAdmin = await pastikanAdmin();
    if (hasilAdmin.error) {
      return hasilAdmin;
    }

    const { data: updateData, error } = await hasilAdmin.supabase
      .from("produk")
      .update(hasilValidasi.produk)
      .eq("id", idProduk)
      .select("id")
      .maybeSingle();

    if (error) {
      return { error: `Perubahan produk gagal disimpan: ${error.message}` };
    }

    if (!updateData) {
      return { error: "Produk tidak ditemukan atau tidak dapat diubah." };
    }
  } catch (error) {
    return {
      error:
        error.message || "Terjadi kesalahan saat mengubah produk. Silakan coba lagi.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${idProduk}`);
  redirect("/admin");
}

export async function hapusProduk(idOrFormData) {
  const rawId =
    idOrFormData instanceof FormData
      ? idOrFormData.get("id")
      : idOrFormData;
  const idProduk = Number(rawId);

  if (!Number.isSafeInteger(idProduk) || idProduk < 1) {
    return { error: "ID produk tidak valid." };
  }

  try {
    const hasilAdmin = await pastikanAdmin();
    if (hasilAdmin.error) {
      return hasilAdmin;
    }

    const { error } = await hasilAdmin.supabase
      .from("produk")
      .delete()
      .eq("id", idProduk);

    if (error) {
      return { error: `Gagal menghapus produk: ${error.message}` };
    }
  } catch (error) {
    return {
      error:
        error.message ||
        "Terjadi kesalahan saat menghapus produk. Silakan coba lagi.",
    };
  }

  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath(`/produk/${idProduk}`);
  return { success: true };
}

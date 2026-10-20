"use server";

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

import { createClient } from "@supabase/supabase-js";

/**
 * Membuat client Supabase untuk koneksi server (pengunjung).
 * Menggunakan SUPABASE_SECRET_KEY untuk membaca data produk yang dilindungi RLS di server.
 */
export function createServerClient() {
  let supabaseUrl = process.env.SUPABASE_URL?.trim();
  const supabaseSecretKey = process.env.SUPABASE_SECRET_KEY?.trim();

  if (!supabaseUrl || !supabaseSecretKey) {
    throw new Error(
      "SUPABASE_URL atau SUPABASE_SECRET_KEY belum diatur di environment variable."
    );
  }

  // Normalisasi URL: ambil hanya origin (misal https://xxx.supabase.co)
  // agar aman bila tidak sengaja menyertakan trailing slash atau /rest/v1/
  try {
    const parsed = new URL(supabaseUrl);
    supabaseUrl = parsed.origin;
  } catch {
    // Biarkan apa adanya jika bukan format URL
  }

  return createClient(supabaseUrl, supabaseSecretKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}

export { createServerClient as createClientServer };

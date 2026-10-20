import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function proxy(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const url = process.env.SUPABASE_URL?.trim();
  const key = process.env.SUPABASE_PUBLISHABLE_KEY?.trim();

  if (!url || !key) {
    return response;
  }

  let supabaseUrl = url;
  try {
    supabaseUrl = new URL(url).origin;
  } catch {
    // Biarkan apa adanya jika bukan format URL
  }

  const supabase = createServerClient(supabaseUrl, key, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  // Periksa user dari sesi login Supabase Auth
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const path = request.nextUrl.pathname.replace(/\/$/, "") || "/";

  // Semua rute /admin kecuali /admin/login wajib login
  if (path.startsWith("/admin") && path !== "/admin/login") {
    if (!user) {
      const loginUrl = new URL("/admin/login", request.url);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Jika sudah login dan membuka halaman login, alihkan ke dashboard admin
  if (path === "/admin/login" && user) {
    const adminUrl = new URL("/admin", request.url);
    return NextResponse.redirect(adminUrl);
  }

  return response;
}

export { proxy as middleware };
export default proxy;

export const config = {
  matcher: ["/admin", "/admin/:path*"],
};


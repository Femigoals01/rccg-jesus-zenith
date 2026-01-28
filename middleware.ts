

// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;

//   // Allow admin login page
//   if (pathname === "/admin/login") {
//     return NextResponse.next();
//   }

//   const isAdmin = req.cookies.get("admin_auth")?.value === "true";

//   if (pathname.startsWith("/admin") && !isAdmin) {
//     return NextResponse.redirect(new URL("/admin/login", req.url));
//   }

//   return NextResponse.next();
// }



import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow login page
  if (pathname.startsWith("/admin/login")) {
    return NextResponse.next();
  }

  // Protect all /admin routes
  if (pathname.startsWith("/admin")) {
    const isAuth = req.cookies.get("admin_auth")?.value === "true";

    if (!isAuth) {
      return NextResponse.redirect(
        new URL("/admin/login", req.url)
      );
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

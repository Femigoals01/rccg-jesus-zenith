
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(req: NextRequest) {
//   const isAdmin = req.cookies.get("admin_auth")?.value === "true";

//   if (req.nextUrl.pathname.startsWith("/admin") && !isAdmin) {
//     return NextResponse.redirect(new URL("/admin/login", req.url));
//   }
// }

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Allow admin login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  const isAdmin = req.cookies.get("admin_auth")?.value === "true";

  if (pathname.startsWith("/admin") && !isAdmin) {
    return NextResponse.redirect(new URL("/admin/login", req.url));
  }

  return NextResponse.next();
}

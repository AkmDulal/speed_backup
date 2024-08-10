import { NextResponse } from "next/server";

export function middleware(req) {
  const { pathname } = req.nextUrl;
  console.log(pathname, "pathname");

  // Check if the pathname is exactly "/" and not already within "/en"
  if (pathname === "/") {
    const url = req.nextUrl.clone();
    url.pathname = "/en"; // Redirect to "/en"
    return NextResponse.redirect(url);
  }

  // Allow all other requests
  return NextResponse.next();
}

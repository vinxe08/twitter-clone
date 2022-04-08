import { NextFetchEvent, NextResponse } from "next/server"
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  // Token will exist if user is logged in
  const session = await getToken({
    req,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV == "production",
  });

  const { pathname } = req.nextUrl

  if(pathname.includes("/api/auth") || session) {
    return NextResponse.next();
  }

  if(!session && pathname !== "/") {
    const url = req.nextUrl.clone()
    url.pathname = '/'
    return NextResponse.rewrite(url)

  }

}

// ERROR: req.
// Solution maybe:
// #1
// export async function middleware(req: NextRequest, ev: NextFetchEvent, request: NextApiRequest) {
  // if(req.nextUrl.pathname === "/") {
  //   const session = await getToken({
  //     req: request,
  //     secret: process.env.JWT_SECRET,
  //     secureCookie: process.env.NODE_ENV == "production",
  //   });
// }

//#2
// export async function middleware(req: any) {
  // if(req.nextUrl.pathname === "/") {
  //   const session = await getToken({
  //     req: request,
  //     secret: process.env.JWT_SECRET,
  //     secureCookie: process.env.NODE_ENV == "production",
  //   });
// }
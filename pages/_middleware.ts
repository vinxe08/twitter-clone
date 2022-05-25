import { NextFetchEvent, NextResponse } from "next/server"
import { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest | any, ev: NextFetchEvent) {
  // Token will exist if user is logged in
  const session = await getToken({
    req: request,
    secret: process.env.JWT_SECRET,
    secureCookie: process.env.NODE_ENV == "production",
  });

  const { pathname } = request.nextUrl

  if(pathname.includes("/api/auth") || session) {
    return NextResponse.next();
  }

  if(!session && pathname !== "/") {
    const url = request.nextUrl.clone()
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
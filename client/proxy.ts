import type { NextRequest } from "next/server";
import {NextResponse} from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.ACCESS_TOKEN_SECRET);

async function verifyToken(token: string){
  try {
    await jwtVerify(token, secret);
  } catch (error) {
    return false;
  }
}

export function proxy(request:NextRequest){
  const accessToken =  request.cookies.get("accessToken")?.value;
  if(!accessToken){
    return NextResponse.redirect(new URL("/login",request.url));
  }
  const isValid = verifyToken(accessToken);
  if(!isValid){
    return NextResponse.redirect(new URL("/login",request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/"]
}
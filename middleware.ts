import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createIntlMiddleware(routing);

const protectedRoutes = ["/profile", "/checkout", "/bookings", "/wishlist"];

export default auth((req) => {
  const isAuth = !!req.auth;
  const path = req.nextUrl.pathname;

  const isProtected = protectedRoutes.some(route => 
    path.includes(route)
  );

  if (!isAuth && isProtected) {
    const segments = path.split("/").filter(Boolean);
    const detectedLocale = segments[0] && routing.locales.includes(segments[0] as any) 
      ? segments[0] 
      : routing.defaultLocale;

    const loginUrl = new URL(`/${detectedLocale}/login`, req.url);
    loginUrl.searchParams.set("callbackUrl", req.url); // Preserve context on redirect
    return Response.redirect(loginUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

import createIntlMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

const { auth } = NextAuth(authConfig);

const intlMiddleware = createIntlMiddleware(routing);

// Routes that require authentication
const protectedRoutes = ["/profile", "/checkout", "/bookings", "/wishlist"];

export default auth((req) => {
  const isAuth = !!req.auth;
  const path = req.nextUrl.pathname;

  // Check if current path matches any protected route pattern
  const isProtected = protectedRoutes.some(route => 
    path.includes(route)
  );

  if (!isAuth && isProtected) {
    const loginUrl = new URL(`/${routing.defaultLocale}/login`, req.url);
    return Response.redirect(loginUrl);
  }

  return intlMiddleware(req);
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

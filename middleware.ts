import { NextResponse } from "next/server";
import { authentication } from "next-firebase-auth-edge/lib/next/middleware";
import { firebaseServerOptions, cookieOptions } from "@/lib/firebase/server-options";
import type { NextMiddleware, NextRequest } from "next/server";

function redirectToSignInPage(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname === "/signin") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/signin";
  url.search = `redirect=${request.nextUrl.pathname}${url.search}`;
  return NextResponse.redirect(url);
}

function redirectToHomePage(request: NextRequest): NextResponse {
  if (request.nextUrl.pathname !== "/signin") {
    return NextResponse.next();
  }

  const url = request.nextUrl.clone();
  url.pathname = "/";
  return NextResponse.redirect(url);
}

const middleware: NextMiddleware = (request: NextRequest) => {
  return authentication(request, {
    loginPath: "/api/signin",
    logoutPath: "/api/signout",
    apiKey: firebaseServerOptions.firebaseApiKey,
    cookieName: cookieOptions.name,
    cookieSignatureKeys: cookieOptions.signatureKeys,
    cookieSerializeOptions: {
      path: cookieOptions.path,
      httpOnly: cookieOptions.httpOnly,
      secure: cookieOptions.secure,
      sameSite: cookieOptions.sameSite,
      maxAge: cookieOptions.maxAge,
    },
    serviceAccount: firebaseServerOptions.serviceAccount,

    handleValidToken: async () => {
      return redirectToHomePage(request);
    },

    handleInvalidToken: async () => {
      return redirectToSignInPage(request);
    },

    handleError: async (error) => {
      // eslint-disable-next-line no-console
      console.error("Unhandled authentication error", { error });
      return redirectToSignInPage(request);
    },
  });
};

export const config = {
  matcher: ["/", "/((?!_next/static|favicon.ico|logo.svg|site.webmanifest).*)"],
};

export { middleware };

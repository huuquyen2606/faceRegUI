import { Hanken_Grotesk } from "next/font/google";
import type { Metadata } from "next";

import "./global.css";
import { FirebaseServerProvider } from "@/lib/firebase/server-provider";
import { Toaster } from "@/components/ui/toaster";

const hankenGrotesk = Hanken_Grotesk({
  subsets: ["vietnamese", "latin-ext"],
  display: "swap",
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "FaceReg",
  description: "A management system for face authentication using state-of-the-art technologies 😍",
};

export default function RootLayout({ children }: { children: React.ReactNode }): JSX.Element {
  return (
    <html lang="en" className={hankenGrotesk.variable}>
      <head>
        <link rel="icon" type="image/x-icon" sizes="32x32" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className="font-sans bg-white">
        {/* @ts-expect-error https://github.com/vercel/next.js/issues/43537 */}
        <FirebaseServerProvider>{children}</FirebaseServerProvider>
        <Toaster />
      </body>
    </html>
  );
}

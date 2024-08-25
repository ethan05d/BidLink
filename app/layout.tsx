import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import "./globals.css";
import { Providers } from "./providers";
import { SessionProvider } from "next-auth/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BidLink",
  description: "BidLink is a platform for buying and selling short-term items.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <SessionProvider>
        <Providers>
          <body className={inter.className}>
            {children}
            <Toaster richColors position="bottom-right" expand={true} />
          </body>
        </Providers>
      </SessionProvider>
    </html>
  );
}

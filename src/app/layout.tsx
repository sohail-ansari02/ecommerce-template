import "../styles/globals.css";

import { Session, getServerSession } from "next-auth";

import { Analytics } from "@vercel/analytics/react";
import { Footer } from "../components/common/Footer";
import { GeistSans } from "geist/font/sans";
import type { Metadata } from "next";
import { Navbar } from "../components/common/Navbar";
import Providers from "./Providers";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "sonner";
import { authOptions } from "@/libs/auth";
import { getTotalItems } from "./(carts)/cart/action";
import { getTotalWishlist } from "./(carts)/wishlist/action";

export const metadata: Metadata = {
  title: "Fitness Ecommerce",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session: Session | null = await getServerSession(authOptions);
  const totalItemsCart = await getTotalItems(session);
  const totalItemsWishlists = await getTotalWishlist();

  return (
    <html lang="en">
      <Providers>
        <body className={GeistSans.className}>
          <Navbar
            session={session}
            totalItemsCart={3}
            totalWishlists={4 }
          />
          <main className="pointer-events-auto">
            {children}
            <Toaster position="top-right" />
            <Analytics />
            <SpeedInsights />
          </main>
          <Footer />
        </body>
      </Providers>
    </html>
  );
}

"use client";

import { CurrencyProvider } from "@/context/currency-context";
import { SessionProvider } from "next-auth/react";

interface Props {
  children: React.ReactNode;
}

export default function Providers({ children }: Props) {
  return <SessionProvider>
    <CurrencyProvider>
      {children}
    </CurrencyProvider>
  </SessionProvider>;
}

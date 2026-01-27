"use client";

import { HeroUIProvider, ToastProvider } from "@heroui/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { SessionProvider } from "next-auth/react";
import { ReactNode, useState } from "react";
import { onErrorHandler } from "../lib/axios/responseHandler";

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnWindowFocus: false,
        retry: false,
        throwOnError(error) {
          onErrorHandler(error)
          return false
        }
      },
      mutations: {
        onError: onErrorHandler
      }
    }
  }));

  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <HeroUIProvider>
          <ToastProvider />
          {children}
        </HeroUIProvider>
      </QueryClientProvider>
    </SessionProvider>
  );
}
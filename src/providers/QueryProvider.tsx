'use client';

import { useState } from 'react';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const CONFIGURATION_TIME = 3 * 60 * 1000;

function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(() => {
    return new QueryClient({
      defaultOptions: {
        queries: {
          staleTime: CONFIGURATION_TIME
        }
      }
    });
  });

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

export default QueryProvider;

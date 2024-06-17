'use client';
import { SaasProvider } from '@saas-ui/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactNode, useState } from 'react';

export default function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <SaasProvider>{children}</SaasProvider>
    </QueryClientProvider>
  );
}

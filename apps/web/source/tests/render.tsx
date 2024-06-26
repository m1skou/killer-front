import { setupIntl } from '@killerparty/intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, type RenderResult } from '@testing-library/react';
import { type ReactNode } from 'react';
import { Toaster } from 'sonner';

import { Routes } from '@/app/routes';
import { QueryConfig } from '@/constants/config';
import { ModalProvider } from '@/context/modal';
import { SidebarProvider } from '@/context/sidebar';

interface RenderParams {
  component?: ReactNode;
  route?: string;
}

setupIntl('fr-FR');

export function renderWithProviders({
  component = <Routes />,
  route = '/',
}: RenderParams = {}): RenderResult {
  window.history.pushState({}, '', route);

  const queryClient = new QueryClient(QueryConfig);

  return render(
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SidebarProvider>{component}</SidebarProvider>
      </ModalProvider>
      <Toaster />
    </QueryClientProvider>,
  );
}

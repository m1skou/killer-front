import { setupIntl } from '@killerparty/intl';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';

import { Notification } from '@/components/Notification';
import { QueryConfig } from '@/constants/config';
import { ModalProvider } from '@/context/modal';
import { SidebarProvider } from '@/context/sidebar';

import { Routes } from './routes';

import '@/assets/styles/app.module.css';

const NODE_APP = document.getElementById('app');

const root = createRoot(NODE_APP!);

setupIntl(localStorage.getItem('locale'));

function App(): JSX.Element {
  const queryClient = new QueryClient(QueryConfig);

  return (
    <QueryClientProvider client={queryClient}>
      <ModalProvider>
        <SidebarProvider>
          <Routes />
        </SidebarProvider>
      </ModalProvider>
      <Notification />
    </QueryClientProvider>
  );
}

root.render(<App />);

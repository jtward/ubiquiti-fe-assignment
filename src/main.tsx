import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes } from 'react-router';

import './index.css';

// translations
import { LocalizationProvider } from './localization/LocalizationProvider.tsx';

// query client
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>
);

import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router';

import './index.css';

// translations
import { LocalizationProvider } from './localization/LocalizationProvider.tsx';

// query client
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
const queryClient = new QueryClient();

// device pages use device search provider to retain state across navigation
import { DeviceSearchProvider } from './pages/devices-list/contexts/DeviceSearchProvider.tsx';

// layouts
import { DefaultPageLayout } from './layouts/defaultPageLayout/defaultPageLayout.tsx';

// pages
import { DevicesListPage } from './pages/devices-list/DevicesListPage.tsx';
import { DevicesDetailsPage } from './pages/device-details/DeviceDetailsPage.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LocalizationProvider>
      <QueryClientProvider client={queryClient}>
        <DeviceSearchProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Navigate to="/devices" replace />} />
              <Route element={<DefaultPageLayout />}>
                <Route path="/devices" element={<DevicesListPage />} />
                <Route path="/devices/:deviceId" element={<DevicesDetailsPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </DeviceSearchProvider>
      </QueryClientProvider>
    </LocalizationProvider>
  </StrictMode>
);

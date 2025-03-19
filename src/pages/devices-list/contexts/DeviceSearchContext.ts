import { createContext } from 'react';
import { Device, DeviceLine } from '../../../data-hooks/useDevicesQuery';

interface DeviceSearchContextType {
  setSearch: (search: string) => void;
  resetSearch: () => void;
  setLayout: (layout: string) => void;
  setFilters: (filters: string) => void;
  onSearchSubmit: () => void;
  search: string;
  layout: string;
  filters: string;
  filteredDevices: Device[];
  autocompleteDevices: Device[];
  displayedDevices: Device[];
  productLines: DeviceLine[];
}

export const DeviceSearchContext = createContext<DeviceSearchContextType | undefined>(undefined);

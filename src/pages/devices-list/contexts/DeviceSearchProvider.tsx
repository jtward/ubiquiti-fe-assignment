import React, { useMemo, useState, ReactNode, useCallback, useEffect, useRef } from 'react';

import { DeviceSearchContext } from './DeviceSearchContext';
import useDevicesQuery, { Device, DeviceLine } from '../../../data-hooks/useDevicesQuery';

interface DeviceSearchProviderProps {
  children: ReactNode;
}

const getDevicesSearchFilter = (inputValue: string) => {
  const lowerCasedInputValue = inputValue.toLowerCase();

  return function devicesFilter(device: Device) {
    return (
      !inputValue ||
      (device.product?.name.toLowerCase().includes(lowerCasedInputValue) ?? false) ||
      (device.product?.abbrev.toLowerCase().includes(lowerCasedInputValue) ?? false) ||
      (device.line?.name.toLowerCase().includes(lowerCasedInputValue) ?? false)
    );
  };
};

export const DeviceSearchProvider: React.FC<DeviceSearchProviderProps> = ({ children }) => {
  const { data } = useDevicesQuery();

  const [search, setSearch] = useState('');
  const [submittedSearch, setSubmittedSearch] = useState('');
  const [layout, setLayout] = useState('list');
  const [filters, setFilters] = useState('');

  // keep submittedSearch in a ref so that we can access it in resetSearch
  // without a new callback being created
  const submittedSearchRef = useRef(submittedSearch);
  useEffect(() => {
    submittedSearchRef.current = submittedSearch;
  }, [submittedSearch]);

  const resetSearch = useCallback(() => {
    console.log(submittedSearchRef.current);
    setSearch(submittedSearchRef.current);
  }, [setSearch]);

  const filteredDevices = useMemo(() => {
    const devices = data?.devices ?? [];
    const filtersArray = filters.split(',').filter((f) => f !== '');
    return devices.filter(({ line }) => {
      if (filtersArray.length > 0) {
        return filtersArray.some((filterId) => line?.id === filterId);
      } else {
        return true;
      }
    });
  }, [data?.devices, filters]);

  const displayedDevices = useMemo(() => {
    return filteredDevices.filter(getDevicesSearchFilter(submittedSearch));
  }, [filteredDevices, submittedSearch]);

  const productLines = useMemo(() => {
    const devices = data?.devices ?? [];
    const lines: Record<string, DeviceLine> = {};
    devices.forEach((device) => {
      if (device.line && !lines[device.line.id]) {
        lines[device.line.id] = device.line;
      }
    });
    return Object.values(lines).sort(
      ({ name: a }, { name: b}) => a.localeCompare(b)
    );
  }, [data?.devices]);

  const autocompleteDevices = useMemo(() => {
    return filteredDevices.filter(getDevicesSearchFilter(search));
  }, [filteredDevices, search]);

  const onSearchSubmit = useCallback(() => {
    setSubmittedSearch(search);
  }, [search]);

  const value = useMemo(() => {
    return {
      search,
      layout,
      filters,
      filteredDevices,
      autocompleteDevices,
      displayedDevices,
      productLines,
      setSearch,
      resetSearch,
      setLayout,
      setFilters,
      onSearchSubmit,
    };
  }, [search, layout, filters, filteredDevices, autocompleteDevices, displayedDevices, productLines, resetSearch, onSearchSubmit]);

  return (
    <DeviceSearchContext value={value}>
      {children}
    </DeviceSearchContext>
  );
};

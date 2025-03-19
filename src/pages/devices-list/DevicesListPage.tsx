import { use } from 'react';
import { DeviceSearchContext } from './contexts/DeviceSearchContext';
import { DevicesList } from './components/DevicesList';
import { DevicesGrid } from './components/DevicesGrid';
import { FilterHeader } from './components/FilterHeader';

export const DevicesListPage = () => {
  const { layout } = use(DeviceSearchContext)!;

  return (
    <>
      <FilterHeader />
      {layout === 'list' && <DevicesList />}
      {layout === 'grid' && <DevicesGrid />}
    </>
  );
};

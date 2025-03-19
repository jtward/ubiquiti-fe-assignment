import styled from 'styled-components';
import useDevicesQuery from '../../../data-hooks/useDevicesQuery';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { use } from 'react';
import { IconButton } from '../../../components/IconButton';
import { ListIcon } from '../../../icons/ListIcon';
import { GridIcon } from '../../../icons/GridIcon';
import { DeviceSearchContext } from '../contexts/DeviceSearchContext';
import { SearchInput } from './SearchInput';
import { FiltersButton } from './FiltersButton';
import { TEXT_INPUT_COLOR_ASIDE } from '../../../colors';

const StyledForm = styled.form`
  padding: 16px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const InputAndCountContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
`;

const DevicesCount = styled.div`
  font-size: 12px;
  color: ${TEXT_INPUT_COLOR_ASIDE};
`;

const LayoutAndFilterContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
`;

const ButtonGroup = styled.div`
  display: flex;
`;

export const FilterHeader = () => {
  const { t } = use(LocalizationContext)!;
  const { autocompleteDevices, layout, setLayout } = use(DeviceSearchContext)!;
  const { isPending, isError } = useDevicesQuery();

  const handleSetActiveLayoutList = () => {
    setLayout('list');
  };

  const handleSetActiveLayoutGrid = () => {
    setLayout('grid');
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <StyledForm onSubmit={handleSubmit}>
       <InputAndCountContainer>
        <SearchInput />
        <DevicesCount>
          {!isPending && !isError && t('devices.form.devicesCount', { count: `${autocompleteDevices.length}` })}
        </DevicesCount>
      </InputAndCountContainer>
      <LayoutAndFilterContainer>
        <ButtonGroup>
          <IconButton isActive={layout==='list'} onClick={handleSetActiveLayoutList}><ListIcon /></IconButton>
          <IconButton isActive={layout==='grid'} onClick={handleSetActiveLayoutGrid}><GridIcon /></IconButton>
        </ButtonGroup>
        <FiltersButton />
      </LayoutAndFilterContainer>
    </StyledForm>
  );
};

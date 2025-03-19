import styled from 'styled-components';
import useDevicesQuery from '../../../data-hooks/useDevicesQuery';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { use } from 'react';
import { DeviceSearchContext } from '../contexts/DeviceSearchContext';
import { LIST_BACKGROUND_COLOR, LIST_HEADING_COLOR, LIST_ITEM_BACKGROUND_COLOR_HOVER, LIST_ITEM_BORDER_COLOR, LIST_ITEM_COLOR, LIST_ITEM_OUTLINE_COLOR_FOCUS } from '../../../colors';
import { NavLink } from 'react-router';

const ScrollContainer = styled.div`
  width: 100%;
  padding: 0 32px;
  flex: 1;
  overflow-y: auto;
`;

const StyledHeaderRow = styled.div`
  position: sticky;
  top: 0;
  display: flex;
  align-items: center;
  height: 32px;
  font-family: 'UI Sans_v9 Bold', sans-serif;
  font-weight: 500;

  color: ${LIST_HEADING_COLOR};
  background-color: ${LIST_BACKGROUND_COLOR};
  border-bottom: 1px solid ${LIST_ITEM_BORDER_COLOR};
`;

const StyledList = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledListItem = styled.li`
`;

const StyledListItemLink = styled(NavLink)`
  display: flex;
  align-items: center;
  height: 32px;
  color: inherit;
  text-decoration: none;

  border-top: 1px solid transparent;
  border-bottom: 1px solid ${LIST_ITEM_BORDER_COLOR};

  color: ${LIST_ITEM_COLOR};
  
  &:hover {
    background-color: ${LIST_ITEM_BACKGROUND_COLOR_HOVER};
  }

  &:focus {
    border-top: 1px solid ${LIST_ITEM_OUTLINE_COLOR_FOCUS};
    border-bottom: 1px solid ${LIST_ITEM_OUTLINE_COLOR_FOCUS};
    outline: none;
  }
`;

const StyledColumnHeading = styled.div`
  display: inline-block;
  text-align: start;
  width: calc((100% - 36px) / 2);
  &:nth-child(1) {
    width: 36px;
  }
`;

const StyledListItemColumn = styled.div`
  display: inline-block;
  padding: 0;
  width: calc((100% - 36px) / 2);
  &:nth-child(1) {
    text-align: center;
    width: 36px;
  }
`;

const StyledIconImage = styled.img`
  vertical-align: middle;
`;

const ListHeader = () => {
  const { t } = use(LocalizationContext)!;

  return (
    <StyledHeaderRow>
      <StyledColumnHeading></StyledColumnHeading>
      <StyledColumnHeading>{t('devices.list.columnTitle.productLine')}</StyledColumnHeading>
      <StyledColumnHeading>{t('devices.list.columnTitle.name')}</StyledColumnHeading>
    </StyledHeaderRow>
  );
};

const LoadingOrErrorIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 128px;
`;

const List = () => {
  const { t } = use(LocalizationContext)!;
  const { displayedDevices } = use(DeviceSearchContext)!;
  const { isPending, error } = useDevicesQuery();

  if (isPending) {
    return (
      <LoadingOrErrorIndicator>
        {t('general.loadingText')}
      </LoadingOrErrorIndicator>
    );
  }

  if (error) {
    return (
      <LoadingOrErrorIndicator>
        {t('devices.list.loadingError', { error: error.message })}
      </LoadingOrErrorIndicator>
    );
  }

  if (displayedDevices.length === 0) {
    return (
      <LoadingOrErrorIndicator>
        {t('devices.list.noResults')}
      </LoadingOrErrorIndicator>
    );
  }

  return (
    <StyledList>
      {displayedDevices.map((device) => {
        const iconUrlAtSize = (size: number) => {
          if (!device.icon) return '';
          return `https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_${size}x${size}.png`;
        };

        return (
          <StyledListItem key={device.id}>
            <StyledListItemLink to={`/devices/${device.id}`}>
              <StyledListItemColumn>
                {device.icon ?
                  <StyledIconImage
                    srcSet={`${iconUrlAtSize(25)}, ${iconUrlAtSize(32)} 1.5x, ${iconUrlAtSize(51)} 2x`}
                    src={iconUrlAtSize(25)}
                    alt={t('devices.list.deviceImageAltText')}
                    width="20"
                    height="20"
                  /> :
                  null}
              </StyledListItemColumn>
              <StyledListItemColumn>{device.line?.name}</StyledListItemColumn>
              <StyledListItemColumn>{device.product?.name}</StyledListItemColumn>
            </StyledListItemLink>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};

export const DevicesList = () => {
  return (
    <ScrollContainer>
      <ListHeader />
      <List />
    </ScrollContainer>
  );
};

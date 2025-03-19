import styled from 'styled-components';
import useDevicesQuery from '../../../data-hooks/useDevicesQuery';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { use } from 'react';
import { DeviceSearchContext } from '../contexts/DeviceSearchContext';
import { PRODUCT_CARD_BACKGROUND_COLOR, PRODUCT_CARD_BACKGROUND_COLOR_HOVER, PRODUCT_CARD_BORDER_COLOR, PRODUCT_CARD_CHIP_BACKGROUND_COLOR, PRODUCT_CARD_CHIP_COLOR, PRODUCT_CARD_COLOR, PRODUCT_CARD_COLOR_ASIDE, PRODUCT_CARD_COLOR_HOVER, PRODUCT_CARD_IMAGE_BACKGROUND_COLOR, PRODUCT_CARD_IMAGE_BACKGROUND_COLOR_HOVER, PRODUCT_CARD_OUTLINE_COLOR_FOCUS } from '../../../colors';
import { NavLink } from 'react-router';

const ScrollContainer = styled.div`
  width: 100%;
  padding: 16px 32px;
  flex: 1;
  overflow-y: auto;
`;

const StyledList = styled.ul`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(216px, 1fr));
  align-items: center;
  justify-items: center;
  gap: 16px;
  margin: 0;
  padding: 0;
  list-style: none;
`;

const StyledListItem = styled.li`
  width: 216px;
`;

const StyledListItemLink = styled(NavLink)`
  display: block;
  position: relative;
  color: inherit;
  text-decoration: none;
  border-radius: 8px;

  padding-bottom: 8px;
  border: 1px solid ${PRODUCT_CARD_BORDER_COLOR};

  color: ${PRODUCT_CARD_COLOR};
  background-color: ${PRODUCT_CARD_BACKGROUND_COLOR};

  &:hover {
    color: ${PRODUCT_CARD_COLOR_HOVER};
    background-color: ${PRODUCT_CARD_BACKGROUND_COLOR_HOVER};
  }

  &:focus {
    outline: none;
    border: 1px solid ${PRODUCT_CARD_OUTLINE_COLOR_FOCUS};
  }
`;

const ListItemImageContainer = styled.div`
  width: 100%;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 8px;
  border-top-left-radius: inherit;
  border-top-right-radius: inherit;

  background-color: ${PRODUCT_CARD_IMAGE_BACKGROUND_COLOR};

  :hover > & {
    background-color: ${PRODUCT_CARD_IMAGE_BACKGROUND_COLOR_HOVER};
  }
`;

const StyledIconImage = styled.img`
  vertical-align: middle;
`;

const StyledProductLine = styled.div`
  position: absolute;
  top: 3px;
  right: 3px;
  padding: 2px 4px;
  font-size: 12px;
  line-height: 1;
  color: ${PRODUCT_CARD_CHIP_COLOR};
  background-color: ${PRODUCT_CARD_CHIP_BACKGROUND_COLOR};
  border-radius: 4px;
`;

const StyledName = styled.div`
  height: 40px;
  margin: 0 8px;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

const StyledSku = styled.div`
  height: 16px;
  margin: 0 8px;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: ${PRODUCT_CARD_COLOR_ASIDE};
`;

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
              <ListItemImageContainer>
                {device.icon ?
                  <StyledIconImage
                    srcSet={`${iconUrlAtSize(101)}, ${iconUrlAtSize(128)} 1.5x, ${iconUrlAtSize(256)} 2x`}
                    src={iconUrlAtSize(101)}
                    alt={t('devices.list.deviceImageAltText')}
                    width="84"
                    height="84"
                  /> :
                  null}
              </ListItemImageContainer>
              <StyledProductLine>{device.line?.name}</StyledProductLine>
              <StyledName>{device.product?.name}</StyledName>
              <StyledSku>{device.shortnames?.join(', ')}</StyledSku>
            </StyledListItemLink>
          </StyledListItem>
        );
      })}
    </StyledList>
  );
};

export const DevicesGrid = () => {
  return (
    <ScrollContainer>
      <List />
    </ScrollContainer>
  );
};

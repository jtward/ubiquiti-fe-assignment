import { useParams } from 'react-router';
import styled from 'styled-components';
import { DeviceSearchContext } from '../../devices-list/contexts/DeviceSearchContext';
import useDevicesQuery from '../../../data-hooks/useDevicesQuery';
import { use, useState } from 'react';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { JSON_BACKGROUND_COLOR, JSON_COLOR, PRODUCT_DETAIL_ITEM_TITLE_COLOR, PRODUCT_DETAIL_ITEM_VALUE_COLOR, PRODUCT_LINE_NAME_COLOR, PRODUCT_TITLE_COLOR } from '../../../colors';
import { CTAButton } from './CTAButton';

const LoadingOrErrorIndicator = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 128px;
`;

const DeviceDetailsSection = styled.section`
  margin-top: 12px;
  display: flex;
  justify-content: center;
  gap: 32px;
`;

const DeviceDetailsWrapper = styled.div`
  width: 444px;
`;

const DeviceImage = styled.img`
  max-width: 292px;
  aspect-ratio: 1 / 1;
  background-color: #F9FAFA;
`;

const ProductTitle = styled.h1`
  margin: 0;
  font-size: 20px;
  font-weight: 500;
  font-family: 'UI Sans_v9 Bold', sans-serif;
  color: ${PRODUCT_TITLE_COLOR};
`;

const ProductLineTitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: 400;
  color: ${PRODUCT_LINE_NAME_COLOR};
`;

const DataGrid = styled.div`
  display: grid;
  margin-top: 16px;
  margin-bottom: 16px;
  grid-template-columns: 128px 1fr;
  gap: 4px;
  font-size: 14px;
}`;

const StyledDT = styled.dt`
  margin: 0;
  color: ${PRODUCT_DETAIL_ITEM_TITLE_COLOR};
`;

const StyledDD = styled.dd`
  margin: 0;
  color: ${PRODUCT_DETAIL_ITEM_VALUE_COLOR};
`;

const StyledDeviceJsonPre = styled.pre`
  max-height: 400px;
  overflow: scroll;
  padding: 4px;
  border-radius: 4px;
  color: ${JSON_COLOR};
  background-color: ${JSON_BACKGROUND_COLOR};
`;

export const DeviceDetails = () => {
  const { deviceId } = useParams();
  const { t } = use(LocalizationContext)!;
  const { filteredDevices } = use(DeviceSearchContext)!;
  const { isPending, error } = useDevicesQuery();
  const device = filteredDevices.find(({ id }) => id === deviceId);
  const [isJsonViewOpen, setIsJsonViewOpen] = useState(false);

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

  if (!device) {
    return (
      <LoadingOrErrorIndicator>
        {t('devices.list.loadingError')}
      </LoadingOrErrorIndicator>
    );
  }

  const iconUrlAtSize = (size: number) => {
    if (!device.icon) return '';
    return `https://static.ui.com/fingerprint/ui/icons/${device.icon.id}_${size}x${size}.png`;
  };

  const handleToggleJsonView = () => {
    setIsJsonViewOpen(!isJsonViewOpen);
  };

  return (
    <DeviceDetailsSection>
      {device.icon ?
        <DeviceImage
          srcSet={`${iconUrlAtSize(257)}, ${iconUrlAtSize(512)} 1.5x, ${iconUrlAtSize(512)} 2x`}
          src={iconUrlAtSize(257)}
          alt={t('devices.detail.deviceImageAltText')}
          width="292"
          height="292"
        /> :
        null}
      <DeviceDetailsWrapper>
        <ProductTitle>
          {device.product?.name}
        </ProductTitle>
        <ProductLineTitle>
          {device.line?.name}
        </ProductLineTitle>
        <DataGrid>
          {device.line?.name && (
            <>
              <StyledDT>{t('devices.detail.lineNameTitle')}</StyledDT>
              <StyledDD>{device.line.name}</StyledDD>
            </>
          )}
          {device.line?.id && (
            <>
              <StyledDT>{t('devices.detail.lineIdTitle')}</StyledDT>
              <StyledDD>{device.line.id}</StyledDD>
            </>
          )}
          {device.product?.name && (
            <>
              <StyledDT>{t('devices.detail.nameTitle')}</StyledDT>
              <StyledDD>{device.product.name}</StyledDD>
            </>
          )}
          {device.sku && (
            <>
              <StyledDT>{t('devices.detail.skuTitle')}</StyledDT>
              <StyledDD>{device.sku}</StyledDD>
            </>
          )}
          {device.maxPower && (
            <>
            <StyledDT>{t('devices.detail.maxPowerTitle')}</StyledDT>
            <StyledDD>{device.maxPower} W</StyledDD>
          </>
          )}
          {device.maxSpeed && (
            <>
            <StyledDT>{t('devices.detail.speedTitle')}</StyledDT>
            <StyledDD>{device.maxSpeed} Mbps</StyledDD>
          </>
          )}
          {device.numberOfPorts && (
            <>
            <StyledDT>{t('devices.detail.numberOfPortsTitle')}</StyledDT>
            <StyledDD>{device.numberOfPorts}</StyledDD>
          </>
          )}
        </DataGrid>
        <CTAButton onClick={handleToggleJsonView}>
          {isJsonViewOpen ? t('devices.detail.hideJsonButtonText') : t('devices.detail.showJsonButtonText')}
        </CTAButton>
        {isJsonViewOpen && (
          <StyledDeviceJsonPre>
            {JSON.stringify(JSON.parse(device.json), null, '  ')}
          </StyledDeviceJsonPre>
        )}
      </DeviceDetailsWrapper>
    </DeviceDetailsSection>
  );
};

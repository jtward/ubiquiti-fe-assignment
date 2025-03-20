import styled from 'styled-components';
import { BackIcon } from '../../../icons/BackIcon';
import { IconButton } from '../../../components/IconButton';
import { BUTTON_BACKGROUND_COLOR, BUTTON_BACKGROUND_COLOR_HOVER, BUTTON_COLOR, BUTTON_COLOR_HOVER, BUTTON_OUTLINE_COLOR_FOCUS } from '../../../colors';
import { ForwardIcon } from '../../../icons/ForwardIcon';
import { NavLink, useParams } from 'react-router';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { DeviceSearchContext } from '../../devices-list/contexts/DeviceSearchContext';
import { use } from 'react';

const StyledHeader = styled.header`
  padding: 18px 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledNavLink = styled(NavLink)`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  min-width: fit-content;
  height: 32px;
  border: none;
  border-radius: 4px;
  text-decoration: none;

  box-shadow: 0px 0px 1px rgba(0, 0, 0, 0.06), 0px 8px 24px rgba(0, 0, 0, 0.08);

  color: ${BUTTON_COLOR};
  background-color: ${BUTTON_BACKGROUND_COLOR};
  border: 1px solid ${BUTTON_BACKGROUND_COLOR};

  &:hover {
    color: ${BUTTON_COLOR_HOVER};
    background-color: ${BUTTON_BACKGROUND_COLOR_HOVER};
    border: 1px solid ${BUTTON_BACKGROUND_COLOR_HOVER};
  }

  &:focus {
    border: 1px solid ${BUTTON_OUTLINE_COLOR_FOCUS};
    outline: none;
  }
`;

const StyledBackNavLink = styled(StyledNavLink)`
  padding-right: 6px;
`;

const NextPreviousButtonsWrapper = styled.div`
  display: flex;
  gap: 4px;
`;

export const NavigationHeader = () => {

  const { deviceId } = useParams();
  const { t } = use(LocalizationContext)!;
  const { displayedDevices } = use(DeviceSearchContext)!;
  const deviceIndex = displayedDevices.findIndex(({ id }) => id === deviceId);

  const previousDeviceId = deviceIndex !== -1 && deviceIndex !== 0 && (displayedDevices[deviceIndex - 1].id);
  const nextDeviceId = deviceIndex !== -1 && deviceIndex !== displayedDevices.length - 1 && (displayedDevices[deviceIndex + 1].id);
  return (
    <StyledHeader>
      <StyledBackNavLink to="/devices">
        <BackIcon />{t('devices.detail.backButtonTitle')}
      </StyledBackNavLink>
      <NextPreviousButtonsWrapper>
        {previousDeviceId ?
          <StyledNavLink to={`/devices/${previousDeviceId}`}>
            <BackIcon />
          </StyledNavLink> :
          <IconButton isActive={false} disabled><BackIcon /></IconButton>
        }
        {nextDeviceId ?
          <StyledNavLink to={`/devices/${nextDeviceId}`}>
            <ForwardIcon />
          </StyledNavLink> :
          <IconButton isActive={false} disabled><ForwardIcon /></IconButton>
        }
      </NextPreviousButtonsWrapper>
    </StyledHeader>
  );
};

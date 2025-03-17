import styled from 'styled-components';
import { use } from 'react';
import { LocalizationContext } from '../../../localization/LocalizationContext';
import { LogoNavLink } from './LogoNavLink';
import { HEADER_BACKGROUND_COLOR, HEADER_COLOR } from '../../../colors';

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 32px;
  color: ${HEADER_COLOR};
  background-color: ${HEADER_BACKGROUND_COLOR};
`;

const LeftItems = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const PageTitle = styled.h1`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  color: inherit;
`;

const PageSubtitle = styled.h2`
  margin: 0;
  font-size: 14px;
  font-weight: normal;
  color: inherit;
`;

export const HeaderBar = () => {
  const { t } = use(LocalizationContext)!;

  return (
    <StyledHeader>
      <LeftItems>
        <LogoNavLink to="/devices" />
        <PageTitle>{t('devices.pageTitle')}</PageTitle>
      </LeftItems>
      <PageSubtitle>James Ward</PageSubtitle>
    </StyledHeader>
  );
};

import styled from 'styled-components';
import { HeaderBar } from './components/HeaderBar';
import { Outlet } from 'react-router';

const PageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0;
  height: 100%;
`;

export const DefaultPageLayout = () => {
  return (
    <>
      <PageWrapper>
        <HeaderBar />
        <Outlet />
      </PageWrapper>
    </>
  );
};

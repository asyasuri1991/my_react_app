import { Outlet } from 'react-router-dom';
import { PageWrapper } from './page-wrapper';

export const Root = () => {
  return (
    <PageWrapper>
      <Outlet />
    </PageWrapper>
  );
};

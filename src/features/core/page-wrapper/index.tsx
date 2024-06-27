import { ReactNode } from 'react';
import { BaseContainer } from './base-container/';
import { ContentWrapper } from './content-wrapper';
import { Header } from './header';
import { MainContent } from './main-content';
import { Footer } from './footer';

export const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <BaseContainer>
      <Header />
      <ContentWrapper>
        <MainContent>{children}</MainContent>
      </ContentWrapper>
      <Footer />
    </BaseContainer>
  );
};

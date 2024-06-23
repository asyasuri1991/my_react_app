import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../features/core/Root';
import { ArticlePage } from '../pages/ArticlePage';
import { MainPage } from '../pages/MainPage';
import { BreakfastPage } from '../pages/BreakfastPage';
import { SaladsPage } from 'pages/SaladsPage';
import { ROUTES } from './routes';
import { DessertsPage } from 'pages/DessertsPage';
import { SnacksPage } from 'pages/SnacksPage';
import { LunchPage } from 'pages/LunchPage';
import { SaucePage } from 'pages/SaucePage';
import { ProfilePage } from 'pages/ProfilePage';


export const router = createBrowserRouter([
  {
    path: ROUTES.ROOT,
    element: <Root />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: `${ROUTES.BREAKFAST}`,
        element: <BreakfastPage />,
      },
      {
        path: `${ROUTES.SALADS}`,
        element: <SaladsPage />,
      },
      {
        path: `${ROUTES.DESSERTS}`,
        element: <DessertsPage />,
      },
      {
        path: `${ROUTES.SNACKS}`,
        element: <SnacksPage />,
      },
      {
        path: `${ROUTES.LUNCH}`,
        element: <LunchPage />,
      },
      {
        path: `${ROUTES.SAUCE}`,
        element: <SaucePage />,
      },
      {
        path: `${ROUTES.ARTICLE}/:id`,
        element: <ArticlePage />,
      },
      {
        path:ROUTES.PROFILE,
        element: <ProfilePage />,
      }
    ],
  },
]);

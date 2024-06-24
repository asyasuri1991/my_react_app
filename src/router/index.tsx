import { createBrowserRouter } from 'react-router-dom';
import { Root } from '../features/core/Root';
import { ArticlePage } from '../pages/ArticlePage';
import { MainPage } from '../pages/MainPage';
import { ROUTES } from './routes';
import { ProfilePage } from 'pages/ProfilePage';
import { SectionPage } from 'pages/SectionPage';

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
        path: `${ROUTES.ARTICLE}/:id`,
        element: <ArticlePage />,
      },
      {
        path:`${ROUTES.PROFILE}/:userId`,
        element: <ProfilePage />,
      },
      {
        path:`${ROUTES.SECTION}/:section`,
        element: <SectionPage />,
      }
    ],
  },
]);

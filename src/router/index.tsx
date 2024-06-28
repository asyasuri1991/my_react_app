import { createHashRouter } from 'react-router-dom';
import { Root } from '../features/core/Root';
import { ArticlePage } from '../pages/ArticlePage';
import { MainPage } from '../pages/MainPage';
import { ROUTES } from './routes';
import { ProfilePage } from 'pages/ProfilePage';
import { SectionPage } from 'pages/SectionPage';

export const router = createHashRouter([
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
        path:`${ROUTES.PROFILE}/:user_id`,
        element: <ProfilePage />,
      },
      {
        path:`${ROUTES.SECTION}/:section`,
        element: <SectionPage />,
      }
    ],
  },
]);

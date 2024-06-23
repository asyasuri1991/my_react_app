import { Provider } from 'react-redux';
import { RouterProvider } from 'react-router-dom';
import './global.css';
import { router } from './router';
import { rootStore } from './store';

export const App = () => {
  return (
    <Provider store={rootStore}>
      <RouterProvider router={router} />
    </Provider>
  );
};

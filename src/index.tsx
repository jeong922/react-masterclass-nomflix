import React from 'react';
import './index.css';
import NotFound from './page/NotFound';
import Home from './page/Home';
import Tv from './page/Tv';
import Movie from './page/Movie';
import Search from './page/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import App from './App';
import MyList from './page/MyList';
import ProtectedPath from './page/ProtectedPath';
import Login from './page/Login';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'tv/*', element: <Tv /> },
      { path: 'movies/*', element: <Movie /> },
      {
        path: 'my-list/*',
        element: (
          <ProtectedPath>
            <MyList />
          </ProtectedPath>
        ),
      },
      { path: 'search/*', element: <Search /> },
    ],
  },
]);

const container = document.getElementById('root');
const root = createRoot(container!);

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

export default App;

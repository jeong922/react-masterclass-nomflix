import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import NotFound from './page/NotFound';
import Home from './page/Home';
import Tv from './page/Tv';
import Movie from './page/Movie';
import Search from './page/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <NotFound />,
    children: [
      { index: true, element: <Home /> },
      { path: 'tv/*', element: <Tv /> },
      { path: 'movies/*', element: <Movie /> },
      { path: 'search/*', element: <Search /> },
    ],
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
  document.getElementById('root')
);

export default App;

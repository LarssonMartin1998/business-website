import ReactDOM from 'react-dom/client';
import { createBrowserRouter, Outlet, RouterProvider, ScrollRestoration, } from "react-router-dom";

import Home from 'pages/Home';
import Contact from 'pages/Contact';
import Blog from 'pages/Blog';
import ErrNotFound from 'pages/ErrNotFound';

import './index.css';

function Root() {
  return (
    <>
      <Outlet />
      <ScrollRestoration />
    </>
  );
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={
    createBrowserRouter([
      {
        element: <Root />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: 'contact',
            element: <Contact />
          },
          {
            path: 'blog',
            element: <Blog />
          },
          {
            path: '*',
            element: <ErrNotFound />
          },
        ],
      },
    ])
  } />
);

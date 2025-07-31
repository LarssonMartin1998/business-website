import { BrowserRouter, Routes, } from 'react-router-dom';

import { CreateTypedRoute, } from 'design-system/pages';
import Home from 'pages/Home';
import Contact from 'pages/Contact';
import Blog from 'pages/Blog';
import ErrNotFound from 'pages/ErrNotFound';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {CreateTypedRoute({
          path: '/',
          children: [
            CreateTypedRoute({ index: true, element: <Home /> }),
            CreateTypedRoute({ path: 'contact', element: <Contact /> }),
            CreateTypedRoute({ path: 'blog', element: <Blog /> }),
            CreateTypedRoute({ path: '*', element: <ErrNotFound /> }),
          ],
        })}
      </Routes>
    </BrowserRouter>
  );
}

export default App;

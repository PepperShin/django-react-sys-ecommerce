import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Router.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';

createRoot(document.getElementById('root')).render(
  // dev_5_Fruit
  <AuthProvider>
    <RouterProvider router={router}/>
  </AuthProvider>
);

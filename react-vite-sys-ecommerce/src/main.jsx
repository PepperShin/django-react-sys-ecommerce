import { createRoot } from 'react-dom/client';
import { RouterProvider } from 'react-router-dom';
import { router } from './route/Router.jsx';
import { AuthProvider } from './contexts/AuthContext.jsx';
import { CartProvider } from './contexts/CartContext.jsx';
import { ShopProvider } from './contexts/ShopContext.jsx';

createRoot(document.getElementById('root')).render(
    // dev_5_Fruit
    //dev_10_Fruit
    //dev_6_Fruit
    <AuthProvider>
        <ShopProvider>
            <CartProvider>
                <RouterProvider router={router} />
            </CartProvider>
        </ShopProvider>
    </AuthProvider>
);

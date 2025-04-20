import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";
import CheckoutPage from "../pages/CheckoutPage";
import FavoritesPage from "../pages/FavoritesPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <HomePage />,
            },
            {
                path: 'products',
                element: <ProductsPage />,
            },
            {
                path: 'cart',
                element: <CartPage />,
            },
            {
                path: 'checkout',
                element: <CheckoutPage />,
            },
            {
                path: 'favorites',
                element: <FavoritesPage />,
            },
            {
                path: '*',
                element: <div><h1>Something went wrong</h1> <p>Something went wrong.</p></div>,
            },
        ],
    },
]);

export default router;

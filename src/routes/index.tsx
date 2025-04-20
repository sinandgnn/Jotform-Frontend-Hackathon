import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/HomePage";
import App from "../App";
import ProductsPage from "../pages/ProductsPage";
import CartPage from "../pages/CartPage";

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
        ],
    },
]);

export default router;

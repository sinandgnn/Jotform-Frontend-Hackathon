import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import theme from "./theme";
import router from "./routes";
import { CartProvider } from "./contexts/CartContext";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <ThemeProvider theme={theme}>
            <CartProvider>
                <CssBaseline />
                <RouterProvider router={router} />
            </CartProvider>
        </ThemeProvider>
    </React.StrictMode>
);

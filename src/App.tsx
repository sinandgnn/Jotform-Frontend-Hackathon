import { AppBar, Toolbar, Typography, Container, Badge, Box, Button } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Outlet } from "react-router-dom";
import { useCart } from "./contexts/CartContext";

const App = () => {
    const { getTotalItems } = useCart();

    return (
        <>
            <AppBar position="static" sx={{ borderRadius: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography
                        variant="h6"
                        component={Link}
                        to="/"
                        sx={{
                            color: 'white',
                            textDecoration: 'none'
                        }}
                    >
                        Jotform E-Ticaret
                    </Typography>

                    <Box sx={{ display: 'flex' }}>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/"
                        >
                            Ana Sayfa
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/products"
                        >
                            Ürünler
                        </Button>
                        <Button
                            color="inherit"
                            component={Link}
                            to="/cart"
                            startIcon={
                                <Badge badgeContent={getTotalItems()} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            }
                        />
                    </Box>
                </Toolbar>
            </AppBar>
            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default App;
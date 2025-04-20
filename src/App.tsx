import { AppBar, Toolbar, Typography, Container, Badge, Box, Button, Drawer, IconButton, List, ListItem, ListItemText } from "@mui/material";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link, Outlet } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu'; // Menü ikonu
import { useCart } from "./contexts/CartContext";
import { useState } from "react";

const App = () => {
    const { getTotalItems } = useCart();
    const [openDrawer, setOpenDrawer] = useState(false); // Drawer durumunu kontrol etmek için state

    const toggleDrawer = (open: boolean) => () => {
        setOpenDrawer(open);
    };

    return (
        <>
            <AppBar position="static" sx={{ borderRadius: 0 }}>
                <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    {/* Sol üstteki menü butonu */}
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        onClick={toggleDrawer(true)}
                        sx={{ display: { sm: 'none' } }} // Sadece mobilde göster
                    >
                        <MenuIcon />
                    </IconButton>

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

                    {/* Desktop menüsü */}
                    <Box sx={{ display: 'flex' }}>

                        <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
                            <Button color="inherit" component={Link} to="/">
                                Ana Sayfa
                            </Button>
                            <Button color="inherit" component={Link} to="/products">
                                Ürünler
                            </Button>
                        </Box>


                        <Button
                            color="inherit"
                            component={Link}
                            to="/cart"
                            sx={{ pr: 0 }}
                            startIcon={
                                <Badge badgeContent={getTotalItems()} color="secondary">
                                    <ShoppingCartIcon />
                                </Badge>
                            }
                        />
                    </Box>


                </Toolbar>
            </AppBar>

            {/* Mobil Drawer */}
            <Drawer
                anchor="left"
                open={openDrawer}
                onClose={toggleDrawer(false)}
                sx={{
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: 250,
                        boxSizing: 'border-box',
                    },
                }}
            >
                <List sx={{ padding: 0 }}>
                    <ListItem component={Link} to="/" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Ana Sayfa" />
                    </ListItem>
                    <ListItem component={Link} to="/products" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Ürünler" />
                    </ListItem>
                    <ListItem component={Link} to="/cart" onClick={toggleDrawer(false)}>
                        <ListItemText primary="Sepet" />
                    </ListItem>
                </List>
            </Drawer>

            <Container sx={{ mt: 4 }}>
                <Outlet />
            </Container>
        </>
    );
};

export default App;

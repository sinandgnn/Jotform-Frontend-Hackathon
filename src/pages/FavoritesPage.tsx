import React from 'react';
import {
    Container,
    Typography,
    Divider,
    Grid,
    Box,
    Button,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import { useFavorites } from '../contexts/FavoritesContext';
import { useCart } from '../contexts/CartContext';

const FavoritesPage: React.FC = () => {
    const { favorites } = useFavorites();
    const { addToCart, removeFromCart, getItemQuantity } = useCart();
    const navigate = useNavigate();

    const handleContinueShopping = () => {
        navigate('/products');
    };

    // Favori ürün yok
    if (favorites.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                    Favorilerim
                </Typography>

                <Divider sx={{ mb: 3 }} />

                <Paper sx={{ p: 4, mt: 3, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Favori listeniz boş
                    </Typography>
                    <Typography color="text.secondary">
                        Henüz favorilere ürün eklemediniz.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleContinueShopping}
                        sx={{ mt: 2 }}
                    >
                        Alışverişe Başla
                    </Button>
                </Paper>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Favorilerim
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Typography variant="h6" gutterBottom>
                {favorites.length} ürün favori listenizde
            </Typography>

            <Grid container spacing={4}>
                {favorites.map((product) => (
                    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={product.id}>
                        <ProductCard
                            product={product}
                            onAddToCart={addToCart}
                            onRemoveFromCart={removeFromCart}
                            quantity={getItemQuantity(product.id)}
                        />
                    </Grid>
                ))}
            </Grid>

            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    onClick={handleContinueShopping}
                >
                    Alışverişe Devam Et
                </Button>
            </Box>
        </Container>
    );
};

export default FavoritesPage;
import {
    Typography, Grid, Box, Button,
    Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useCart } from '../contexts/CartContext';
import { useFavorites } from '../contexts/FavoritesContext';

const FeaturedFavorites = () => {
    const navigate = useNavigate();
    const { addToCart, removeFromCart, getItemQuantity } = useCart();
    const { favorites } = useFavorites();
    const displayedFavorites = favorites.slice(0, 4);

    const handleViewAllFavorites = () => {
        navigate('/favorites');
    };

    // Favoriler boşsa
    if (favorites.length === 0) {
        return (
            <Box sx={{ mt: 6, mb: 4 }}>
                <Typography variant="h5" sx={{ my: 3 }}>
                    Favori Ürünleriniz
                </Typography>

                <Paper sx={{
                    p: 4,
                    textAlign: 'center',
                    backgroundColor: 'primary.light'
                }}>
                    <Typography variant="h6" gutterBottom>
                        Henüz favori ürün eklemediniz
                    </Typography>
                    <Typography color="text.secondary" sx={{ mb: 2 }}>
                        Beğendiğiniz ürünleri favorilere ekleyerek burada görebilirsiniz.
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => navigate('/products')}
                    >
                        Ürünleri Keşfet
                    </Button>
                </Paper>
            </Box>
        );
    }

    return (
        <Box sx={{ mt: 6, mb: 4 }}>
            <Typography variant="h5" sx={{ my: 3 }}>
                Favori Ürünleriniz
            </Typography>

            <Grid container spacing={4}>
                {displayedFavorites.map((product) => (
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

            {favorites.length > 4 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                    <Button
                        variant="outlined"
                        color="primary"
                        size="large"
                        onClick={handleViewAllFavorites}
                    >
                        Tüm Favorileri Gör
                    </Button>
                </Box>
            )}
        </Box>
    );
};

export default FeaturedFavorites;
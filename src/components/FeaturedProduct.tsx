import React from 'react';
import {
    Typography, Grid, Box, Button, CircularProgress
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Product } from '../types';
import ProductCard from './ProductCard';
import { useCart } from '../contexts/CartContext';

interface FeaturedProductsProps {
    products: Product[];
    loading: boolean;
    cartItems: Product[];
    error: string | null;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({
    products,
    loading,
    error
}) => {
    const navigate = useNavigate();
    const { addToCart, removeFromCart, getItemQuantity } = useCart();

    const handleViewAllProducts = () => {
        navigate('/products');
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Typography color="error" sx={{ my: 2 }}>
                {error}
            </Typography>
        );
    }

    return (
        <>
            <Typography variant="h5" sx={{ my: 3 }}>
                Öne Çıkan Ürünler
            </Typography>

            <Grid container spacing={4}>
                {products.map((product) => (
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

            <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
                <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    onClick={handleViewAllProducts}
                >
                    Tüm Ürünleri Gör
                </Button>
            </Box>
        </>
    );
};

export default FeaturedProducts;
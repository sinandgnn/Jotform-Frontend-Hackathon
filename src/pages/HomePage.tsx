import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import { fetchProducts } from '../api/jotform';
import { Product } from '../types';
import FeaturedProducts from '../components/FeaturedProduct';
import { useCart } from '../contexts/CartContext';
import FeaturedFavorites from '../components/FeaturedFavorites';

const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Cart Context
    const { cartItems } = useCart();

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            try {
                setLoading(true);
                const products = await fetchProducts();
                setFeaturedProducts(products.slice(0, 8));
                setError(null);
            } catch (err) {
                setError('Ürünler yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedProducts();
    }, []);

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
                Jotform E-Ticaret Uygulaması
            </Typography>

            <Divider />

            {/* Öne çıkan ürünler */}
            <FeaturedProducts
                products={featuredProducts}
                loading={loading}
                error={error}
                cartItems={cartItems}
            />

            <Divider />

            {/* Favori ürünler */}
            <FeaturedFavorites />
        </Container>
    );
};

export default HomePage;
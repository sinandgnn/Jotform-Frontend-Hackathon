import React, { useState, useEffect } from 'react';
import { Container, Typography, Divider } from '@mui/material';
import { fetchProducts } from '../api/jotform';
import { Product } from '../types';
import FeaturedProducts from '../components/FeaturedProduct';

const HomePage: React.FC = () => {
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const loadFeaturedProducts = async () => {
            try {
                setLoading(true);
                const products = await fetchProducts();
                setFeaturedProducts(products);
//                setFeaturedProducts(products.slice(0, 5)); to show only 5
                setError(null);
            } catch (err) {
                setError('Ürünler yüklenirken bir hata oluştu.');
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        loadFeaturedProducts();
    }, []);

    const handleAddToCart = (product: Product) => {
        console.log(`${product.name} sepete eklendi`);
    };

    const handleRemoveFromCart = (productId: string) => {
        console.log(`${productId} sepetten silindi`);
    };

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
                onAddToCart={handleAddToCart}
                onRemoveFromCart={handleRemoveFromCart}
            />
        </Container>
    );
};

export default HomePage;
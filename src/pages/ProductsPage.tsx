import React, { useState, useEffect } from 'react';
import {
    Container,
    Typography,
    Divider,
    Grid,
    CircularProgress,
    Box,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    TextField,
    SelectChangeEvent,
    Pagination,
    Stack
} from '@mui/material';
import { fetchProducts } from '../api/jotform';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import { useCart } from '../contexts/CartContext';

const ProductsPage: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [sortBy, setSortBy] = useState<string>('default');

    // Pagination
    const [page, setPage] = useState<number>(1);
    const [productsPerPage] = useState<number>(12);

    // Cart Context
    const { addToCart, removeFromCart, getItemQuantity } = useCart();

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                const fetchedProducts = await fetchProducts();
                setProducts(fetchedProducts);
                setFilteredProducts(fetchedProducts);
                setError(null);
            } catch (err) {
                setError('Ürünler yüklenirken bir hata oluştu.');
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    // filtreleme sıralama
    useEffect(() => {
        let result = [...products];

        // Arama
        if (searchTerm) {
            result = result.filter(
                product =>
                    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    product.description.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        // Sıralama
        switch (sortBy) {
            case 'price-asc':
                result.sort((a, b) => a.price - b.price);
                break;
            case 'price-desc':
                result.sort((a, b) => b.price - a.price);
                break;
            case 'name-asc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
            case 'name-desc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
            default:
                break;
        }

        setFilteredProducts(result);
        setPage(1);
    }, [products, searchTerm, sortBy]);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleSortChange = (event: SelectChangeEvent) => {
        setSortBy(event.target.value);
    };

    if (error) {
        return (
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Typography color="error" sx={{ my: 2 }}>
                    {error}
                </Typography>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Tüm Ürünler
            </Typography>

            <Divider sx={{ mb: 3 }} />

            {/* Filtre ve Sıralama */}
            <Grid container spacing={2} sx={{ mb: 4 }}>
                <Grid size={{ xs: 12, md: 8 }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Ürün ara..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FormControl fullWidth variant="outlined">
                        <InputLabel>Sıralama</InputLabel>
                        <Select
                            value={sortBy}
                            onChange={handleSortChange}
                            label="Sıralama"
                        >
                            <MenuItem value="default">Varsayılan</MenuItem>
                            <MenuItem value="price-asc">Ucuzdan Pahalıya</MenuItem>
                            <MenuItem value="price-desc">Pahalıdan Ucuza</MenuItem>
                            <MenuItem value="name-asc">İsim (A-Z)</MenuItem>
                            <MenuItem value="name-desc">İsim (Z-A)</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>

            {/* Ürün Listesi */}
            {loading ?
                <Container maxWidth="lg" sx={{ my: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'center', my: 8 }}>
                        <CircularProgress />
                    </Box>
                </Container>
                :
                filteredProducts.length === 0 ? (
                    <Typography variant="h6" sx={{ textAlign: 'center', my: 8 }}>
                        Aramanıza uygun ürün bulunamadı.
                    </Typography>
                ) : (
                    <>
                        <Grid container spacing={4}>
                            {filteredProducts
                                .slice((page - 1) * productsPerPage, page * productsPerPage)
                                .map((product) => (
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

                        {/* Pagination */}
                        <Stack spacing={2} sx={{ mt: 4, display: 'flex', alignItems: 'center' }}>
                            <Pagination
                                count={Math.ceil(filteredProducts.length / productsPerPage)}
                                page={page}
                                onChange={(_event, value) => setPage(value)}
                                color="primary"
                                size="large"
                            />
                            <Typography variant="body2" color="text.secondary">
                                Toplam {filteredProducts.length} ürün bulundu
                            </Typography>
                        </Stack>
                    </>
                )}
        </Container>
    );
};

export default ProductsPage;
import React, { useState } from 'react';
import { Box, Typography, Button, Paper, CircularProgress } from '@mui/material';
import { Product } from '../types';
import { fetchProducts } from '../api/jotform';

const TestComponent: React.FC = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [testComplete, setTestComplete] = useState<boolean>(false);

    const handleTestApi = async () => {
        setTestComplete(false);

        try {
            const data = await fetchProducts();
            setProducts(data.slice(0, 10));
            setTestComplete(true);
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <Box sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>API Test</Typography>

            <Button
                variant="contained"
                color="primary"
                onClick={handleTestApi}
                sx={{ mb: 3 }}
            >
                Test
            </Button>

            {testComplete && (
                <Box>
                    <Typography variant="h6" sx={{ mb: 2, color: 'green' }}>
                        API bağlantısı başarılı! İlk 2 ürün:
                    </Typography>

                    {products.map((product) => (
                        <Paper key={product.id} sx={{ p: 2, mb: 2 }}>
                            <Typography variant="h6">{product.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                                {product.description}
                            </Typography>
                            <Typography variant="body1" sx={{ fontWeight: 'bold', mt: 1 }}>
                                Fiyat: {product.price} TL
                            </Typography>
                            <Box sx={{ mt: 1 }}>
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    style={{ maxWidth: '100px', maxHeight: '100px' }}
                                />
                            </Box>
                        </Paper>
                    ))}
                </Box>
            )}
        </Box>
    );
};

export default TestComponent;
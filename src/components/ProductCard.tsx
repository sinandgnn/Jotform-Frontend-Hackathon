import React, { useState } from 'react';
import {
    Card, CardMedia, CardContent, CardActions,
    Typography, Button, IconButton, Stack,
    Box, Modal, Paper, Grid, Divider
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';
import { Product } from '../types';

interface ProductCardProps {
    product: Product;
    quantity: number;
    onAddToCart: (product: Product) => void;
    onRemoveFromCart: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({
    product,
    quantity,
    onAddToCart,
    onRemoveFromCart,
}) => {
    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    return (
        <>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    sx={{ height: 200, objectFit: 'contain', pt: 2 }}
                    image={product.image}
                    alt={product.name}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                    <Typography gutterBottom variant="h6" component="h2">
                        {product.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {product.description.substring(0, 100)}
                        {product.description.length > 100 ? '...' : ''}
                    </Typography>
                    <Typography variant="h6" color="primary">
                        {product.price} ₺
                    </Typography>
                </CardContent>
                <CardActions>
                    <Box sx={{ width: '100%' }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleOpenModal}
                            fullWidth
                            sx={{ mb: 2 }}
                        >
                            Detay
                        </Button>

                        {quantity === 0 ? (
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={<AddIcon />}
                                onClick={() => onAddToCart(product)}
                                fullWidth
                            >
                                Sepete Ekle
                            </Button>
                        ) : (
                            <Stack direction="row" spacing={1} sx={{ width: '100%', justifyContent: 'center' }}>
                                <IconButton
                                    color="primary"
                                    onClick={() => onRemoveFromCart(product.id)}
                                >
                                    <RemoveIcon />
                                </IconButton>
                                <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center' }}>
                                    {quantity}
                                </Typography>
                                <IconButton
                                    color="primary"
                                    onClick={() => onAddToCart(product)}
                                >
                                    <AddIcon />
                                </IconButton>
                            </Stack>
                        )}
                    </Box>
                </CardActions>
            </Card>

            {/* Detay Modal */}
            <Modal
                open={modalOpen}
                onClose={handleCloseModal}
            >
                <Paper
                    sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: { xs: '90%', sm: '80%', md: '70%' },
                        maxWidth: 800,
                        maxHeight: '90vh',
                        p: 4,
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                        <Typography variant="h5" component="h2">
                            Ürün Detayları
                        </Typography>
                        <IconButton onClick={handleCloseModal} size="small">
                            <CloseIcon />
                        </IconButton>
                    </Box>

                    <Divider sx={{ mb: 3 }} />

                    <Grid container spacing={3}>
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Box
                                component='img'
                                src={product.image}
                                alt={product.name}
                                style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h6" gutterBottom>
                                {product.name}
                            </Typography>

                            <Typography variant="h5" color="primary" sx={{ mb: 2 }}>
                                {product.price} ₺
                            </Typography>

                            <Typography variant="body1" paragraph>
                                {product.description}
                            </Typography>

                            <Divider sx={{ my: 2 }} />

                            <Typography variant="subtitle2" gutterBottom>
                                Ürün Kodu: {product.id}
                            </Typography>

                            <Typography variant="subtitle2" gutterBottom>
                                Stok Durumu: {product.maxQuantity > 0 ? 'Stokta var' : 'Stokta yok'}
                            </Typography>

                            <Box sx={{ mt: 3 }}>
                                {quantity === 0 ? (
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        startIcon={<AddIcon />}
                                        onClick={() => {
                                            onAddToCart(product);
                                            handleCloseModal();
                                        }}
                                        fullWidth
                                    >
                                        Sepete Ekle
                                    </Button>
                                ) : (
                                    <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => onRemoveFromCart(product.id)}
                                            startIcon={<RemoveIcon />}
                                        >
                                            Azalt
                                        </Button>
                                        <Typography variant="body1">
                                            {quantity}
                                        </Typography>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => onAddToCart(product)}
                                            startIcon={<AddIcon />}
                                        >
                                            Artır
                                        </Button>
                                    </Stack>
                                )}
                            </Box>
                        </Grid>
                    </Grid>
                </Paper >
            </Modal >
        </>
    );
};

export default ProductCard;
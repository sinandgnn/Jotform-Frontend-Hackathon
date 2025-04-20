import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Card,
    CardContent,
    CardMedia,
    IconButton,
    Button,
    Divider,
    Paper,
    useTheme,
    useMediaQuery
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import { useCart } from '../contexts/CartContext';

const CartPage: React.FC = () => {
    const {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getTotalItems,
        getTotalPrice
    } = useCart();

    const navigate = useNavigate();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const handleCheckout = () => {
        navigate('/checkout');
    };

    const handleContinueShopping = () => {
        navigate('/products');
    };

    // Sepet boş
    if (cartItems.length === 0) {
        return (
            <Container maxWidth="lg" sx={{ my: 4 }}>
                <Typography variant="h4" component="h1" gutterBottom>
                    Sepetim
                </Typography>
                <Paper sx={{ p: 4, mt: 3, textAlign: 'center' }}>
                    <Typography variant="h6" gutterBottom>
                        Sepetiniz boş
                    </Typography>
                    <Typography color="text.secondary">
                        Sepete henüz ürün eklemediniz.
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
            <Typography variant="h4" component="h1" >
                Sepetim
            </Typography>
            <Typography variant='h6' gutterBottom>
                {getTotalItems()} ürün
            </Typography>

            <Grid container spacing={4}>
                {/* Ürün listesi */}
                <Grid size={{ xs: 12, md: 8 }}>
                    {cartItems.map((item) => (
                        <Card
                            key={item.id}
                            sx={{
                                display: 'flex',
                                mb: 3,
                                flexDirection: isMobile ? 'column' : 'row',
                            }}
                        >
                            <CardMedia
                                component="img"
                                sx={{
                                    width: isMobile ? '100%' : 150,
                                    height: isMobile ? 150 : 150,
                                    objectFit: 'contain',
                                    p: 1
                                }}
                                image={item.image}
                                alt={item.name}
                            />
                            <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
                                <Typography component="h5" variant="h6">
                                    {item.name}
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                                    {item.description.substring(0, 100)}
                                    {item.description.length > 100 ? '...' : ''}
                                </Typography>
                                <Box sx={{ display: 'flex', alignItems: 'center', mt: 'auto' }}>
                                    <Typography variant="h6" color="primary" sx={{ mr: 2 }}>
                                        {item.price} ₺
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <IconButton
                                            onClick={() => removeFromCart(item.id)}
                                            size="small"
                                        >
                                            <RemoveIcon />
                                        </IconButton>
                                        <Typography sx={{ mx: 1 }}>
                                            {item.quantity}
                                        </Typography>
                                        <IconButton
                                            onClick={() => addToCart(item)}
                                            size="small"
                                        >
                                            <AddIcon />
                                        </IconButton>
                                        <IconButton
                                            onClick={() => {
                                                // tüm adetleri sil
                                                for (let i = 0; i < item.quantity; i++) {
                                                    removeFromCart(item.id);
                                                }
                                            }}
                                            size="small"
                                            color="error"
                                            sx={{ ml: 2 }}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Box>
                                </Box>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Toplam: {(item.price * item.quantity).toFixed(2)} ₺
                                </Typography>
                            </CardContent>
                        </Card>
                    ))}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                        <Button
                            variant="outlined"
                            color="primary"
                            onClick={handleContinueShopping}
                        >
                            Alışverişe Devam Et
                        </Button>
                        <Button
                            variant="outlined"
                            color="error"
                            onClick={clearCart}
                            startIcon={<DeleteIcon />}
                        >
                            Sepeti Temizle
                        </Button>
                    </Box>
                </Grid>

                {/* Sipariş özeti */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Sipariş Özeti
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                            <Typography>Ürün Toplamı ({getTotalItems()} ürün)</Typography>
                            <Typography>{getTotalPrice().toFixed(2)} ₺</Typography>
                        </Box>

                        <Divider sx={{ my: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Toplam</Typography>
                            <Typography variant="h6" color="primary">
                                {getTotalPrice().toFixed(2)} ₺
                            </Typography>
                        </Box>

                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                            onClick={handleCheckout}
                            sx={{ mt: 2 }}
                        >
                            Ödeme Adımına Geç
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container >
    );
};

export default CartPage;
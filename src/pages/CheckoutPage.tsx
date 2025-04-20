import React from 'react';
import {
    Container,
    Typography,
    Box,
    Grid,
    Paper,
    Divider,
    List,
    ListItem,
    ListItemText,
    Button,
    TextField
} from '@mui/material';
import { useCart } from '../contexts/CartContext';
import { useNavigate } from 'react-router-dom';

const CheckoutPage: React.FC = () => {
    const { cartItems, getTotalPrice } = useCart();
    const navigate = useNavigate();

    const [formData, setFormData] = React.useState({
        fullName: '',
        address: ''
    });

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        console.log('Form gönderildi:', formData);
        alert('Ödemeniz başarıyla tamamlandı!');
        navigate('/');
    };

    return (
        <Container maxWidth="lg" sx={{ my: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 2 }}>
                Ödeme
            </Typography>

            <Divider sx={{ mb: 3 }} />

            <Grid container spacing={4}>
                {/* Sol taraf - Ödeme formu */}
                <Grid size={{ xs: 12, md: 8 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Müşteri Bilgileri
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <Box component="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Ad Soyad"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        margin="normal"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12 }}>
                                    <TextField
                                        required
                                        fullWidth
                                        label="Adres"
                                        name="address"
                                        multiline
                                        rows={2}
                                        value={formData.address}
                                        onChange={handleChange}
                                        margin="normal"
                                    />
                                </Grid>
                            </Grid>
                        </Box>
                    </Paper>
                </Grid>

                {/* Sağ taraf - Sipariş özeti */}
                <Grid size={{ xs: 12, md: 4 }}>
                    <Paper sx={{ p: 3 }}>
                        <Typography variant="h6" gutterBottom>
                            Sipariş Özeti
                        </Typography>
                        <Divider sx={{ mb: 2 }} />

                        <List sx={{ mb: 2 }}>
                            {cartItems.map((item) => (
                                <ListItem key={item.id} sx={{ px: 0 }}>
                                    <ListItemText
                                        primary={item.name}
                                        secondary={`${item.quantity} x ${item.price} ₺`}
                                    />
                                    <Typography variant="body2">
                                        {(item.price * item.quantity).toFixed(2)} ₺
                                    </Typography>
                                </ListItem>
                            ))}
                        </List>

                        <Divider sx={{ mb: 2 }} />

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                            <Typography variant="h6">Toplam</Typography>
                            <Typography variant="h6" color="primary">
                                {getTotalPrice().toFixed(2)} ₺
                            </Typography>
                        </Box>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            size="large"
                        >
                            Ödeme Yap
                        </Button>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
};

export default CheckoutPage;
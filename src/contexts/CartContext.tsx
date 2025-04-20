import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface CartItem extends Product {
    quantity: number;
}

interface CartContextType {
    cartItems: CartItem[];
    addToCart: (product: Product) => void;
    removeFromCart: (productId: string) => void;
    clearCart: () => void;
    getItemQuantity: (productId: string) => number;
    getTotalItems: () => number;
    getTotalPrice: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
    children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
    // Başlangıçta localStorage'dan yükle
    const [cartItems, setCartItems] = useState<CartItem[]>(() => {
        try {
            const storedCart = localStorage.getItem('cart');
            return storedCart ? JSON.parse(storedCart) : [];
        } catch (error) {
            console.error('Sepet verisi yüklenirken hata oluştu:', error);
            return [];
        }
    });

    // Sepetteki değişiklikleri localStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem('cart', JSON.stringify(cartItems));
        } catch (error) {
            console.error('Sepet verisi kaydedilirken hata oluştu:', error);
        }
    }, [cartItems]);

    // Ürün ekle
    const addToCart = (product: Product) => {
        setCartItems(currentItems => {
            // Ürün sepette var mı
            const existingItem = currentItems.find(item => item.id === product.id);

            if (existingItem) {
                // varsa miktar artır
                return currentItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                // yoksa yeni ekle
                return [...currentItems, { ...product, quantity: 1 }];
            }
        });
    };

    // Sepetten ürün çıkar
    const removeFromCart = (productId: string) => {
        setCartItems(currentItems => {
            // Ürünü bul
            const existingItem = currentItems.find(item => item.id === productId);

            if (existingItem && existingItem.quantity === 1) {
                // 1 ise, sepetten tamamen çıkar
                return currentItems.filter(item => item.id !== productId);
            } else if (existingItem) {
                // 1'den fazlaysa, miktarı azalt
                return currentItems.map(item =>
                    item.id === productId
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                );
            }

            return currentItems;
        });
    };

    // Sepeti temizle
    const clearCart = () => {
        setCartItems([]);
        localStorage.removeItem('cart');
    };

    // Bir ürünün sepetteki miktarı
    const getItemQuantity = (productId: string) => {
        const item = cartItems.find(item => item.id === productId);
        return item ? item.quantity : 0;
    };

    // Sepetteki toplam ürün sayısı
    const getTotalItems = () => {
        return cartItems.reduce((total, item) => total + item.quantity, 0);
    };

    // Sepetteki toplam fiyat
    const getTotalPrice = () => {
        return cartItems.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        getItemQuantity,
        getTotalItems,
        getTotalPrice
    };

    return (
        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = (): CartContextType => {
    const context = useContext(CartContext);
    if (context === undefined) {
        throw new Error('useCart used within a CartProvider');
    }
    return context;
};
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';
import { Product } from '../types';

interface FavoritesContextType {
    favorites: Product[];
    addToFavorites: (product: Product) => void;
    removeFromFavorites: (productId: string) => void;
    isFavorite: (productId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

interface FavoritesProviderProps {
    children: ReactNode;
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children }) => {
    // Başlangıçta localStorage'dan favori ürünleri yükle
    const [favorites, setFavorites] = useState<Product[]>(() => {
        try {
            const storedFavorites = localStorage.getItem('favorites');
            return storedFavorites ? JSON.parse(storedFavorites) : [];
        } catch (error) {
            console.error('Favoriler yüklenirken hata oluştu:', error);
            return [];
        }
    });

    // Favorilerdeki değişiklikleri localStorage'a kaydet
    useEffect(() => {
        try {
            localStorage.setItem('favorites', JSON.stringify(favorites));
        } catch (error) {
            console.error('Favoriler kaydedilirken hata oluştu:', error);
        }
    }, [favorites]);

    // Ürünü favorilere ekle
    const addToFavorites = (product: Product) => {
        setFavorites(currentFavorites => {
            // Ürün zaten favorilerde var mı kontrol et
            const isAlreadyFavorite = currentFavorites.some(item => item.id === product.id);

            if (isAlreadyFavorite) {
                return currentFavorites; // Zaten favorilerdeyse bir şey yapma
            } else {
                return [...currentFavorites, product]; // Favorilere ekle
            }
        });
    };

    // Favorilerden ürün çıkar
    const removeFromFavorites = (productId: string) => {
        setFavorites(currentFavorites =>
            currentFavorites.filter(item => item.id !== productId)
        );
    };

    // Ürün favorilerde mi kontrol et
    const isFavorite = (productId: string) => {
        return favorites.some(item => item.id === productId);
    };

    const value = {
        favorites,
        addToFavorites,
        removeFromFavorites,
        isFavorite
    };

    return (
        <FavoritesContext.Provider value={value}>
            {children}
        </FavoritesContext.Provider>
    );
};

export const useFavorites = (): FavoritesContextType => {
    const context = useContext(FavoritesContext);
    if (context === undefined) {
        throw new Error('useFavorites must be used within a FavoritesProvider');
    }
    return context;
};
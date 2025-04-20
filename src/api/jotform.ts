import axios from "axios";
import { Product, ProductApiResponse, ProductApiItem } from "../types";

const FORM_ID = '251073758789978';
const API_KEY = 'a9298bf9a9bb28007a626bf3b7e0f635';
const BASE_URL = 'https://api.jotform.com';
const API_URL = `https://api.jotform.com/form/${FORM_ID}/payment-info?apiKey=${API_KEY}`;

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<ProductApiResponse>(API_URL);

        // API'den gelen veriyi dönüştürme
        const products: Product[] = response.data.content.products.map((item: ProductApiItem) => {
            const { maxQuantity } = parseProductOptions(item.options || '[]');

            return {
                id: item.pid,
                name: item.name || 'Ürün ismi yok.',
                price: parseFloat(item.price || '0'),
                image: extractImageUrl(item.images || '[]'),
                description: item.description || 'Ürün açıklaması yok.',
                quantity: 0,
                maxQuantity
            };
        });

        return products;
    } catch (error) {
        console.error('Ürünler getirilirken hata oluştu:', error);
        throw error;
    }
};

const parseProductOptions = (optionsString: string): { maxQuantity: number } => {
    try {
        const options = JSON.parse(optionsString);
        if (Array.isArray(options) && options.length > 0) {
            const quantityOption = options.find(opt => opt.type === 'quantity');
            if (quantityOption && quantityOption.properties) {
                const quantities = quantityOption.properties.split('\n');
                const maxQuantity = parseInt(quantities[quantities.length - 1]) || 10;
                return { maxQuantity };
            }
        }
        return { maxQuantity: 10 };
    } catch (e) {
        return { maxQuantity: 10 };
    }
};

const extractImageUrl = (imagesString: string): string => {
    try {
        const images = JSON.parse(imagesString);
        return Array.isArray(images) && images.length > 0
            ? images[0]
            : 'https://picsum.photos/150/150';
    } catch (e) {
        return 'https://picsum.photos/150/150';
    }
};
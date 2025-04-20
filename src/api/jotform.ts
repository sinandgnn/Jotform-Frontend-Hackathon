import axios from "axios";
import { Product, ProductApiResponse, ProductApiItem } from "../types";

const FORM_ID = '251073758789978';
const API_KEY = 'a9298bf9a9bb28007a626bf3b7e0f635';
const BASE_URL = 'https://api.jotform.com';
const API_URL = `https://api.jotform.com/form/${FORM_ID}/payment-info?apiKey=${API_KEY}`;

export const fetchProducts = async (): Promise<Product[]> => {
    try {
        const response = await axios.get<ProductApiResponse>(API_URL);

        const products: Product[] = response.data.content.products.map((item: ProductApiItem) => {
            const { maxQuantity, specialPrices, optionsData } = parseProductOptions(item.options || '[]');

            let productPrice = parseFloat(item.price || '0');
            const hasSpecialPricing = item.hasSpecialPricing === '1';

            if (hasSpecialPricing && specialPrices.length > 0) {
                productPrice = specialPrices[0];
            }

            return {
                id: item.pid,
                name: item.name || 'Ürün ismi yok.',
                price: productPrice,
                image: extractImageUrl(item.images || '[]'),
                description: item.description || 'Ürün açıklaması yok.',
                quantity: 0,
                maxQuantity,
                hasSpecialPricing: hasSpecialPricing,
                rawOptions: item.options || '[]',
                optionsData: optionsData
            };
        });

        return products;
    } catch (error) {
        console.error('Ürünler getirilirken hata oluştu:', error);
        throw error;
    }
};

const parseProductOptions = (optionsString: string): {
    maxQuantity: number;
    specialPrices: number[];
    optionsData: {
        name: string;
        options: string[];
    } | null;
} => {
    try {
        const options = JSON.parse(optionsString);
        let maxQuantity = 10;
        let specialPrices: number[] = [];
        let optionsData: { name: string; options: string[] } | null = null;

        if (Array.isArray(options) && options.length > 0) {
            // Miktar seçeneğini bul
            const quantityOption = options.find(opt => opt.type === 'quantity');
            if (quantityOption && quantityOption.properties) {
                const quantities = quantityOption.properties.split('\n');
                maxQuantity = parseInt(quantities[quantities.length - 1]) || 10;
            }

            // Özel fiyatlandırma seçeneğini bul
            const specialPricingOption = options.find(opt =>
                opt.specialPricing === true ||
                (typeof opt.specialPrices === 'string' && opt.specialPrices.length > 0)
            );

            if (specialPricingOption) {
                // Özel fiyatları al
                if (specialPricingOption.specialPrices) {
                    specialPrices = specialPricingOption.specialPrices
                        .split(',')
                        .map((price: string) => parseFloat(price) || 0);
                }

                // Seçenek adı ve değerlerini al
                if (specialPricingOption.name && specialPricingOption.properties) {
                    optionsData = {
                        name: specialPricingOption.name,
                        options: specialPricingOption.properties.split('\n')
                    };
                }
            }
        }

        return {
            maxQuantity,
            specialPrices,
            optionsData
        };
    } catch (e) {
        return {
            maxQuantity: 10,
            specialPrices: [],
            optionsData: null
        };
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

export const getProductPrice = (product: Product, selectedOptionIndex = 0): number => {
    if (!product.hasSpecialPricing) {
        return product.price;
    }

    try {
        if (product.rawOptions) {
            const options = JSON.parse(product.rawOptions);
            const customOption = options.find((opt: any) =>
                opt.specialPricing === true ||
                (typeof opt.specialPrices === 'string' && opt.specialPrices.length > 0)
            );

            if (customOption && customOption.specialPrices) {
                const specialPrices = customOption.specialPrices.split(',');
                if (specialPrices.length > selectedOptionIndex) {
                    return parseFloat(specialPrices[selectedOptionIndex]) || 0;
                }
            }
        }
    } catch (error) {
        console.error('Ürün fiyatı hesaplanırken hata:', error);
    }

    return product.price;
};

export async function submitFormResponse(userData: { fullName: string, address: string }) {
    try {
        const fields = await getFormFields();
        const fullNameId = findFieldIdByText(fields, 'Full Name');
        const addressId = findFieldIdByText(fields, 'Address');

        const formData = new FormData();
        formData.append(`submission[${fullNameId}]`, userData.fullName);
        formData.append(`submission[${addressId}]`, userData.address);

        const response = await fetch(`${BASE_URL}/form/${FORM_ID}/submissions?apiKey=${API_KEY}`, {
            method: 'POST',
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`Form gönderimi başarısız: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Form gönderimi hatası:', error);
        throw error;
    }
}


async function getFormFields() {
    const response = await fetch(`${BASE_URL}/form/${FORM_ID}/questions?apiKey=${API_KEY}`);
    const data = await response.json();
    return data.content;
}

function findFieldIdByText(fields: any, text: string): string | null {
    for (const id in fields) {
        if (fields[id].text === text) {
            return id;
        }
    }
    return null;
}

export interface ProductApiResponse {
    responseCode: number;
    message: string;
    content: {
        question_id: string;
        products: ProductApiItem[];
    };
}

export interface ProductApiItem {
    pid: string;
    name: string;
    price: string;
    images: string;
    description: string;
    options: string;
    hasSpecialPricing: string;
    hasQuantity: string;
    showSubtotal: string;
    order: string;
    [key: string]: string | undefined;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
    description: string;
    quantity: number;
    maxQuantity: number;
    hasSpecialPricing?: boolean;
    rawOptions?: string;
    optionsData?: {
        name: string;
        options: string[];
    } | null;
}
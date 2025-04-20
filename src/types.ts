export interface ProductApiResponse {
    responseCode: number;
    message: string;
    content: {
        question_id: string;
        products: ProductApiItem[];
    };
    duration: string;
    info: null;
    "limit-left": number;
}

export interface ProductApiItem {
    pid: string;
    name: string;
    description: string;
    price: string;
    images: string; // JSON string içinde URL
    options: string; // JSON string içinde ürün seçenekleri
    hasQuantity: string;
    showSubtotal: string;
    order: string;
    [key: string]: string | undefined;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    description: string;
    image: string;
    quantity: number;
    maxQuantity: number;
}
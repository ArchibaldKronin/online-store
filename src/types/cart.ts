export type CartItem = {
    id: number;
    productId: number;
    title: string;
    price: number;
    quantity: number;
}

export type Cart = CartItem[];

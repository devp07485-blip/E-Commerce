import { Product } from "./product.model";

export class CartItem {
    constructor(
        public id: number,
        public name: string,
        public price: number,
        public quantity: number
    ) { }
}


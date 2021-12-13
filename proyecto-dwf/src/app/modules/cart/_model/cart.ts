import { Product } from "../../product/_model/product";

export class Cart{
    gtin: number;
    id_cart: number;
    product: Product;
    quantity: number;  
    rfc: string;

    constructor() {
        this.gtin = 0;
        this.id_cart = 0;
        this.product = new Product();
        this.quantity = 0;
        this.rfc = "";
    }
}
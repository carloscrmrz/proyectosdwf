import { Product } from "../../product/_model/product";

export class Cart{
    id_product: number;
    id_cart: number;
    product: Product;
    quantity: number;  
    rfc: string;

    constructor() {
        this.id_product = 0;
        this.id_cart    = 0;
        this.quantity   = 0;
        this.product    = new Product();
        this.rfc        = "";
    }
}
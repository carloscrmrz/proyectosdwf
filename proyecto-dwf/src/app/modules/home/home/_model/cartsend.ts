
export class CartSend{
    id_product: number;
    quantity: number;  
    rfc: string;

    constructor() {
        this.id_product = 0;
        this.quantity   = 0;
        this.rfc        = "";
    }
}
export class Product {
    id?: number;
    name: string;
    price: number;
    url: string;
    description: string;
    quantity?: number;
    stock?:number;
    item_id?: number;

    constructor () {
        this.name=""
        this.price=0
        this.quantity=0
        this.stock=0
        this.url=""
        this.description=""
    }
}
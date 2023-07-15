import { Product } from "./product";
export class Command {
    id!: number;
    matricule!: string;
    isConfirmed!: boolean;
    customerFirstName!: string;
    customerLastName!:string;
    Phone!:string;
    ShippingMethod!:string;
    commandStatus!:string;
    city!:string;
    state!:string;
    zipCode!:string;
    customerEmail!: string;
    shippingAddress!: string;
    paymentMethod!: string;
    createdAt!: Date;
    modifiedAt!: Date;
    productCommands!: ProductCommand[];
  }
  
  export class ProductCommand {
    id?: number;
    quantity?: number;
    priceTotal?: number;
    createdAt!: Date;
    modifiedAt?: Date;
    command?: Command;
    product!: Product;
   
  }
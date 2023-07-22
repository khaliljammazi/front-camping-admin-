import { Product } from "./product";
export class Command {
  
    id?: number;
    confirmed?: boolean;
    customerFirstName?: string;
    customerLastName?:string;
    phoneNumber!:string;
    method!:string;
    commandStatus?:string;
    customerEmail?: string;
    shippingAddress?: string;
    paymentMethod?: string;
    createdAt?: Date;
    modifiedAt?: Date;
    productCommands!: ProductCommand[];
  }
  export class  Payment{
    paymentMethod!:string
    paymentStatus!:string
   paymentResponse!:string
    commandId!:number
    createdAt!:Date
  }
  export class ProductCommand {
    id?: number;
    quantity?: number;
    priceTotal?: number;
    createdAt?: Date;
    modifiedAt?: Date;
    command?: Command;
    product!: Product;
  
   
  }
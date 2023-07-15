export class Product {
    id!: number;
    matricule?: string;
    name?: string;
    description?: string;
    image!: string;
    discount!: number;
    price!: number;
    stock!: number;
    vendingType !: string;
    active!: boolean;
  priceTotal?: number;
  quantity?: number;
  createdAt?:Date;
  modifiedAt?:Date
  }
  
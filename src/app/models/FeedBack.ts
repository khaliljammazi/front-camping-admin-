import { CampingCenter } from './CampingCenter';
//import { Product } from './Product';
import { Activity } from './Activity';

export class FeedBack {
  id!:number;
  label!:string;
  description!:string;
  rating!:number;
  likes!:number;
  dislikes!:number;
  isActive!:boolean;
  createdAt!:Date;
  modifiedAt!:Date;
  campingCenter!:CampingCenter;
 // product!: Product;
  activity!:Activity;
}

import { CampingCenter } from './CampingCenter';
import { Activity } from './Activity';
import { User } from './User';

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
  user!: User;
  activity!:Activity;
}

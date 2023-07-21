import { CampingCenter } from "./CampingCenter";
import { User } from "./user";

export class Post {
  id!: number;
  title!: string;
  image!: string;
  details!: string;
  tags!: string[];
  likes!: number;
  dislikes!: number;
  active!: boolean|number;
  created_at!: Date;
  user!: User;
  campingCenter!: CampingCenter;
  
}
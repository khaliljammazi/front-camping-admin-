
import { Activity } from "./Activity";
/*import { FeedBack } from "./FeedBack";
import { Reservation } from "./Reservation"; */
import { Post } from 'src/app/models/Post';

export class CampingCenter {
    id!: number;
    label!: string;
    image!: string;
    description!: string;
    location!: string;
    price!: number;
    discount!: number;
    capacity!: number; 
    telephone!: number;
    active!: boolean|number;
     activities!: Activity[];
     Posts!: Post[];
   /* reservations!: Reservation[];
    feedBacks!: FeedBack[]; */
  }
  
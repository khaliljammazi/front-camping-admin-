
import { Activity } from "./Activity";
/*import { FeedBack } from "./FeedBack";
import { Reservation } from "./Reservation"; */

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
    createdAt!: Date;
    modifiedAt!: Date;
     activities!: Activity[];
   /* reservations!: Reservation[];
    feedBacks!: FeedBack[]; */
  }
  
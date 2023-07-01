import { CampingCenter } from "./CampingCenter";

export class Activity {
  id!: number;
  label!: string;
  description!: string;
  picture!: string;
  discount!: number;
  price!: number;
  duration!: number;
  number!: number;
  capacity!: number;
  isActive!: boolean|number;
  createdAt!: Date;
  modifiedAt!: Date;
  campingCenter!: CampingCenter;
}

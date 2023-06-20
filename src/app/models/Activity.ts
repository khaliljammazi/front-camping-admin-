import { CampingCenter } from "./CampingCenter";

export class Activity {
  id!: number;
  label!: string;
  description!: string;
  discount!: number;
  price!: number;
  duration!: number;
  number!: number;
  capacity!: number;
  isActive!: boolean;
  createdAt!: Date;
  modifiedAt!: Date;
  campingCenter!: CampingCenter;
}

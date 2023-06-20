import { CampingCenter } from './CampingCenter';
import { Activity } from './Activity';

export class Reservation {
  id!: number;
  numberReserved!: number;
  isActive!: boolean;
  isConfirmed!: boolean;
  totalAmount!: number;
  dateStart!: Date;
  dateEnd!: Date;
  createdAt!: Date;
  modifiedAt!: Date;
  campingCenter!: CampingCenter;
  activities!: Activity[];
}

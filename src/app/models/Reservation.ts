import { CampingCenter } from './CampingCenter';
import { Activity } from './Activity';
import { User } from '../core/models/auth.models';

export class Reservation {
  id!: number;
  numberReserved!: number;
  active!: boolean;
  isConfirmed!: boolean;
  totalAmount!: number;
  dateStart!: Date;
  dateEnd!: Date;
  user!: User;
  campingCenter!: CampingCenter;
  activities!: Activity[];
}

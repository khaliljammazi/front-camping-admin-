import { Season } from "./Season";

export class Activity {
  id!: number;
  label!: string;
  description!: string;
  image!: string;
  discount!: number;
  price!: number;
  duration!: number;
  number!: number;
  capacity!: number;
  active!: boolean|number;
  createdAt!: Date;
  modifiedAt!: Date;
  camping_center_id!: number;
  season!: Season;
  favorite!: boolean|number;
}

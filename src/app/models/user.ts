export class User {
  id!: number;
  nom?: string;
  prenom?: string;
  email?: string;
  password?: string;
  tokenExpired?: boolean;
  createdAt?: Date;
  modifiedAt?: Date;
  avatar?: string;
  roles!: Role[];
  active?: true | false;
  enabled?: true | false;
  emailValide?: true | false;
  authorities?: any[];
  username?: string;
  accountNonLocked?: true | false;
  accountNonExpired?: true | false;
  credentialsNonExpired?: true | false;
}
export class Role {
  id?: number;
  name!: string;
}
export class UserStat {
  revenue!: number;
  countReservation!: number;
  year!: Number;
  month!: number;
  date!:Date;
  season?: string
}

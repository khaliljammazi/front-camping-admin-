export class User {
  id!:number;
  nom!:string;
  prenom!:string;
  email!:string;
  password!:string;
  tokenExpired!:boolean;
  createdAt!:Date;
  modifiedAt!:Date;
}
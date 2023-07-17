import { Post } from "./Post";
import { User } from "./user";


export class Comment {
  id!: number;
  details!: string;
  active!: boolean|number;
  createdAt!: Date;
  user!:User;
  post!:Post;
}

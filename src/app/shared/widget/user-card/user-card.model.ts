import { User } from "src/app/models/user";

export interface UserCard extends User {
    premiumUser?: boolean;
}
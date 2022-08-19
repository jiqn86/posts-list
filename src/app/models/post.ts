import { User } from "./user";

export interface Post {
    id: number;
    userId: number;
    title: string;
    body: string;
    userName?: string
}
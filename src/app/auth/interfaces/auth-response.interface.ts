import { User } from "./user.interface";

export interface  AuthResponse{
    userDto:User,
    token:string
} 
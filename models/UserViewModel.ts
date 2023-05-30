import {User} from '@prisma/client';

export type UserViewModel=Omit<User, "createdAt" | "updateAt" | "emailVerified"> &{
    createdAt:string;
    updateAt:string;
    emailVerified:string | null;
}
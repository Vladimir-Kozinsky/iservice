import { Types } from "mongoose";
import { User } from "src/schemas/user.schema";
export declare class TokenUserDto {
    readonly _id: Types.ObjectId;
    readonly email: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly position: string;
    readonly role: string;
    readonly isActivated: boolean;
    constructor(user: User);
}

import { IUser } from "../../../types/types";

export interface IAuthState {
    user: IUser;
    isAuth: boolean;
    errorMessage: string;
}

export interface IAuthRejectResponse {
    statusCode: number;
    message: string;
}

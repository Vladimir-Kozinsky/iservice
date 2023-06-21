import { IUser } from "../../../types/types";

export interface IAuthState {
    user: IUser;
    isAuth: boolean;
    authErrorMessage: string;
}

export interface IAuthRejectResponse {
    statusCode: number;
    message: string;
}

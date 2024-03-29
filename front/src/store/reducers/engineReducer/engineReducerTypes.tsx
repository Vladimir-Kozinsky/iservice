import { IEngine } from "../../../types/types";

export interface IEngineState {
    choosedEngine: IEngine;
    engines: IEngine[];
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IEngineRejectResponse {
    statusCode: number;
    message: string;
}
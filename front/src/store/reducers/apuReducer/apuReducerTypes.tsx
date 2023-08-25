import { IApu, IApuHistory, IEngine, ILimit } from "../../../types/types";

export interface IApuState {
    choosedApu: IApu;
    apus: IApu[];
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IApuRejectResponse {
    statusCode: number;
    message: string;
}
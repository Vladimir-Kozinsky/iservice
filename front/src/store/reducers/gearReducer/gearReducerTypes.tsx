import { IApu, IApuHistory, IEngine, IGear, ILimit } from "../../../types/types";

export interface IGearState {
    choosedGear: IGear;
    gears: IGear[];
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IgearRejectResponse {
    statusCode: number;
    message: string;
}
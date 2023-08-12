import { IApu, IApuHistory, IEngine, ILimit } from "../../../types/types";

export interface IApuState {
    choosedApu: {
        _id: string | null;
        type: string | null;
        msn: string | null;
        manufDate: string | null;
        tsn: string | null;
        csn: string | null;
        overhaulNum?: number | null;
        lastOverhaulDate: string | null;
        tsnAtLastOverhaul: string | null;
        csnAtLastOverhaul: string | null;
        apuHistory: IApuHistory [];
        limits: ILimit[];
    };
    apus: IApu[];
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IApuRejectResponse {
    statusCode: number;
    message: string;
}
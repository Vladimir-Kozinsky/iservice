import { IAircraft } from "../../../types/types";
import { IEngine } from "../../../types/types";

export interface IAircraftState {
    choosedAircraft: IAircraft;
    installedEngines: IEngine[];
    aircafts: IAircraft[];
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IAircraftRejectResponse {
    statusCode: number;
    message: string;
}

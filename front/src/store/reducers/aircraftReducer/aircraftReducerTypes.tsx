import { IAircraft, IGear } from "../../../types/types";
import { IEngine } from "../../../types/types";

export interface IAircraftState {
    choosedAircraft: IAircraft;
    installedEngines: IEngine[];
    installedGears: IGear[];
    aircrafts: IAircraft[];
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IAircraftRejectResponse {
    statusCode: number;
    message: string;
}

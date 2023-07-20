import { IAircraft } from "../../../types/types";

export interface IAircraftState {
    choosedAircraft: IAircraft;
    aircafts: IAircraft[];
    errorMessage: string | null;
}

export interface IAircraftRejectResponse {
    statusCode: number;
    message: string;
}

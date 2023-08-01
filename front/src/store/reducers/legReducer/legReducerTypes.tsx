import { IAircraft, ILeg } from "../../../types/types";

export interface ILegState {
    choosedLeg: {
        _id: string | null,
        aircraft: string | null,
        engines: string | null,
        apu: string | null,
        depDate: string | null,
        flightNumber: string | null,
        from: string | null,
        to: string | null,
        blockOff: string | null,
        takeOff: string | null,
        landing: string | null,
        blockOn: string | null,
        flightTime: string | null,
        blockTime: string | null,
    },
    legs: ILeg[],
    errorMessage: string | null,
    successMessage: string | null
}


export interface ILegRejectResponse {
    statusCode: number;
    message: string;
}

export interface ICreateLegDto {
    aircraft: string;
    engines: string[];
    apu: string;
    depDate: string;
    flightNumber: string;
    from: string;
    to: string;
    blockOff: string;
    takeOff: string;
    landing: string;
    blockOn: string;
    flightTime: string;
    blockTime: string;
}

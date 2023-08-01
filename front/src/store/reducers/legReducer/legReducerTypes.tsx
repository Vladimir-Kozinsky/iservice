import { IAircraft, ILeg, ILegEngine } from "../../../types/types";

export interface ILegState {
    choosedLeg: {
        _id: string | null;
        aircraft: string | null;
        engines: ILegEngine[] | null;
        apu: string | null;
        depDate: string | null;
        flightNumber: string | null;
        from: string | null;
        to: string | null;
        blockOff: string | null;
        takeOff: string | null;
        landing: string | null;
        blockOn: string | null;
        flightTime: string | null;
        blockTime: string | null;
        fh: string | null;
        fc: string | null;
    },
    legs: ILeg[],
    errorMessage: string | null;
    successMessage: string | null;
}


export interface ILegRejectResponse {
    statusCode: number;
    message: string;
}

export interface ICreateLegDto {
    aircraft: string;
    engines: ILegEngine[];
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
    fh: string;
    fc: string;
}

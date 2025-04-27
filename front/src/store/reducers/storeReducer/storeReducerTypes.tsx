import { IAircraft, ILeg, ILegEngine, ILegGear, IUnit } from "../../../types/types";

export interface IStoreState {
    choosedUnit: {
        _id: string | null;
        ata: string | null;
        pn: string | null;
        sn: string | null;
        type: string | null;
        desc: string | null;
        grn: string | null;
        quantity: number | null;
        eapack: string | null;
        location: string | null;
        condition: string | null;
        lifelimit: string | null;
        shelflife: string | null;
        certificate: string | null;
        remarks: string | null;

    },
    units: IUnit[],
    totalPages: number | null;
    currentPage: number | null;
    errorMessage: string | null;
    successMessage: string | null;
}


export interface IUnitRejectResponse {
    statusCode: number;
    message: string;
}

export interface ICreateUnitDto {
    ata: string;
    pn: string;
    sn: string;
    type: string;
    desc: string;
    grn: string;
    quantity: number;
    eapack: string;
    location: string;
    condition: string;
    lifelimit: string;
    shelflife: string;
    certificate: string;
    remarks: string;
}

export interface IGetUnitsDto {
    // shelflife: string;
    // certificate: string;
    // remarks: string;
}

export interface IGetUnitsResponseDto {
    totalPages: number;
    currentPage: number;
    legs: IUnit[];
}
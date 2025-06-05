import { IAircraft, ILeg, ILegEngine, ILegGear, IUnit } from "../../../types/types";

export interface IStoreState {
    choosedUnit: {
        _id: string | null;
        ata: string | null;
        pn: string | null;
        altPn: string | null;
        sn: string | null;
        type: string | null;
        desc: string | null;
        grn: string | null;
        quantity: number | null;
        eapack: string | null;
        location: string | null;
        rack: string | null;
        shelf: string | null;
        condition: string | null;
        lifelimit: string | null;
        shelflife: string | null;
        remarks: string | null;

    },
    units: IUnit[],
    unitsToPrint: IUnit[],
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
    rack: string;
    shelf: string;
    condition: string;
    lifelimit: string;
    shelflife: string;
    remarks: string;
}

export interface IChangeUnitDto {
    _id: string;
    ata: string;
    pn: string;
    sn: string;
    type: string;
    desc: string;
    grn: string;
    quantity: number;
    eapack: string;
    location: string;
    rack: string;
    shelf: string;
    condition: string;
    lifelimit: string;
    shelflife: string;
    remarks: string;
}

export interface IUsageUnitDto {
    _id: string;
    quantity: number;
    wo: string;
    date: string;
    aircraft: string;
    remark: string;
}

export interface ISplitUnitDto {
    _id: string;
    date: string;
    quantity: number;
    splitQuantity: number;
    splitLocation: string;
}

export interface IDeleteUnitDto {
    id: string;
}

export interface IGetUnitsDto {
    page: number;
    unitsAtPage: number;
    locationFilter?: string[];
    //typeFilter?: string[];
    filterDirection?: string;
    searchText?: string;
}

export interface IGetPrintUnitsDto {
    locationFilter?: string[];
    searchText?: string;
}

export interface IGetUnitsResponseDto {
    totalPages: number;
    currentPage: number;
    units: IUnit[];
}

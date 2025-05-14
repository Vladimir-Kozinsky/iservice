import { IAircraft, ILeg, ILegEngine, ILegGear, ITool, IUnit } from "../../../types/types";

export interface IRequestState {
    choosedRequest: {
        _id: string | null;
        pn: string | null;
        sn: string | null;
        type: string | null;
        desc: string | null;
        quantity: number | null;
        location: string | null;
        rack: string | null;
        shelf: string | null;
        calibration: string | null;
        remarks: string | null;

    },
    requests: ITool[],
    requestsToPrint: ITool[],
    totalPages: number | null;
    currentPage: number | null;
    errorMessage: string | null;
    successMessage: string | null;
}


export interface IRequestRejectResponse {
    statusCode: number;
    message: string;
}

export interface ICreateRequestDto {
    requestNumber: string,
    date: string,
    priority: string,
   // items: [],
    requestedBy: string,
}

export interface IChangeRequestDto {
    _id: string;
    pn: string;
    sn: string;
    type: string;
    desc: string;
    quantity: number;
    location: string;
    rack: string;
    shelf: string;
    calibration: string;
    remarks: string;
}

export interface IDeleteRequestDto {
    id: string;
}

export interface IGetRequestsDto {
    page: number;
    toolsAtPage: number;
    locationFilter?: string[];
    filterDirection?: string;
    searchText?: string;
}



export interface IGetRequestsResponseDto {
    totalPages: number;
    currentPage: number;
    tools: ITool[];
}

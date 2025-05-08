import { IAircraft, ILeg, ILegEngine, ILegGear, ITool, IUnit } from "../../../types/types";

export interface IToolState {
    choosedTool: {
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
    tools: ITool[],
    toolsToPrint: ITool[],
    totalPages: number | null;
    currentPage: number | null;
    errorMessage: string | null;
    successMessage: string | null;
}


export interface IToolRejectResponse {
    statusCode: number;
    message: string;
}

export interface ICreateToolDto {
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

export interface IChangeTooltDto {
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

export interface IDeleteToolDto {
    id: string;
}

export interface IGetToolsDto {
    page: number;
    toolsAtPage: number;
    locationFilter?: string[];
    //typeFilter?: string[];
    filterDirection?: string;
    searchText?: string;
}

export interface IGetPrintToolsDto {
    locationFilter?: string[];
    searchText?: string;
}

export interface IGetToolsResponseDto {
    totalPages: number;
    currentPage: number;
    tools: ITool[];
}

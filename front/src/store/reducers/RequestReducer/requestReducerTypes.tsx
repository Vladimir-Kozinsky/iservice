import { IOrderItemType } from "../../../components/Iservice/Requests/NewPoForm/OrderItemForm/OrderItemForm";
import { ItemType } from "../../../components/Iservice/Requests/NewRequestForm/NewRequestForm";
import { IAircraft, ILeg, ILegEngine, ILegGear, ITool, IUnit } from "../../../types/types";

export interface IRequestState {
    choosedRequest: {
        _id: string | null;
        requestNumber: string | null;
        date: string | null;
        priority: string | null;
        items: ItemType[] | null;
        status: string | null;
        statusHistory: ISatus[] | null;
    },
    requests: IRequest[],
    orders: IOrder[],
    requestsToPrint: IRequest[],
    totalPages: number | null;
    currentPage: number | null;
    totalOrdersPages: number | null;
    currentOrdersPage: number | null;
    errorMessage: string | null;
    successMessage: string | null;
}

export interface IRequest {
    _id: string;
    requestNumber: string;
    date: string;
    priority: string;
    items: ItemType[];
    status: string;
    statusHistory: ISatus[];
}

export interface IOrder {
    _id: string;
    poNumber: string;
    poDate: string;
    requestNumber: string;
    items: IOrderItemType[]
    poPrice: string;
    customer: string;
    billTo: string;
    supplier: string;
    shipAdress: string;
    status: string;
    statusHistory: ISatus[];
    acceptedBy: string;
    acceptedDate: string;
    approvedBy: string;
    approvedDate: string;
}

export interface IApproveRequest {
    requestNumber: string;
    approvedBy: string;
}

export interface IApproveOrderDto {
    poNumber: string;
    approvedBy: string;
}
export interface IAcceptOrderDto {
    poNumber: string;
    acceptedBy: string;
}
export interface ICancelOrderDto {
    poNumber: string;
    canceledBy: string;
}

export interface IUpdateOrderStatusDto {
    poNumber: string;
    status: string;
    remark: string;
    user: string;
}

export interface IRequestRejectResponse {
    statusCode: number;
    message: string;
}

export interface ICreateRequestDto {
    requestNumber: string,
    date: string,
    priority: string,
    items: ItemType[];
    status: string;
    statusHistory: ISatus[];
}

export interface ISatus {
    date: string;
    status: string;
    remark: string;
    user: string;
}

export interface ICreateOrderDto {
    poNumber: string;
    poDate: string;
    requestNumber: string;
    items: IOrderItemType[] | ItemType[]
    poPrice: string;
    customer: string;
    billTo: string;
    supplier: string;
    shipAdress: string;
    status: string;
    statusHistory: ISatus[];
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
    requestsAtPage: number;
    statusFilter: string[];
    filterDirection?: string;
    searchText?: string;
}

export interface IGetOrdersDto {
    page: number;
    ordersAtPage: number;
    statusFilter: string[];
    filterDirection?: string;
    searchText?: string;
}


export interface IGetRequestsResponseDto {
    totalPages: number;
    currentPage: number;
    requests: IRequest[];
}

export interface IGetOrdersResponseDto {
    totalPages: number;
    currentPage: number;
    orders: IOrder[];
}

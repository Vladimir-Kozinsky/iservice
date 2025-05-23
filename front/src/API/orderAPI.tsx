import axios, { AxiosResponse } from "axios";
import generalAPIData from "./generalData";
import { IAcceptOrderDto, IApproveOrderDto, ICancelOrderDto, ICreateOrderDto, IGetOrdersDto, IUpdateOrderStatusDto } from "../store/reducers/requestReducer/requestReducerTypes";

const proxy = axios.create({
    withCredentials: true,
    baseURL: generalAPIData.baseURL,
})

const orderAPI = {
    async create(createOrderDto: ICreateOrderDto) {
        const response = await proxy.post('/order/create', createOrderDto);
        return response;
    },
    async accept(acceptOrderDto: IAcceptOrderDto) {
        const response = await proxy.post('/order/accept', acceptOrderDto);
        return response;
    },

    async cancel(cancelOrderDto: ICancelOrderDto) {
        const response = await proxy.post('/order/cancel', cancelOrderDto);
        return response;
    },

    async approve(approveOrderDto: IApproveOrderDto) {
        const response = await proxy.post('/order/approve', approveOrderDto);
        return response;
    },

    async getOrders(getOrdersDto: IGetOrdersDto) {
        const response = await proxy.post('/order/orders', getOrdersDto);
        return response;
    },

    async updateOrderStatus(updateOrderStatusDto: IUpdateOrderStatusDto) {
        const response = await proxy.post('/order/status/update', updateOrderStatusDto);
        return response;
    }
}

export default orderAPI;
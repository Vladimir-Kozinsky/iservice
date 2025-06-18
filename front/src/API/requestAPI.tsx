import axios from "axios";
import generalAPIData from "./generalData";
import { IChangeTooltDto, ICreateToolDto, IDeleteToolDto, IGetPrintToolsDto, IGetToolsDto } from "../store/reducers/toolReducer/toolReducerTypes";
import { IApproveRequest, ICancelRequestDto, ICreateRequestDto, IGetRequestsDto } from "../store/reducers/requestReducer/RequestReducerTypes";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const requestAPI = {
    async create(createUnitDto: ICreateRequestDto) {
        const response = await proxy.post('/request/create', createUnitDto);
        return response;
    },

    async approve(approveRequestDto: IApproveRequest) {
        const response = await proxy.post('/request/approve', approveRequestDto);
        return response;
    },

    async getRequests(getRequestsDto: IGetRequestsDto) {
        const response = await proxy.post('/request/requests', getRequestsDto);
        return response;
    },

    async cancelRequest(cancelRequestDto: ICancelRequestDto) {
            const response = await proxy.post('/request/cancel', cancelRequestDto);
            return response;
        },
}

export default requestAPI;
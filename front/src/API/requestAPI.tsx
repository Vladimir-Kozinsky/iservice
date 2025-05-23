import axios from "axios";
import generalAPIData from "./generalData";
import { IChangeTooltDto, ICreateToolDto, IDeleteToolDto, IGetPrintToolsDto, IGetToolsDto } from "../store/reducers/toolReducer/toolReducerTypes";
import { IApproveRequest, ICreateRequestDto, IGetRequestsDto } from "../store/reducers/requestReducer/requestReducerTypes";

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
    }
}

export default requestAPI;
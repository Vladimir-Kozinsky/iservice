import axios from "axios";
import generalAPIData from "./generalData";
import { IChangeTooltDto, ICreateToolDto, IDeleteToolDto, IGetPrintToolsDto, IGetToolsDto } from "../store/reducers/toolReducer/toolReducerTypes";
import { ICreateRequestDto } from "../store/reducers/RequestReducer/requestReducerTypes";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const requestAPI = {
    async create(createUnitDto: ICreateRequestDto) {
        const response = await proxy.post('/request/create', createUnitDto);
        return response;
    }
}

export default requestAPI;
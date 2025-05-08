import axios from "axios";
import generalAPIData from "./generalData";
import { IChangeTooltDto, ICreateToolDto, IDeleteToolDto, IGetPrintToolsDto, IGetToolsDto } from "../store/reducers/toolReducer/toolReducerTypes";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const toolAPI = {
    async create(createUnitDto: ICreateToolDto) {
        const response = await proxy.post('/tool/create', createUnitDto);
        return response;
    },
    async editTool(editUnitDto: IChangeTooltDto) {
        const response = await proxy.post('/tool/edit', editUnitDto);
        return response;
    },

    async deleteTool(deleteUnitDto: IDeleteToolDto) {
        const response = await proxy.post('/tool/delete', deleteUnitDto);
        return response;
    },

    async getTools(getUnitsDto: IGetToolsDto) {
        const response = await proxy.post('/tool/tools', getUnitsDto);
        return response;
    },

    async getPrintTools(getPrintUnitsDto: IGetPrintToolsDto) {
        const response = await proxy.post('/tool/print', getPrintUnitsDto);
        return response;
    }
}

export default toolAPI;
import axios from "axios";
import generalAPIData from "./generalData";
import { ICreateLegDto, IGetLegsDto, IGetPrintLegsDto } from "../store/reducers/legReducer/legReducerTypes";
import { ILeg } from "../types/types";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const legAPI = {
    async createLeg(createLegDto: ICreateLegDto) {
        const response = await proxy.post('/leg/create', createLegDto);
        return response;
    },
    async deleteLeg(deleteLegDto: ILeg) {
        const response = await proxy.post('/leg/delete', deleteLegDto );
        return response;
    },
    async getLegs(getLegsDto: IGetLegsDto) {
        const response = await proxy.get('/leg/legs', {params: getLegsDto});
        return response;
    },
    async getPrintLegs(getPrintLegsDto: IGetPrintLegsDto) {
        const response = await proxy.get('/leg/legs/print', {params: getPrintLegsDto});
        return response;
    },
    async getLastTenLegs(aircraft: string) {
        const response = await proxy.get('/leg/legs/last', {params: {aircraft: aircraft}});
        return response;
    },

}

export default legAPI;
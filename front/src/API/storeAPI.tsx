import axios from "axios";
import generalAPIData from "./generalData";
import { ICreateUnitDto } from "../store/reducers/storeReducer/storeReducerTypes";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const storeAPI = {
    async createUnit(createUnitDto: ICreateUnitDto) {
        const response = await proxy.post('/unit/create', createUnitDto);
        return response;
    },

    // async deleteLeg(deleteLegDto: ILeg) {
    //     const response = await proxy.post('/leg/delete', deleteLegDto );
    //     return response;
    // },
    async getUnits() {
        const response = await proxy.get('/unit/units');
        return response;
    },
    // async getPrintLegs(getPrintLegsDto: IGetPrintLegsDto) {
    //     const response = await proxy.get('/leg/legs/print', {params: getPrintLegsDto});
    //     return response;
    // },
    // async getLastTenLegs(aircraft: string) {
    //     const response = await proxy.get('/leg/legs/last', {params: {aircraft: aircraft}});
    //     return response;
    // },

}

export default storeAPI;
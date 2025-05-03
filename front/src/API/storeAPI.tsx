import axios from "axios";
import generalAPIData from "./generalData";
import { IChangeUnitDto, ICreateUnitDto, IDeleteUnitDto, IGetPrintUnitsDto, IGetUnitsDto, IUsageUnitDto } from "../store/reducers/storeReducer/storeReducerTypes";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const storeAPI = {
    async createUnit(createUnitDto: ICreateUnitDto) {
        const response = await proxy.post('/unit/create', createUnitDto);
        return response;
    },
    async editUnit(editUnitDto: IChangeUnitDto) {
        const response = await proxy.post('/unit/edit', editUnitDto);
        return response;
    },

    async deleteUnit(deleteUnitDto: IDeleteUnitDto) {
        const response = await proxy.post('/unit/delete', deleteUnitDto);
        return response;
    },

    async useUnit(useUnitDto: IUsageUnitDto) {
        const response = await proxy.post('/unit/use', useUnitDto);
        return response;
    },

    // async deleteLeg(deleteLegDto: ILeg) {
    //     const response = await proxy.post('/leg/delete', deleteLegDto );
    //     return response;
    // },
    async getUnits(getUnitsDto: IGetUnitsDto) {
        const response = await proxy.post('/unit/units', getUnitsDto);
        return response;
    },

    async getPrintUnits(getPrintUnitsDto: IGetPrintUnitsDto) {
        const response = await proxy.post('/unit/print', getPrintUnitsDto);
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
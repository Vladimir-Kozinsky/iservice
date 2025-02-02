import axios from "axios";
import generalAPIData from "./generalData";
import { ICreateApuDto, ICreateGearDto } from "../types/types";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL
})

const gearAPI = {
    async getGears() {
        const response = await proxy.get(`gear/gears`);
        return response;
    },
    // async getAvailApus() {
    //     const response = await proxy.get(`/apus/available`);
    //     return response;
    // },

    // async getApu(msn: string) {
    //     const response = await proxy.get(`/apus?msn=${msn}`);
    //     return response;
    // },

    async addGear(gearDto: ICreateGearDto) {
        const response = await proxy.post('/gear/add', gearDto);
        return response;
    },

    async getGear(gearId: string) {
        const response = await proxy.get(`/gear/id?id=${gearId}`);
        return response;
    },

    // async addLimit(limitDto: INewLimitDto) {
    //     const response = await proxy.post('/apu/limit/add', limitDto);
    //     return response;
    // },
    // async delLimit(limitDto: IDelEngineLimitDto) {
    //     const response = await proxy.post('/apu/limit/delete', limitDto);
    //     return response;
    // },

    // async updateEngine(apu: IApu) {
    //     const response = await proxy.post('/apu/update', apu);
    //     return response;
    // },

    // async delEngine(msn: string) {
    //     const response = await proxy.post('/apu/del', msn);
    //     return response;
    // },

    // async installApu(instData: any) {
    //     const response = await proxy.post('/apu/install', instData);
    //     return response;
    // },

    // async removeApu(remData: RemApuFormDataType) {
    //     const response = await proxy.post('/apu/remove', remData);
    //     return response;
    // }
}

export default gearAPI;
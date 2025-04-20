import axios from "axios";
import generalAPIData from "./generalData";
import { ICreateApuDto, ICreateGearDto } from "../types/types";
import { INewGearLimitDto } from "../components/Iservice/Gears/GearFile/NewGearLimit/NewGearLimit";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL
})

const gearAPI = {
    async getGears() {
        const response = await proxy.get(`gear/gears`);
        return response;
    },

    async addGear(gearDto: ICreateGearDto) {
        const response = await proxy.post('/gear/add', gearDto);
        return response;
    },

    async getGear(gearId: string) {
        const response = await proxy.get(`/gear/id?id=${gearId}`);
        return response;
    },

    async addLimit(limitDto: INewGearLimitDto) {
        const response = await proxy.post('/gear/limit/add', limitDto);
        return response;
    },
    // async delLimit(limitDto: IDelEngineLimitDto) {
    //     const response = await proxy.post('/engine/limit/delete', limitDto);
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
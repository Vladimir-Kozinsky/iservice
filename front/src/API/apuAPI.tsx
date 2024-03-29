import axios from "axios";
// import { RemApuFormDataType } from "../components/Aircrafts/RemovalApu/RemovalApu";
// import { IApu } from "../types/types";
import generalAPIData from "./generalData";
import { ICreateApuDto } from "../types/types";
import { INewLimitDto } from "../components/Iservice/Apus/ApuFile/NewApuLimit/NewApuLimit";
import { IDelEngineLimitDto } from "../components/Iservice/Engines/EngineFile/DelEngineLimit/DelEngineLimit";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL
})

const apuAPI = {
    async getApus() {
        const response = await proxy.get(`apu/apus`);
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

    async addApu(apuDto: ICreateApuDto) {
        const response = await proxy.post('/apu/add', apuDto);
        return response;
    },

    async addLimit(limitDto: INewLimitDto) {
        const response = await proxy.post('/apu/limit/add', limitDto);
        return response;
    },
    async delLimit(limitDto: IDelEngineLimitDto) {
        const response = await proxy.post('/apu/limit/delete', limitDto);
        return response;
    },

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

export default apuAPI;
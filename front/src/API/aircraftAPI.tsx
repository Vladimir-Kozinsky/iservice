import axios from "axios";
import generalAPIData from "./generalData";
import { ICreateAircraftDto } from "../components/Iservice/Aircrafts/NewAircraftForm/NewAircraftForm";
import { INewLimitDto } from "../components/Iservice/Aircrafts/AircraftFile/NewLimit/NewLimit";
import { IDelLimitDto } from "../components/Iservice/Aircrafts/AircraftFile/DelLimit/DelLimit";
import { IInstallEngineDto } from "../components/Iservice/Aircrafts/AircraftFile/InstallEngine/InstallEngine";
import { IRemoveEngineDto } from "../components/Iservice/Aircrafts/AircraftFile/RemoveEngine/RemoveEngine";
import { IInstallApuDto } from "../components/Iservice/Aircrafts/AircraftFile/InstallApu/InstallApu";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const aircraftAPI = {
    async addAircraft(aircraftDto: ICreateAircraftDto) {
        const response = await proxy.post('/aircraft/add', aircraftDto);
        return response;
    },
    // async deleteAircraft(aircraftId: string) {
    //     const response = await proxy.post('/aircraft/delete', { _id: aircraftId });
    //     return response;
    // },
    async getAircrafts() {
        const response = await proxy.get('/aircraft/aircrafts');
        return response;
    },
    async addLimit(limitDto: INewLimitDto) {
        const response = await proxy.post('/aircraft/limit/add', limitDto);
        return response;
    },
    async delLimit(limitDto: IDelLimitDto) {
        const response = await proxy.post('/aircraft/limit/delete', limitDto);
        return response;
    },

    async installEngine(installEngineDto: IInstallEngineDto) {
        const response = await proxy.post('/aircraft/engine/install', installEngineDto);
        return response;
    },

    async removeEngine(removeEngineDto: IRemoveEngineDto) {
        const response = await proxy.post('/aircraft/engine/remove', removeEngineDto);
        return response;
    },

    async installApu(installApuDto: IInstallApuDto) {
        const response = await proxy.post('/aircraft/apu/install', installApuDto);
        return response;
    },

    async removeApu(removeApuDto: IRemoveEngineDto) {
        const response = await proxy.post('/aircraft/apu/remove', removeApuDto);
        return response;
    }
    // async getAircraft(msn: string) {
    //     const response = await proxy.get('/aircraft');
    //     return response;
    // },
    // async updateAircraft(aircraftData: any) {
    //     const response = await proxy.post('/aircraft/edit', aircraftData);
    //     return response;
    // },
    // async getLegs(msn: string, from: string, to: string, page: number) {
    //     const response = await proxy.get(`/aircraft/legs?msn=${msn}&from=${from}&to=${to}&page=${page}`);
    //     return response;
    // },
    // async getPrintLegs(msn: string, from: string, to: string) {
    //     const response = await proxy.get(`/aircraft/legs/print?msn=${msn}&from=${from}&to=${to}`);
    //     return response;
    // },

    // async addLeg(leg: any, msn: string) {
    //     const response = await proxy.post('/aircraft/legs/add', { leg, msn });
    //     return response;
    // },
    // async delLeg(msn: string, legId: string) {
    //     const response = await proxy.post('/aircraft/legs/del', { msn, legId });
    //     return response;
    // },
    // async editLeg(msn: string, legId: string, leg: any) {
    //     const response = await proxy.post('/aircraft/legs/edit', { msn, legId, leg });
    //     return response;
    // },
}

export default aircraftAPI;
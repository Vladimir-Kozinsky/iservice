import axios from "axios";
import generalAPIData from "./generalData";
import { ICreateLegDto, IGetLegsDto } from "../store/reducers/legReducer/legReducerTypes";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL,

})

const legAPI = {
    async createLeg(createLegDto: ICreateLegDto) {
        const response = await proxy.post('/leg/create', createLegDto);
        return response;
    },
    async deleteLeg(legId: string) {
        const response = await proxy.post('/leg/delete', { legId });
        return response;
    },
    async getLegs(getLegsDto: IGetLegsDto) {
        const response = await proxy.get('/leg/legs', {params: getLegsDto});
        return response;
    },

}

export default legAPI;
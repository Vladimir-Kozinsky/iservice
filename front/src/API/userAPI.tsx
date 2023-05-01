import axios from "axios";
import generalAPIData from "./generalData";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL
})

const userAPI = {
    async signIn(email: string, password: string) {
        const response = await proxy.post('/auth/signin', { email, password });
        return response;
    },
    //   async isAuth(id: string) {
    //     const response = await proxy.get(`/token?id=${id}`);
    //     return response;
    // },
    // async signOut(id: string) {
    //     const response = await proxy.post(`/signout`, { id: id });
    //     return response;
    // }
}

export default userAPI;
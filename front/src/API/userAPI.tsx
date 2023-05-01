import axios from "axios";
import generalAPIData from "./generalData";

const proxy = axios.create({
    baseURL: generalAPIData.baseURL
})

const userAPI = {
    async signIn(email: string, password: string) {
        console.log(email, password)
        const response = await proxy.post('/auth', { email, password });
        return response;
    },
      async isAuth(id: string) {
        const response = await proxy.get(`/token?id=${id}`);
        return response;
    },
    async signOut(id: string) {
        const response = await proxy.post(`/signout`, { id: id });
        return response;
    }
}

export default userAPI;
import axios, { AxiosResponse } from "axios";
import generalAPIData from "./generalData";
import { ISignUpValues } from "../components/SignUp/SignUp";
import { IAuthResponse } from "../models/response/AuthResponce";

const proxy = axios.create({
    withCredentials: true,
    baseURL: generalAPIData.baseURL,
})

const userAPI = {
    async signIn(email: string, password: string): Promise<AxiosResponse<IAuthResponse>> {
        const response = await proxy.post<IAuthResponse>('/auth/signin', { email, password });
        return response;
    },
    async signUp(candidate: ISignUpValues) {
        const response = await proxy.post('/auth/signup', candidate);
        return response;
    },

    //   async isAuth(id: string) {
    //     const response = await proxy.get(`/token?id=${id}`);
    //     return response;
    // },
    async signOut() {
        console.log('jnghfdrf FGB')
        const response = await proxy.post(`/auth/signout`);
        return response;
    }
}

proxy.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config
})


export default userAPI;
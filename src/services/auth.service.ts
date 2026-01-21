import instance from "../lib/axios/instance";
import { IActivation, ILogin, IRegister } from "../types/Auth";
import ENDPOINT from "./endpoint";


const AuthService = {
  register: async (payload: IRegister) => {
    return instance.post(`${ENDPOINT.AUTH}/register`, payload);
  },
  activation: async (payload: IActivation) => {
    return instance.post(`${ENDPOINT.AUTH}/activation`, payload);
  },
  login: async (payload: ILogin) => {
    return instance.post(`${ENDPOINT.AUTH}/login`, payload);
  },
  findToken: async (token: string) => {
    return instance.get(`${ENDPOINT.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  findProfile: async () => {
    return instance.get(`${ENDPOINT.AUTH}/me`);
  },
};

export default AuthService;

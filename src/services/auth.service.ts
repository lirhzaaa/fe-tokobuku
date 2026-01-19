import createInstance from "../lib/axios";
import { IActivation, ILogin, IRegister } from "../types/Auth";
import ENDPOINT from "./endpoint";

const api = await createInstance();

const AuthService = {
  register: async (payload: IRegister) => {
    return api.post(`${ENDPOINT.AUTH}/register`, payload);
  },
  activation: async (payload: IActivation) => {
    return api.post(`${ENDPOINT.AUTH}/activationCode`, payload);
  },
  login: async (payload: ILogin) => {
    return api.post(`${ENDPOINT.AUTH}/login`, payload);
  },
  findToken: async (token: string) => {
    return api.get(`${ENDPOINT.AUTH}/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
  },
  findProfile: async () => {
    return api.get(`${ENDPOINT.AUTH}/me`);
  },
};

export default AuthService;

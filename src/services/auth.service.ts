import instance from "../lib/axios/instance";
import { IActivation, ILogin, IRegister } from "../types/Auth";
import ENDPOINT from "./endpoint";

const AuthService = {
  register: (payload: IRegister) =>
    instance.post(`${ENDPOINT.AUTH}/register`, payload),
  activation: (payload: IActivation) => {
    return instance.post(`${ENDPOINT.AUTH}/activation`, payload);
  },
  login: (payload: ILogin) => instance.post(`${ENDPOINT.AUTH}/login`, payload),
  findToken: (token: string) =>
    instance.get(`${ENDPOINT.AUTH}/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
  findProfile: () => instance.get(`${ENDPOINT.AUTH}/me`),
};

export default AuthService;

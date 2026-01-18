import createInstance from "../lib/axios";
import { IRegister } from "../types/Auth";
import ENDPOINT from "./endpoint";

const AuthService = {
  register: async (payload: IRegister) => {
    const api = await createInstance();
    return api.post(`${ENDPOINT.AUTH}/register`, payload);
  },
};

export default AuthService;

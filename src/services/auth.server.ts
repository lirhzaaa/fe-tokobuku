import axios from "axios";
import { environment } from "../config/environment";
import { ILogin } from "../types/Auth";

const AuthServer = {
  login: (payload: ILogin) =>
    axios.post(`${environment.API_URL}/auth/login`, payload),

  findToken: (token: string) =>
    axios.get(`${environment.API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default AuthServer;
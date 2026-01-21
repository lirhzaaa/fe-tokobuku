import axios from "axios";
import { environment } from "../config/environment";

const AuthServer = {
  login: (payload) =>
    axios.post(`${environment.API_URL}/auth/login`, payload),

  findToken: (token: string) =>
    axios.get(`${environment.API_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }),
};

export default AuthServer;
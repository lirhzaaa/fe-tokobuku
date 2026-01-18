import axios from "axios";
import { environment } from "@/src/config/environment";

const baseConfig = {
  baseURL: environment.API_URL,
  timeout: 60000,
};

const isServer = typeof window === "undefined";

const createInstance = async () => {
  if (isServer) {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    const token = cookieStore.get("accessToken")?.value;

    return axios.create({
      ...baseConfig,
      headers: token
        ? {
            Authorization: `Bearer ${token}`,
          }
        : {},
    });
  }

  const instance = axios.create(baseConfig);
  instance.interceptors.request.use((request) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
  });

  return instance;
};

export default createInstance;
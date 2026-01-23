import instance from "../lib/axios/instance";
import { IBanner } from "../types/Banner";
import ENDPOINT from "./endpoint";

const BannerService = {
  addBanner: (payload: IBanner) => instance.post(`${ENDPOINT.BANNER}`, payload),
  findBanner: (params?: string) => instance.get(`${ENDPOINT.BANNER}?${params}`),
  findOneBanner: (id: string) => instance.get(`${ENDPOINT.BANNER}/${id}`),
  updateBanner: (id: string, payload: Partial<IBanner>) =>
    instance.put(`${ENDPOINT.BANNER}/${id}`, payload),
  deleteBanner: (id: string) => instance.delete(`${ENDPOINT.BANNER}/${id}`),
};

export default BannerService;

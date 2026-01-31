import instance from "../lib/axios/instance";
import { ICart } from "../types/Cart";
import ENDPOINT from "./endpoint";

const orderServices = {
  createOrder: (payload: ICart) => {
    return instance.post(`${ENDPOINT.ORDER}`, payload);
  },
  getOrderById: (id: string) => instance.get(`${ENDPOINT.ORDER}/${id}`),
  getUserOrder: (params: string) =>
    instance.get(`${ENDPOINT.ORDER}-history?${params}`),
  getOrders: (params: string) => instance.get(`${ENDPOINT.ORDER}?${params}`),
  updateOrderStatus: (id: string, status: string) =>
    instance.put(`${ENDPOINT.ORDER}/${id}/${status}`),
  deleteOrder: (id: string) => instance.delete(`${ENDPOINT.ORDER}/${id}`),
};

export default orderServices;

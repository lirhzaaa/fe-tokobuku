import instance from "../lib/axios/instance";
import ENDPOINT from "./endpoint";
import { AddToCart, UpdateCart, RemoveFromCart } from "../types/Cart";

const CartService = {
  findCart: () => instance.get(`${ENDPOINT.CART}`),
  addCart: (payload: AddToCart) => 
    instance.post(`${ENDPOINT.CART}`, payload),
  updateCart: (payload: UpdateCart) =>
    instance.put(`${ENDPOINT.CART}`, payload),
  deleteCart: (payload: RemoveFromCart) =>
    instance.delete(`${ENDPOINT.CART}`, { data: payload }),
  clearCart: () => 
    instance.delete(`${ENDPOINT.CART}`),
};

export default CartService;
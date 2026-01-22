import instance from "../lib/axios/instance";
import { ICategory } from "../types/Category";
import ENDPOINT from "./endpoint";

const CategoryService = {
  addCategory: (payload: ICategory) => {
    instance.post(`${ENDPOINT.CATEGORY}`, payload);
  },
  getCategory: (params?: string) =>
    instance.get(`${ENDPOINT.CATEGORY}?${params}`),
  getCategoryById: (id: string) => instance.get(`${ENDPOINT.CATEGORY}/${id}`),
};

export default CategoryService;

import instance from "../lib/axios/instance";
import { IBook } from "../types/Book";
import ENDPOINT from "./endpoint";

const BookService = {
  addBook: (payload: IBook) => instance.post(`${ENDPOINT.BOOK}`, payload),
  findBook: (params?: string) => instance.get(`${ENDPOINT.BOOK}?${params}`),
  findBySlug: (slug: string) => instance.get(`${ENDPOINT.BOOK}/slug/${slug}`),
  findOneBook: (id: string) => instance.get(`${ENDPOINT.BOOK}/${id}`),
  updateBook: (id: string, payload: Partial<IBook>) =>
    instance.put(`${ENDPOINT.BOOK}/${id}`, payload),
  deleteBook: (id: string) => instance.delete(`${ENDPOINT.BOOK}/${id}`),
};

export default BookService;

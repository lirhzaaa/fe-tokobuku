import instance from "../lib/axios/instance";
import { IBook } from "../types/Book";
import ENDPOINT from "./endpoint";

const BookService = {
  addBook: (payload: IBook) => instance.post(`${ENDPOINT.BOOK}`, payload),
  getBook: (params?: string) => instance.get(`${ENDPOINT.BOOK}?${params}`),
};

export default BookService;

import { ICategory } from "./Category";

interface IBook {
  _id?: string;
  image: string | FileList;
  title: string;
  author: string;
  publishDate: string;
  description: string;
  price: string;
  stock: string;
  category: string | ICategory;
  isActive: string;
  isFeatured: string;
}

export { IBook};
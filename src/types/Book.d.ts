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
  isPublish: string;
  isFeatured: string;
}

interface IBookCard {
  title?: string;
  subtitle?: string;
  books?: IBook[];
  categories?: ICategory[];
  isLoading?: boolean;
  urlMore?: string;
}

export { IBook, IBookCard };

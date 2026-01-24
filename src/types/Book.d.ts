interface IBook {
  _id?: string;
  image: string | FileList;
  title: string;
  author: string;
  description: string;
  price: string;
  stock: string;
  category: string;
  isActive: string;
  isFeatured: string;
}

export { IBook };

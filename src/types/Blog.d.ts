interface IBlog {
  _id?: string;
  title?: string;
  slug?: string | undefined;
  excerpt?: string;
  image?: string | FileList;
  content?: string;
  tags?: string[];
  author?:
    | string
    | {
        _id?: string;
        name?: string;
        email?: string;
      };
  isActive?: string;
  isFeatured?: string;
  views?: number;
  createdAt?: string;
  updatedAt?: string;
}

export { IBlog };

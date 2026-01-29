import { IBook } from "@/src/types/Book";

const getBookDetailRows = (book: IBook, categoryName: string) => [
  {
    key: "author",
    label: "Author",
    value: book.author,
  },
  {
    key: "category",
    label: "Category",
    value: categoryName,
  },
  {
    key: "publishDate",
    label: "Publish Date",
    value: new Date(book.publishDate).toLocaleDateString("id-ID"),
  },
  {
    key: "price",
    label: "Price",
    value: `Rp ${Number(book.price).toLocaleString("id-ID")}`,
  },
  {
    key: "stock",
    label: "Stock",
    value: book.stock,
  },
];

export { getBookDetailRows };

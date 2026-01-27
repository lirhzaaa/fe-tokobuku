import { ReactNode } from "react";

interface IBlog {
  _id?: string
  title: string;
  slug: string;
  excerpt: string;
  coverImage: string;
  content: ReactNode;
  tags: string[];
  author: string;
  isActive: string;
  isFeatured: string;
  views: number;
}


export {IBlog}
"use client"

import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { IBook } from "@/src/types/Book"
import BookService from "@/src/services/book.service"

const useDetailBook = () => {
  const { slug } = useParams<{ slug: string }>()

  const getBookBySlug = async (): Promise<IBook> => {
    const { data } = await BookService.findBySlug(slug)
    return data.data
  }

  const {
    data: dataBook,
    isLoading: isLoadingBook,
  } = useQuery({
    queryKey: ["book-detail", slug],
    queryFn: getBookBySlug,
    enabled: !!slug,
  })

  return {
    dataBook,
    isLoadingBook,
  }
}

export default useDetailBook
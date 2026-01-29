"use client"

import BookService from "@/src/services/book.service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useDetailBook = () => {
  const { id } = useParams<{ id: string }>()

  const findBookById = async () => {
    const { data } = await BookService.findOneBook(id!)
    return data.data
  }

  const {
    data: dataBook,
    isLoading: isLoadingBook,
  } = useQuery({
    queryKey: ["book-detail", id],
    queryFn: findBookById,
    enabled: !!id,
  })

  return {
    dataBook,
    isLoadingBook,
  }
}

export default useDetailBook
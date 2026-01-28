"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl";
import BookService from "@/src/services/book.service"
import { useQuery } from "@tanstack/react-query"

const useBook = () => {
  const { currentLimit, currentPage, currentSearch } = useChangeUrl();
  const getBook = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&isActive=true`
    if (currentSearch) {
      params += `&search=${currentSearch}`
    }
    const result = await BookService.findBook(params)
    const { data } = result
    return data
  }

  const {
    data: dataBook,
    isLoading: isLoadingBook
  } = useQuery({
    queryKey: ["Books", currentLimit, currentPage, currentSearch],
    queryFn: () => getBook(),
    enabled: !!currentLimit && !!currentPage
  })

  return {
    dataBook,
    isLoadingBook
  }
}

export default useBook

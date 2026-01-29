"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl";
import BookService from "@/src/services/book.service"
import { useQuery } from "@tanstack/react-query"

const useBook = () => {
  const { currentLimit, currentPage, currentCategory, currentSearch } = useChangeUrl();
  const getBook = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&isPublish=true`
    if (currentCategory) {
      params += `&category=${currentCategory}`
    }

    if (currentSearch) {
      params += `&search=${currentSearch}`
    }
    const result = await BookService.findBook(params)
    const { data } = result
    return data
  }

  const {
    data: dataBook,
    isLoading: isLoadingBook,
    isRefetching: isRefetchingBook,
    refetch: refetchBook
  } = useQuery({
    queryKey: ["Books", currentLimit, currentPage, currentCategory, currentSearch],
    queryFn: () => getBook(),
    enabled: !!currentLimit && !!currentPage
  })

  return {
    dataBook,
    isLoadingBook,
    isRefetchingBook,
    refetchBook
  }
}

export default useBook

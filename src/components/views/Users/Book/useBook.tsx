"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl"
import BookService from "@/src/services/book.service"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { LIMIT_BOOK_PAGE, PAGE_DEFAULT } from "@/src/constants/list.constants"

const DELAY = 500

const useBook = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const {
    currentPage,
    currentCategory,
    currentSearch,
  } = useChangeUrl()

  const getBook = async () => {
    let params = `limit=${LIMIT_BOOK_PAGE}&page=${currentPage}&isActive=true`

    if (currentCategory) {
      params += `&category=${currentCategory}`
    }

    if (currentSearch) {
      params += `&search=${currentSearch}`
    }

    const result = await BookService.findBook(params)
    return result.data
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (debounceRef.current) {
      clearTimeout(debounceRef.current)
    }

    debounceRef.current = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString())

      if (value) {
        params.set("search", value)
      } else {
        params.delete("search")
      }

      params.set("page", PAGE_DEFAULT.toString())
      router.push(`?${params.toString()}`)
    }, DELAY)
  }

  const handleClearSearch = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete("search")
    params.set("page", PAGE_DEFAULT.toString())

    router.push(`?${params.toString()}`)
  }

  const {
    data: dataBook,
    isLoading: isLoadingBook,
    isRefetching: isRefetchingBook,
    refetch: refetchBook,
  } = useQuery({
    queryKey: [
      "Books",
      LIMIT_BOOK_PAGE,
      currentPage,
      currentCategory,
      currentSearch,
    ],
    queryFn: getBook,
    enabled: !!LIMIT_BOOK_PAGE && !!currentPage,
  })

  return {
    dataBook,
    isLoadingBook,
    isRefetchingBook,
    refetchBook,
    handleSearch,
    handleClearSearch,
  }
}

export default useBook
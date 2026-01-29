"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl"
import BookService from "@/src/services/book.service"
import { useQuery } from "@tanstack/react-query"
import { ChangeEvent, useRef } from "react"
import { useRouter, useSearchParams } from "next/navigation"

const DELAY = 500
const PAGE_DEFAULT = 1

const useBook = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const debounceRef = useRef<NodeJS.Timeout | null>(null)

  const {
    currentLimit,
    currentPage,
    currentCategory,
    currentSearch,
  } = useChangeUrl()

  const getBook = async () => {
    let params = `limit=${currentLimit}&page=${currentPage}&isActive=true`

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
      currentLimit,
      currentPage,
      currentCategory,
      currentSearch,
    ],
    queryFn: getBook,
    enabled: !!currentLimit && !!currentPage,
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
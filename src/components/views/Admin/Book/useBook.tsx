"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl";
import BookService from "@/src/services/book.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"

const useBook = () => {
    const [selectedId, setSelectedId] = useState<string>("")
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const findBook = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`
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
        refetch: refetchBook,
    } = useQuery({
        queryKey: ["Books", currentPage, currentLimit, currentSearch],
        queryFn: () => findBook(),
        enabled: !!currentPage && !!currentLimit,
    });

    return {
        dataBook,
        isLoadingBook,
        isRefetchingBook,
        refetchBook,

        selectedId,
        setSelectedId
    };
}

export default useBook
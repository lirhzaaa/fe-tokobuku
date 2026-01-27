"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl";
import BlogService from "@/src/services/blog.service";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react"

const useBlog = () => {
    const [selectedId, setSelectedId] = useState<string>("")
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const findBlog = async () => {
        let params = `limit=${currentLimit}&page=${currentPage}`
        if (currentSearch) {
            params += `&search=${currentSearch}`
        }

        const result = await BlogService.findBlog(params)
        const { data } = result
        return data
    }


    const {
        data: dataBlog,
        isLoading: isLoadingBlog,
        isRefetching: isRefetchingBlog,
        refetch: refetchBlog,
    } = useQuery({
        queryKey: ["Blogs", currentPage, currentLimit, currentSearch],
        queryFn: () => findBlog(),
        enabled: !!currentPage && !!currentLimit,
    });

    return {
        dataBlog,
        isLoadingBlog,
        isRefetchingBlog,
        refetchBlog,

        selectedId,
        setSelectedId
    };
}

export default useBlog
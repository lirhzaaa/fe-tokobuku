"use client"

import BlogService from "@/src/services/blog.service"
import { useQuery } from "@tanstack/react-query"

const useBlog = () => {
    const getBlog = async (params: string) => {
        const result = await BlogService.findBlog(params)
        const { data } = result
        return data
    }

    const {
        data: dataBlog,
        isLoading: isLoadingBlog
    } = useQuery({
        queryKey: ["Blogs"],
        queryFn: () => getBlog(''),
        enabled: true
    })

    return {
        dataBlog,
        isLoadingBlog
    }
}

export default useBlog

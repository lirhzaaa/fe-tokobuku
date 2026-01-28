"use client"

import BlogService from "@/src/services/blog.service"
import { IBlog } from "@/src/types/Blog"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useDetailBlog = () => {
    const { id } = useParams<{ id: string }>()

    const {
        mutate: mutateUpdateBlog,
        isPending: isPendingMutateUpdateBlog,
        isSuccess: isSuccessMutateUpdateBlog
    } = useMutation({
        mutationFn: (payload: Partial<IBlog>) => updateBlog(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchBlog()
            addToast({
                title: "Success",
                description: "Success Update Blog",
                color: "success"
            })
        }
    })

    const findBlogsById = async (id: string) => {
        const { data } = await BlogService.findOne(id)
        return data.data
    }

    const { data: dataBlog, refetch: refetchBlog } = useQuery({
        queryKey: ["Blogs"],
        queryFn: () => findBlogsById(`${id}`),
        enabled: true
    })

    const updateBlog = async (payload: Partial<IBlog>) => {
        const { data } = await BlogService.updateBlog(`${id}`, payload)
        return data.data
    }

    const handleUpdateBlogInfo = (data: IBlog) => mutateUpdateBlog(data)


    const handleUpdateBlogImage = (data: Partial<IBlog>) => {
        mutateUpdateBlog(data)
    }

    return {
        dataBlog,

        handleUpdateBlogInfo,
        handleUpdateBlogImage,
        isPendingMutateUpdateBlog,
        isSuccessMutateUpdateBlog,
    }
}

export default useDetailBlog
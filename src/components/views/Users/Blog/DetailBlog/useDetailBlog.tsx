"use client"

import BlogService from "@/src/services/blog.service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { IBlog } from "@/src/types/Blog"

const useDetailBlog = () => {
  const { slug } = useParams<{ slug: string }>()

  const getBlogBySlug = async (): Promise<IBlog> => {
    const { data } = await BlogService.findBySlug(slug)
    return data.data
  }

  const {
    data: dataBlog,
    isLoading: isLoadingBlog,
  } = useQuery({
    queryKey: ["blog-detail", slug],
    queryFn: getBlogBySlug,
    enabled: !!slug,
  })

  return {
    dataBlog,
    isLoadingBlog,
  }
}

export default useDetailBlog
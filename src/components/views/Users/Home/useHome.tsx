import { LIMIT_BANNER, LIMIT_BOOK, LIMIT_DEFAULT, PAGE_DEFAULT } from "@/src/constants/list.constants"
import BannerService from "@/src/services/banner.service"
import BlogService from "@/src/services/blog.service"
import BookService from "@/src/services/book.service"
import CategoryService from "@/src/services/category.service"
import { useQuery } from "@tanstack/react-query"

const useHome = () => {
    const getBanner = async () => {
        const params = `limit=${LIMIT_BANNER}&page=${PAGE_DEFAULT}`
        const result = await BannerService.findBanner(params)
        const { data } = result
        return data
    }

    const {
        data: dataBanner,
        isLoading: isLoadingBanner
    } = useQuery({
        queryKey: ["Banners"],
        queryFn: () => getBanner(),
        enabled: true
    })

    const getBook = async (params: string) => {
        const result = await BookService.findBook(params)
        const { data } = result
        return data
    }

    const {
        data: dataFeaturedBook,
        isLoading: isLoadingFeaturedBook
    } = useQuery({
        queryKey: ["FeaturedBook"],
        queryFn: () => getBook(
            `isPublish=true&isFeatured=true`
        ),
        enabled: true
    })

    const getCategory = async (params: string) => {
        const result = await CategoryService.getCategory(params)
        const { data } = result
        return data
    }

    const {
        data: dataCategory,
        isLoading: isLoadingCategory
    } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => getCategory(
            `&isActive=true`
        ),
        enabled: true
    })

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
        queryFn: () => getBlog(
            `limit=${LIMIT_DEFAULT}&page=${PAGE_DEFAULT}`
        ),
        enabled: true
    })

    return {
        dataBanner,
        dataFeaturedBook,
        dataCategory,
        dataBlog,

        isLoadingBanner,
        isLoadingFeaturedBook,
        isLoadingCategory,
        isLoadingBlog
    }
}

export default useHome
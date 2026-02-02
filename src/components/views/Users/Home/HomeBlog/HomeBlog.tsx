import CardBlog from "@/src/components/ui/CardBlog"
import { IBlog } from "@/src/types/Blog"
import Link from "next/link"

interface IHomeBlog {
    blogs: IBlog[]
    title?: string
    subtitle?: string
    urlMore?: string
    isLoadingBlog: boolean
}

const HomeBlog = (props: IHomeBlog) => {
    const { blogs, title, subtitle, urlMore = "/blog", isLoadingBlog } = props

    return (
        <section className="w-full px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between w-full my-5 sm:my-7 gap-3 sm:gap-0">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg sm:text-xl font-bold text-primary">{title}</h2>
                    <p className="text-xs sm:text-sm text-gray-600">{subtitle}</p>
                </div>
                <Link 
                    href={urlMore} 
                    className="font-semibold text-primary text-sm sm:text-base hover:underline whitespace-nowrap self-start sm:self-auto">
                    Lihat Artikel Lainnya
                </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
                {isLoadingBlog
                    ? Array.from({ length: 3 }).map((_, index) => (
                        <CardBlog
                            key={index}
                            isLoading
                            className="w-full"
                        />
                    ))
                    : blogs?.map((blog) => (
                        <CardBlog
                            key={blog._id}
                            blog={blog}
                            className="w-full"
                        />
                    ))
                }
            </div>
        </section>
    )
}

export default HomeBlog
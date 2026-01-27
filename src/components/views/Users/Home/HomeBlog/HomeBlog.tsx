import CardBlog from "@/src/components/ui/CardBlog"
import { IBlog } from "@/src/types/Blog"
import { Skeleton } from "@heroui/react"
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
        <section className="w-full">
            <div className="flex items-center justify-between w-full my-7">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-primary">{title}</h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
                <Link href={urlMore} className="font-semibold text-primary">
                    Lihat Artikel Lainnya
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
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

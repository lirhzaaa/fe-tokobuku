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
    const { title, subtitle, urlMore = "/blog", isLoadingBlog } = props

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
            {!isLoadingBlog ? (
                <CardBlog />
            ) : (
                Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="flex">
                        <CardBlog isLoading className="w-full h-full" />
                    </div>
                ))
            )}
        </section>
    )
}

export default HomeBlog

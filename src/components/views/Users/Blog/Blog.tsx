"use client"

import { Fragment } from "react/jsx-runtime"
import useBlog from "./useBlog"
import CardBlog from "@/src/components/ui/CardBlog"
import { IBlog } from "@/src/types/Blog"

const Blog = () => {
    const {
        dataBlog,
        isLoadingBlog
    } = useBlog()

    return (
        <Fragment>
            <div className="flex flex-col gap-1 mb-5 sm:mb-7 px-4 sm:px-6 lg:px-0">
                <h2 className="text-lg sm:text-xl font-bold text-primary">Artikel Terbaru</h2>
                <p className="text-xs sm:text-sm text-gray-600">Artikel terbaru dari blog kami</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-7 px-4 sm:px-6 lg:px-0">
                {!isLoadingBlog ? (
                    dataBlog?.data?.map((blog: IBlog) => (
                        <CardBlog
                            key={blog._id}
                            blog={blog}
                            className="w-full h-full"
                        />
                    ))
                ) : (
                    Array.from({ length: 6 }).map((_, index) => (
                        <CardBlog key={index} isLoading className="w-full h-full" />
                    ))
                )}
            </div>
        </Fragment>
    )
}

export default Blog
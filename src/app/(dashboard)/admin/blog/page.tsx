"use client"

import Blog from "@/src/components/views/Admin/Blog"
import { Spinner } from "@heroui/react"
import { Suspense } from "react"

const BlogPageAdmin = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <Blog />
        </Suspense>
    )
}

export default BlogPageAdmin
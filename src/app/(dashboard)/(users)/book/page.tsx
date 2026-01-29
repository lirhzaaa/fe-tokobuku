"use client"

import Book from "@/src/components/views/Users/Book"
import { Spinner } from "@heroui/react"
import { Suspense } from "react"

const BookPage = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <Book />
        </Suspense>
    )
}

export default BookPage
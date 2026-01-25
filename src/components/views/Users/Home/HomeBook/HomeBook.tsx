"use client"

import CardBook from "@/src/components/ui/CardBook"
import { IBook } from "@/src/types/Book"
import { ICategory } from "@/src/types/Category"
import Link from "next/link"

interface IHomeBook {
    title: string
    books: IBook[]
    categories: ICategory[]
    isLoading: boolean
    urlMore?: string
}

const HomeBook = (props: IHomeBook) => {
    const { title, books = [], categories = [], isLoading, urlMore = "/book" } = props
    const shouldShowLoading = isLoading || books.length === 0 || categories.length === 0

    return (
        <section className="w-full">
            <div className="flex items-center justify-between w-full mb-7">
                <h2 className="text-xl font-bold text-primary">{title}</h2>
                <Link href={urlMore} className="font-medium text-primary">See More</Link>
            </div>
            <div className="flex gap-5 overflow-x-auto whitespace-nowrap pb-2">
                {!shouldShowLoading ? (
                    books.map((book) => {
                        const categoryName = typeof book.category === 'object' && book.category !== null ? book.category?.name : categories.find(cat => cat._id === book.category)?.name
                        return (
                            <CardBook
                                key={`card-book-${book._id}`}
                                book={book}
                                className="shrink-0 w-50"
                                category={categoryName}
                            />
                        )
                    })
                ) : (
                    Array.from({ length: 7 }).map((_, index) => (
                        <CardBook
                            key={`card-book-loading-${index}`}
                            isLoading
                            className="shrink-0 w-50"
                        />
                    ))
                )}
            </div>
        </section>
    )
}

export default HomeBook
"use client"

import { useEffect, useRef, useState } from "react"
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
    const scrollRef = useRef<HTMLDivElement>(null)
    const [activeIndex, setActiveIndex] = useState(0)

    useEffect(() => {
        if (books.length === 0) return

        const interval = setInterval(() => {
            setActiveIndex(prev => {
                return (prev + 1) % books.length
            })
        }, 5000)

        return () => clearInterval(interval)
    }, [books])

    useEffect(() => {
        if (!scrollRef.current) return
        const cardWidth = scrollRef.current.children[0]?.clientWidth || 0
        scrollRef.current.scrollTo({
            left: cardWidth * activeIndex,
            behavior: "smooth",
        })
    }, [activeIndex])

    return (
        <section className="w-full">
            <div className="flex items-center justify-between w-full mb-7">
                <h2 className="text-xl font-bold text-primary">{title}</h2>
                <Link href={urlMore} className="font-medium text-primary">See More</Link>
            </div>

            <div
                ref={scrollRef}
                className="flex gap-5 overflow-x-auto whitespace-nowrap scrollbar-hide pb-2"
            >
                {!shouldShowLoading ? (
                    books.map((book, index) => {
                        const categoryName =
                            typeof book.category === "object" && book.category !== null
                                ? book.category?.name
                                : categories.find(cat => cat._id === book.category)?.name

                        return (
                            <CardBook
                                key={`card-book-${book._id}`}
                                book={book}
                                category={categoryName}
                                className="shrink-0 w-50"
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

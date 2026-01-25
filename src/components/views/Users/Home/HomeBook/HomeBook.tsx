"use client"

import { Fragment, useEffect, useRef, useState } from "react"
import CardBook from "@/src/components/ui/CardBook"
import { IBook } from "@/src/types/Book"
import { ICategory } from "@/src/types/Category"
import Link from "next/link"
import { Skeleton } from "@heroui/react"

interface IHomeBook {
    title: string
    subtitle?: string
    books: IBook[]
    categories: ICategory[]
    isLoading: boolean
    urlMore?: string
}

const HomeBook = (props: IHomeBook) => {
    const { title, subtitle, books = [], categories = [], isLoading, urlMore = "/book" } = props
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
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-primary">{title}</h2>
                    <p className="text-sm text-gray-600">{subtitle}</p>
                </div>
                <div className="flex flex-row gap-2">
                    {!shouldShowLoading ? (
                        <Fragment>
                            <span className="text-[13px] text-primary bg-primary/20 px-4 py-1 rounded-md">Direkomendasikan</span>
                            {categories?.slice(0, 5).map((category) => (
                                <Link
                                    key={`category-${category._id}`}
                                    href={`${urlMore}?category=${category._id}`}
                                    className="text-[13px] text-primary hover:bg-primary/20 px-4 py-1 rounded-md transition-colors duration-200">
                                    {category.name}
                                </Link>
                            ))}
                        </Fragment>
                    ) : (
                        Array.from({ length: 6 }).map((_, index) => (
                            <Skeleton key={`skeleton-category-${index}`} className="w-24 h-8 rounded-md" />
                        ))
                    )}
                </div>
            </div>

            <div ref={scrollRef} className="flex gap-5 overflow-x-auto scrollbar-hide pb-2">
                {!shouldShowLoading ? (
                    books.map((book) => {
                        const categoryName =
                            typeof book.category === "object" && book.category !== null
                                ? book.category?.name
                                : categories.find(cat => cat._id === book.category)?.name

                        return (
                            <CardBook
                                key={`card-book-${book._id}`}
                                book={book}
                                category={categoryName}
                                className="shrink-0 w-50" />
                        )
                    })
                ) : (
                    Array.from({ length: 7 }).map((_, index) => (
                        <CardBook
                            key={`card-book-loading-${index}`}
                            isLoading
                            className="shrink-0 w-50" />
                    ))
                )}
            </div>
        </section>
    )
}

export default HomeBook

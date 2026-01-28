"use client"

import { Fragment } from "react/jsx-runtime"
import CardBook from "@/src/components/ui/CardBook"
import useBook from "./useBook"
import { IBook } from "@/src/types/Book"

const Book = () => {
    const {
        dataBook,
        isLoadingBook
    } = useBook()

    return (
        <Fragment>
            <div className="flex flex-col gap-1 mb-7">
                <h2 className="text-xl font-bold text-primary">Semua Buku</h2>
                <p className="text-sm text-gray-600">Temukan buku yang kamu cari!!!</p>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-7">
                {!isLoadingBook ? (
                    dataBook?.data?.map((book: IBook) => {
                        const categoryName =
                            typeof book.category === "object" && book.category !== null
                                ? book.category?.name
                                : "-"

                        return (
                            <CardBook
                                key={`card-book-${book._id}`}
                                book={book}
                                category={categoryName} />
                        )
                    })
                ) : (
                    Array.from({ length: 12 }).map((_, index) => (
                        <CardBook
                            key={`card-book-loading-${index}`}
                            isLoading />
                    ))
                )}
            </div>
        </Fragment>
    )
}

export default Book
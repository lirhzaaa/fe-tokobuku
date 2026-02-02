"use client"

import CardBook from "@/src/components/ui/CardBook"
import useBook from "./useBook"
import { IBook } from "@/src/types/Book"
import FilterBook from "./FilterBook"
import { Input } from "@heroui/react"
import { SearchIcon } from "lucide-react"
import { useEffect } from "react"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import { useRouter } from "next/navigation"
import { LIMIT_BOOK_PAGE } from "@/src/constants/list.constants"

const Book = () => {
    const router = useRouter()
    const { setExplore } = useChangeUrl()
    const {
        dataBook,
        isLoadingBook,
        isRefetchingBook,
        refetchBook,
        handleSearch,
        handleClearSearch,
    } = useBook()

    useEffect(() => {
        setExplore()

        setTimeout(() => {
            const params = new URLSearchParams(window.location.search)
            params.set("limit", LIMIT_BOOK_PAGE.toString())

            if (!params.get("page")) {
                params.set("page", "1")
            }
            router.replace(`?${params.toString()}`)
        }, 0)
    }, [])

    return (
        <section className="flex flex-col gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-0">
            <div className="flex flex-col gap-3 sm:gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-lg sm:text-xl font-bold text-primary">Semua Buku</h2>
                    <p className="text-xs sm:text-sm text-gray-600">Temukan buku yang kamu cari!!!</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 sm:gap-6 lg:gap-10">
                    <Input
                        classNames={{
                            mainWrapper: "h-full w-full",
                            input: "text-xs sm:text-small",
                            inputWrapper:
                                "h-9 sm:h-10 font-normal text-default-400 placeholder:text-default-500",
                        }}
                        isClearable
                        placeholder="Search your favorite book..."
                        size="lg"
                        startContent={<SearchIcon size={16} className="sm:w-[18px] sm:h-[18px]" />}
                        type="search"
                        onChange={handleSearch}
                        onClear={handleClearSearch}
                    />
                    <FilterBook />
                </div>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4 sm:gap-5 lg:gap-6">
                {!isLoadingBook && !isRefetchingBook ? (
                    dataBook?.data?.map((book: IBook) => {
                        const categoryName =
                            typeof book.category === "object" && book.category !== null
                                ? book.category?.name
                                : "-"

                        return (
                            <div key={`card-book-${book._id}`} className="flex justify-center">
                                <CardBook
                                    book={book}
                                    category={categoryName} 
                                    className="w-full max-w-[200px]" />
                            </div>
                        )
                    })
                ) : (
                    Array.from({ length: 12 }).map((_, index) => (
                        <div key={`card-book-loading-${index}`} className="flex justify-center">
                            <CardBook
                                isLoading 
                                className="w-full max-w-[200px]" />
                        </div>
                    ))
                )}
            </div>

            {dataBook?.data.length < 1 && !isLoadingBook && !isRefetchingBook && (
                <div className="flex flex-col items-center justify-center gap-3 sm:gap-4 py-12 sm:py-16 lg:py-20">
                    <h2 className="text-center text-xl sm:text-2xl font-medium text-primary">Books is empty</h2>
                </div>
            )}
        </section>
    )
}

export default Book
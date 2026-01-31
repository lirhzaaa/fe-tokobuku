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
        <section className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                    <h2 className="text-xl font-bold text-primary">Semua Buku</h2>
                    <p className="text-sm text-gray-600">Temukan buku yang kamu cari!!!</p>
                </div>
                <div className="flex items-center justify-between gap-10">
                    <Input
                        classNames={{
                            mainWrapper: "h-full",
                            input: "text-small",
                            inputWrapper:
                                "h-10 font-normal text-default-400 placeholder:text-default-500",
                        }}
                        isClearable
                        placeholder="Search your favorite book..."
                        size="lg"
                        startContent={<SearchIcon size={18} />}
                        type="search"
                        onChange={handleSearch}
                        onClear={handleClearSearch}
                    />
                    <FilterBook />
                </div>
            </div>
            <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-7">
                {!isLoadingBook && !isRefetchingBook ? (
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

            {dataBook?.data.length < 1 && !isLoadingBook && !isRefetchingBook && (
                <div className="flex flex-col items-center justify-center gap-4 py-20">
                    <h2 className="text-center text-2xl font-medium text-primary">Books is empty</h2>
                </div>
            )}
        </section>
    )
}

export default Book
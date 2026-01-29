"use client"

import { Chip, useDisclosure } from "@heroui/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect } from "react"
import useBook from "./useBook"
import DataTable from "@/src/components/ui/DataTable"
import DropdownAction from "@/src/components/common/DropdownAction"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import { COLUMN_LISTS_BOOK } from "./Book.constans"
import { ICategory } from "@/src/types/Category"
import { convertIDR } from "@/src/utils/currency"
import DeleteBook from "./DeleteBook"
import AddBook from "./AddBook"

const Book = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        dataBook,
        isLoadingBook,
        isRefetchingBook,
        refetchBook,
        selectedId,
        setSelectedId } = useBook()

    const addBook = useDisclosure()
    const deleteBook = useDisclosure()
    const { setURL } = useChangeUrl()

    useEffect(() => {
        setURL();
    }, []);

    const renderCell = useCallback(
        (Book: Record<string, unknown>, columnKey: Key) => {
            const cellValue = Book[columnKey as keyof typeof Book]
            switch (columnKey) {
                case "image":
                    return (
                        <Image src={`${cellValue}`} alt="image" width={100} height={150} className="rounded-lg" />
                    )
                case "publishDate":
                    if (!cellValue) {
                        return "-"
                    }
                    return <span>{cellValue as string}</span>
                case "category":
                    const category = cellValue as ICategory
                    if (!category) {
                        return "-"
                    }
                    return category.name
                case "price":
                    return `${convertIDR(cellValue as number)}`
                case "isActive":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Publish" : "Pending"}
                        </Chip>
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => router.push(`/admin/book/${Book._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${Book._id}`);
                                deleteBook.onOpen()
                            }}
                        />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [router, deleteBook, setSelectedId]
    )

    return (
        <section>
            {searchParams.toString().length > 0 && (
                <DataTable
                    buttonTopContent="Create Book"
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_BOOK}
                    data={dataBook?.data || []}
                    isLoading={isLoadingBook || isRefetchingBook}
                    onClickButtonTopContent={addBook.onOpen}
                    totalPage={dataBook?.pagination.totalPages}
                    emptyContent="Book is empty"
                />
            )}

            <AddBook
                {...addBook}
                refetchBook={refetchBook} />

            <DeleteBook
                {...deleteBook}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchBook={refetchBook} />
        </section>
    )
}

export default Book
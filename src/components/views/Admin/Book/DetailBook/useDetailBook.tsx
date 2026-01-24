"use client"

import BookService from "@/src/services/book.service"
import { IBook } from "@/src/types/Book"
import { toDateStandard } from "@/src/utils/date"
import { addToast, DateValue } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"
import { BookFormValues } from "./InfoTab/useInfoTab"

const useDetailBook = () => {
    const { id } = useParams<{ id: string }>()

    const {
        mutate: mutateUpdateBook,
        isPending: isPendingMutateUpdateBook,
        isSuccess: isSuccessMutateUpdateBook
    } = useMutation({
        mutationFn: (payload: Partial<IBook>) => updateBook(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchBook()
            addToast({
                title: "Success",
                description: "Success Update Book",
                color: "success"
            })
        }
    })

    const findBooksById = async (id: string) => {
        const { data } = await BookService.findOneBook(id)
        return data.data
    }

    const { data: dataBook, refetch: refetchBook } = useQuery({
        queryKey: ["Books"],
        queryFn: () => findBooksById(`${id}`),
        enabled: true
    })

    const updateBook = async (payload: Partial<IBook>) => {
        const { data } = await BookService.updateBook(`${id}`, payload)
        return data.data
    }

    const handleUpdateBookInfo = (data: BookFormValues) => {
        const payload: Partial<IBook> = {
            title: data.title,
            author: data.author,
            publishDate: toDateStandard(data.publishDate),
            description: data.description,
            price: data.price,
            stock: data.stock,
            category: data.category,
            isActive: data.isActive,
            isFeatured: data.isFeatured,
        }
        mutateUpdateBook(payload)
    }

    const handleUpdateBookImage = (data: Partial<IBook>) => {
        mutateUpdateBook(data)
    }

    return {
        dataBook,

        handleUpdateBookInfo,
        handleUpdateBookImage,
        isPendingMutateUpdateBook,
        isSuccessMutateUpdateBook,

    }
}

export default useDetailBook
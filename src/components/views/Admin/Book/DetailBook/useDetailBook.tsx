"use client"

import BookService from "@/src/services/book.service"
import { IBook } from "@/src/types/Book"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useDetailBook = () => {
    const {id} = useParams<{ id: string }>()

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

    const handleUpdateBook = (data: Partial<IBook>) => mutateUpdateBook(data as IBook)

    return {
        dataBook,

        handleUpdateBook,
        mutateUpdateBook,
        isPendingMutateUpdateBook,
        isSuccessMutateUpdateBook,

    }
}

export default useDetailBook
"use client"

import orderServices from "@/src/services/order.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteTransaction = () => {
    const deleteTransaction = async (id: string) => {
        return await orderServices.deleteOrder(id)
    }

    const {
        mutate: mutateDeleteTransaction,
        isPending: isPendingDeleteTransaction,
        isSuccess: isSuccessDeleteTransaction
    } = useMutation({
        mutationFn: deleteTransaction,
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: " Delete Transaction Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteTransaction,
        isPendingDeleteTransaction,
        isSuccessDeleteTransaction
    }
}

export default useDeleteTransaction
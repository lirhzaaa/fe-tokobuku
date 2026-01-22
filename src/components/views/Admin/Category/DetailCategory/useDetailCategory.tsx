"use client"

import CategoryService from "@/src/services/category.service"
import { ICategory } from "@/src/types/Category"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useDetailCategory = () => {
    const { id } = useParams<{ id: string }>()

    const getCategoryById = async (id: string) => {
        const { data } = await CategoryService.getCategoryById(id)
        return data.data
    }

    const { data: dataCategory, refetch: refetchCategory } = useQuery({
        queryKey: ["Categories", id],
        queryFn: () => getCategoryById(id!),
        enabled: true,
    })

    const updateCategory = async (payload: ICategory) => {
        const { data } = await CategoryService.updateCategory(`${id}`, payload)
        return data?.data
    }

    const {
        mutate: mutateUpdateCategory,
        isPending: isPendingMutateUpdateCategory,
        isSuccess: isSuccessMutateUpdateCategory
    } = useMutation({
        mutationFn: (payload: ICategory) => updateCategory(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchCategory()
            addToast({
                title: "Success",
                description: "Success Update Category",
                color: "success"
            })
        }
    })

    const handleUpdateCategory = (data: ICategory) => mutateUpdateCategory(data)

    return {
        dataCategory,

        handleUpdateCategory,
        mutateUpdateCategory,
        isPendingMutateUpdateCategory,
        isSuccessMutateUpdateCategory,

    }
}

export default useDetailCategory
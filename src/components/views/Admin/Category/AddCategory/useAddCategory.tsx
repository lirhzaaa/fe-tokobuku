"use client"

import CategoryService from "@/src/services/category.service"
import { ICategory } from "@/src/types/Category"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

type CategoryForm = {
    name: string
    description: string
    isPublish: string
}

const schema = Yup.object().shape({
    name: Yup.string().required("Please input name"),
    description: Yup.string().required("Please input description"),
    isPublish: Yup.string().required("Please select status"),
})

const useAddCategory = () => {
    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm<CategoryForm>({
        resolver: yupResolver(schema),
        defaultValues: {
            name: "",
            description: "",
            isPublish: "true"
        }
    })

    const addCategory = async (payload: ICategory) => {
        return await CategoryService.addCategory(payload)
    }

    const { mutate: mutateAddCategory, isPending: isPendingMutateAddCategory, isSuccess: isSuccessMutateAddCategory } = useMutation({
        mutationFn: addCategory,
        onError: (error) => {
            addToast({
                title: "Terjadi Kesalahan",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: "Success add category",
                color: "success"
            })
            reset()
        }
    })

    const handleAddCategory = (data: CategoryForm) => {
        const payload: ICategory = {
            ...data,
            isPublish: data.isPublish === "true"
        }
        mutateAddCategory(payload)
    }
    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
    }
}

export default useAddCategory
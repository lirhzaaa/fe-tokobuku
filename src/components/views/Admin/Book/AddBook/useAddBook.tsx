"use client"

import useMediaHandling from "@/src/hooks/useMediaHandling"
import BookService from "@/src/services/book.service"
import CategoryService from "@/src/services/category.service"
import { IBook } from "@/src/types/Book"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    image: Yup.mixed<FileList | string>().required("Please input image"),
    title: Yup.string().required("Please input title"),
    author: Yup.string().required("Please input author"),
    description: Yup.string().required("Please input description"),
    price: Yup.string().required("Please input price"),
    stock: Yup.string().required("Please input stock"),
    category: Yup.string().required("Please select category"),
    isActive: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select status"),

})

const useAddBook = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm<IBook>({
        resolver: yupResolver(schema),
        defaultValues: {
            image: undefined as unknown as FileList,
            title: "",
            author: "",
            description: "",
            price: "",
            stock: "",
            category: "",
            isActive: "true",
            isFeatured: "true",
        }
    })

    const preview = watch("image")
    const fileUrl = getValues("image")

    const handleUploadImage = (files: FileList, onChange: (files: FileList | undefined) => void) => {
        handleUploadFile(files, onChange, (fileUrl: string | undefined) => {
            if (fileUrl) {
                setValue("image", fileUrl)
            }
        })
    }

    const handleDeleteImage = (
        onChange: (files: FileList | undefined) => void
    ) => {
        handleDeleteFile(fileUrl, () => onChange(undefined))
    }

    const handleOnClose = (onClose: () => void) => {
        handleDeleteFile(fileUrl, () => {
            reset()
            onClose()
        })
    }

    const { data: dataCategory } = useQuery({
        queryKey: ["Categories"],
        queryFn: () => CategoryService.getCategory(),
        enabled: true
    })

    const addBook = async (payload: IBook) => {
        return await BookService.addBook(payload)
    }

    const { mutate: mutateAddBook, isPending: isPendingMutateAddBook, isSuccess: isSuccessMutateAddBook } = useMutation({
        mutationFn: addBook,
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
                description: "Success add Banner",
                color: "success"
            })
            reset()
        }
    })

    const handleAddBook = (data: IBook) => mutateAddBook(data)

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddBook,
        isPendingMutateAddBook,
        isSuccessMutateAddBook,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        dataCategory,
        handleOnClose
    }
}

export default useAddBook
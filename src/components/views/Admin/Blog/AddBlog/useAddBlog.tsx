"use client"

import useMediaHandling from "@/src/hooks/useMediaHandling"
import BlogService from "@/src/services/blog.service"
import CategoryService from "@/src/services/category.service"
import { IBlog } from "@/src/types/Blog"
import { addToast, DateValue } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { parseDate } from "@internationalized/date"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"
type AdBlogFormValues = Yup.InferType<typeof schema>;

const schema = Yup.object().shape({
    image: Yup.mixed<FileList | string>().required("Please input image"),
    title: Yup.string().required("Please input title"),
    author: Yup.string().required("Please input author"),
    publishDate: Yup.mixed<DateValue>().required("Please select publish date"),
    description: Yup.string().required("Please input description"),
    price: Yup.string().required("Please input price"),
    stock: Yup.string().required("Please input stock"),
    category: Yup.string().required("Please select category"),
    isActive: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select status"),
})

const useAddBlog = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            image: undefined as unknown as FileList,
            title: "",
            author: "",
            publishDate: parseDate("2026-01-01"),
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
        queryFn: () => CategoryService.getCategoryActive(),
        enabled: true
    })

    const addBlog = async (payload: IBlog) => {
        return await BlogService.addBlog(payload)
    }

    const { mutate: mutateAddBlog, isPending: isPendingMutateAddBlog, isSuccess: isSuccessMutateAddBlog } = useMutation({
        mutationFn: addBlog,
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

    const handleAddBlog = (payload: AdBlogFormValues) => mutateAddBlog(payload)

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddBlog,
        isPendingMutateAddBlog,
        isSuccessMutateAddBlog,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        dataCategory,
        handleOnClose
    }
}

export default useAddBlog
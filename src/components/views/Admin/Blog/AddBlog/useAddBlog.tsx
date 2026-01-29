"use client"

import useMediaHandling from "@/src/hooks/useMediaHandling"
import BlogService from "@/src/services/blog.service"
import { IBlog } from "@/src/types/Blog"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    title: Yup.string().required("Please input title").min(3).max(200),
    slug: Yup.string().defined(),
    excerpt: Yup.string().required("Please input excerpt").min(10).max(300),
    image: Yup.mixed<FileList | string>().required("Please input cover image"),
    content: Yup.string().required("Please input content").min(50),
    tags: Yup.array()
        .of(Yup.string().required())
        .min(1, "Please input at least one tag")
        .required("Please input tags"),
    author: Yup.string().defined(),
    isActive: Yup.string().required("Please select status"),
    isFeatured: Yup.string().required("Please select featured status"),
});

type AddBlogFormValues = Yup.InferType<typeof schema>;

const useAddBlog = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling()


    const {
        control,
        handleSubmit: handleSubmitForm,
        formState: { errors },
        reset,
        watch,
        getValues,
        setValue
    } = useForm<AddBlogFormValues>({
        resolver: yupResolver(schema),
        defaultValues: {
            image: undefined as unknown as FileList,
            title: "",
            slug: "",
            excerpt: "",
            content: "",
            tags: [""],
            author: "",
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

    const addBlog = async (payload: IBlog) => {
        return await BlogService.addBlog(payload)
    }

    const {
        mutate: mutateAddBlog,
        isPending: isPendingMutateAddBlog,
        isSuccess: isSuccessMutateAddBlog
    } = useMutation({
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
                description: "Success add blog",
                color: "success"
            })
            reset()
        }
    })

    const handleAddBlog = (payload: AddBlogFormValues) => mutateAddBlog(payload)

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

        handleOnClose
    }
}

export default useAddBlog
import useMediaHandling from "@/src/hooks/useMediaHandling"
import BannerService from "@/src/services/banner.service"
import { IBanner } from "@/src/types/Banner"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schema = Yup.object().shape({
    title: Yup.string().required("Please input title"),
    image: Yup.mixed<FileList | string>().required("Please input image"),
    isShow: Yup.string().required("Please select isShow"),
})

const useAddBanner = () => {
    const {
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        handleUploadFile,
        handleDeleteFile,
    } = useMediaHandling()

    const {
        control, handleSubmit: handleSubmitForm, formState: { errors }, reset, watch, getValues, setValue
    } = useForm<IBanner>({
        resolver: yupResolver(schema),
        defaultValues: {
            title: "",
            image: undefined as unknown as FileList,
            isShow: ""
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

    const addBanner = async (payload: IBanner) => {
        return await BannerService.addBanner(payload)
    }

    const { mutate: mutateAddBanner, isPending: isPendingMutateAddBanner, isSuccess: isSuccessMutateAddBanner } = useMutation({
        mutationFn: addBanner,
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

    const handleAddBanner = (data: IBanner) => mutateAddBanner(data)

    return {
        control,
        errors,
        reset,
        handleSubmitForm,

        handleAddBanner,
        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        handleOnClose
    }
}

export default useAddBanner
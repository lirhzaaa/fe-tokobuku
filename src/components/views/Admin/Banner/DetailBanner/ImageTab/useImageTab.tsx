import * as Yup from "yup"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import useMediaHandling from "@/src/hooks/useMediaHandling"


const schemaUpdateImage = Yup.object().shape({
    image: Yup.mixed<FileList | string>().required("Please input image")
})

const useImageTab = () => {
    const {
        mutateUploadFile,
        mutateDeleteFile,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
    } = useMediaHandling()

    const {
        control: controlUpdateImage,
        handleSubmit: handleSubmitUpdateImage,
        formState: { errors: errorsUpdateImage },
        reset: resetUpdateImage,
        watch: watchUpdateImage,
        getValues: getValuesUpdateImage,
        setValue: setValueUpdateImage
    } = useForm({
        resolver: yupResolver(schemaUpdateImage)
    })

    const handleUploadUpdateImage = (
        files: FileList, onChange: (files: FileList | undefined) => void) => {
        if (files.length !== 0) {
            onChange(files)
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => {
                    setValueUpdateImage("image", fileUrl)
                }
            })
        }
    }

    const handleDeleteUpdateImage = (
        onchange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValuesUpdateImage("image")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onchange(undefined) })
        }
    }

    const preview = watchUpdateImage("image")

    return {
        preview,

        handleUploadUpdateImage,
        handleDeleteUpdateImage,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        controlUpdateImage,
        handleSubmitUpdateImage,
        errorsUpdateImage,
        resetUpdateImage
    }
}

export default useImageTab

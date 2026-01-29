"use client"

import useMediaHandling from "@/src/hooks/useMediaHandling"
import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdatePicture = Yup.object().shape({
    profilePicture: Yup.mixed<FileList | string>().required("Please input Picture")
})

const usePictureTab = () => {
    const {
        mutateUploadFile,
        mutateDeleteFile,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile
    } = useMediaHandling()

    const {
        control: controlUpdatePicture,
        handleSubmit: handleSubmitUpdatePicture,
        formState: { errors: errosUpdatePicture },
        reset: resetUpdatePicture,
        watch: watchUpdatePicture,
        getValues: getValuesUpdatePicture,
        setValue: setValueUpdatePicture,
    } = useForm({
        resolver: yupResolver(schemaUpdatePicture)
    })

    const handleUploadUpdatePicture = (
        files: FileList, onChange: (files: FileList | undefined) => void
    ) => {
        if (files.length !== 0) {
            onChange(files)
            mutateUploadFile({
                file: files[0],
                callback: (fileUrl: string) => [
                    setValueUpdatePicture("profilePicture", fileUrl)
                ]
            })
        }
    }

    const handleDeleteUploadPicture = (
        onchange: (files: FileList | undefined) => void
    ) => {
        const fileUrl = getValuesUpdatePicture("profilePicture")
        if (typeof fileUrl === "string") {
            mutateDeleteFile({ fileUrl, callback: () => onchange(undefined) })
        }
    }

    const preview = watchUpdatePicture("profilePicture")

    return {
        handleUploadUpdatePicture,
        handleDeleteUploadPicture,
        handleSubmitUpdatePicture,
        
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,
        
        preview,
        controlUpdatePicture,
        errosUpdatePicture,
        resetUpdatePicture
    }
}

export default usePictureTab
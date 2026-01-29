"use client"

import { yupResolver } from "@hookform/resolvers/yup"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdateInfo = Yup.object().shape({
    fullName: Yup.string().required("Please input your fullName"),
    username: Yup.string().required("Please input your username"),
})

const useInfoTab = () => {

    const {
        control: controlUpdateInfo,
        handleSubmit: handleSubmitUpdateInfo,
        formState: { errors: errorsUpdateInfo },
        reset: resetUpdateInfo,
        setValue: setValueUpdateInfo
    } = useForm({
        resolver: yupResolver(schemaUpdateInfo),
        defaultValues: {
            fullName: "",
            username: "",
        }
    })

    return {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    }
}

export default useInfoTab
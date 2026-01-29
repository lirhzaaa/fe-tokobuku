"use client"

import AuthService from "@/src/services/auth.service"
import { ISecurity } from "@/src/types/Auth"
import { addToast } from "@heroui/react"
import { yupResolver } from "@hookform/resolvers/yup"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as Yup from "yup"

const schemaUpdatePassword = Yup.object().shape({
    oldPassword: Yup.string().required("Please input your password"),
    password: Yup.string().required("Please input new password"),
    confirmPassword: Yup.string().required("Please input confirm password"),
})

const useSecurityTab = () => {
    const [isVisible, setIsVisible] = useState({
        oldPassword: false,
        password: false,
        confirmPassword: false,
    })
    const handleTogglePassword = (key: "oldPassword" |"password" | "confirmPassword") => {
        setIsVisible({
            ...isVisible,
            [key]: !isVisible[key],
        });
    };

    const {
        control: controlUpdatePassword,
        handleSubmit: handleSubmitUpdatePassword,
        formState: { errors: errorsUpdatePassword },
        reset: resetUpdatePassword,
    } = useForm({
        resolver: yupResolver(schemaUpdatePassword),
        defaultValues: {
            oldPassword: "",
            password: "",
            confirmPassword: "",
        }
    })

    const updatePassword = async (payload: ISecurity,) => {
        const { data } = await AuthService.updatePassword(payload)
        return data.data
    }

    const {
        mutate: mutateUpdatePassword,
        isPending: isPendingMutatePassword,
    } = useMutation({
        mutationFn: (payload: ISecurity) => updatePassword(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            resetUpdatePassword()
            addToast({
                title: "Success",
                description: "Success Update Password",
                color: "success"
            })
        }
    })

    const handleUpdatePassword = (data: ISecurity) => mutateUpdatePassword(data)

    return {
        controlUpdatePassword,
        handleSubmitUpdatePassword,
        handleUpdatePassword,
        errorsUpdatePassword,
        isPendingMutatePassword,

        isVisible,
        handleTogglePassword
    }
}

export default useSecurityTab
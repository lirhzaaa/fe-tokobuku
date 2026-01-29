"use client"

import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import AuthService from "../../../../services/auth.service"
import { IProfile } from "@/src/types/Auth"

const useProfile = () => {
    const getProfile = async () => {
        const { data } = await AuthService.findProfile()
        return data.data
    }

    const { data: dataProfile, refetch: refetchProfile } = useQuery({
        queryKey: ["Profile"],
        queryFn: getProfile,
        enabled: true
    })

    const {
        mutate: mutateUpdateProfile,
        isPending: isPendingMutateProfile,
        isSuccess: isSuccessMutateProfile,
    } = useMutation({
        mutationFn: (payload: IProfile) => updateProfile(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchProfile()
            addToast({
                title: "Success",
                description: "Success Update Profile",
                color: "success"
            })
        }
    })

    const updateProfile = async (payload: IProfile) => {
        const { data } = await AuthService.updateProfile(payload)
        return data.data
    }

    const handleUpdateProfile = (data: IProfile) => mutateUpdateProfile(data)

    return {
        dataProfile,
        handleUpdateProfile,

        isPendingMutateProfile,
        isSuccessMutateProfile
    }
}

export default useProfile
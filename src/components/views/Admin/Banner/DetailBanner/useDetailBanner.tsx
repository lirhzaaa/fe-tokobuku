"use client"

import BannerService from "@/src/services/banner.service"
import { IBanner } from "@/src/types/Banner"
import { addToast } from "@heroui/react"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useDetailBanner = () => {
    const {id} = useParams<{ id: string }>()

    const {
        mutate: mutateUpdateBanner,
        isPending: isPendingMutateUpdateBanner,
        isSuccess: isSuccessMutateUpdateBanner
    } = useMutation({
        mutationFn: (payload: Partial<IBanner>) => updateBanner(payload),
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            refetchBanner()
            addToast({
                title: "Success",
                description: "Success Update Banner",
                color: "success"
            })
        }
    })

    const getBannersById = async (id: string) => {
        const { data } = await BannerService.findOneBanner(id)
        return data.data
    }

    const { data: dataBanner, refetch: refetchBanner } = useQuery({
        queryKey: ["Banners"],
        queryFn: () => getBannersById(`${id}`),
        enabled: true
    })

    const updateBanner = async (payload: Partial<IBanner>) => {
        const { data } = await BannerService.updateBanner(`${id}`, payload)
        return data.data
    }

    const handleUpdateBanner = (data: Partial<IBanner>) => mutateUpdateBanner(data as IBanner)

    return {
        dataBanner,

        handleUpdateBanner,
        mutateUpdateBanner,
        isPendingMutateUpdateBanner,
        isSuccessMutateUpdateBanner,

    }
}

export default useDetailBanner
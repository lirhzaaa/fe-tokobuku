import BannerService from "@/src/services/banner.service"
import { addToast } from "@heroui/react"
import { useMutation } from "@tanstack/react-query"

const useDeleteBanner = () => {
    const DeleteBanner = async (id: string) => {
        return await BannerService.deleteBanner(id)
    }

    const {
        mutate: mutateDeleteBanner,
        isPending: isPendingDeleteBanner,
        isSuccess: isSuccessDeleteBanner
    } = useMutation({
        mutationFn: DeleteBanner,
        onError: (error) => {
            addToast({
                title: "Error",
                description: error.message,
                color: "danger"
            })
        },
        onSuccess: () => {
            addToast({
                title: "Success",
                description: " Delete Banner Success",
                color: "success"
            })
        }
    })

    return {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner
    }
}

export default useDeleteBanner
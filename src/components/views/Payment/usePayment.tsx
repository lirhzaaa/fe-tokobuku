import orderServices from "@/src/services/order.service"
import { useMutation } from "@tanstack/react-query"

type UpdateOrderPayload = {
    order_id: string
    status: string
}

const standardizeStatus = (status: string) => {
    switch (status) {
        case "success":
            return "completed"
        case "progress":
            return "pending"
        case "failed":
            return "cancelled"
        default:
            return status
    }
}

const usePayment = () => {
    const mutation = useMutation({
        mutationFn: async ({ order_id, status }: UpdateOrderPayload) => {
            return orderServices.updateOrderStatus(
                order_id,
                standardizeStatus(status)
            )
        },
    })

    return {
        mutateUpdateOrderStatus: mutation.mutate,
        isLoading: mutation.isPending,
        isSuccess: mutation.isSuccess,
        isError: mutation.isError,
    }
}

export default usePayment

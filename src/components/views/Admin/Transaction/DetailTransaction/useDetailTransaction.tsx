"use client"

import orderServices from "@/src/services/order.service"
import { useQuery } from "@tanstack/react-query"
import { useParams } from "next/navigation"

const useDetailTransaction = () => {
    const params = useParams()
    const orderId = params?.id as string

    const getOrderById = async () => {
        const { data } = await orderServices.getOrderById(orderId)
        return data.data
    }

    const { data: dataOrder, isLoading: isLoadingOrder } = useQuery({
        queryKey: ["order", orderId],
        queryFn: getOrderById,
        enabled: !!orderId,
    })

    return {
        dataOrder,
        isLoadingOrder,
    }
}

export default useDetailTransaction
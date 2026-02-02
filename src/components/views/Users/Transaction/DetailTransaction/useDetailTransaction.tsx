"use client"

import orderServices from "@/src/services/order.service"
import { useQuery } from "@tanstack/react-query"
import { useParams, useRouter } from "next/navigation"

const useDetailTransaction = () => {
  const params = useParams()
  const router = useRouter()
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

  const handlePay = () => {
    if (!dataOrder?.payment?.token) return

    window.snap.pay(dataOrder.payment.token, {
      onSuccess: function (result) {
        router.push(`/payment/success?order_id=${result.order_id}`)
      },
      onPending: function (result) {
        router.push(`/payment/pending?order_id=${result.order_id}`)
      },
      onError: function (result) {
        router.push(`/payment/error?order_id=${result.order_id}`)
      },
      onClose: function () {
        console.log("Payment closed")
      },
    })
  }

  return {
    dataOrder,
    isLoadingOrder,
    handlePay,
  }
}

export default useDetailTransaction

"use client"

import { Button } from "@heroui/react"
import { useRouter, useSearchParams, usePathname } from "next/navigation"
import { useEffect } from "react"
import usePayment from "./usePayment"

const Payment = () => {
    const router = useRouter()
    const searchParams = useSearchParams()
    const pathname = usePathname()
    const { mutateUpdateOrderStatus } = usePayment()

    const order_id = searchParams.get("order_id")
    const status = pathname.split("/").pop()

    useEffect(() => {
        if (!order_id || !status) return

        mutateUpdateOrderStatus({
            order_id,
            status,
        })
    }, [order_id, status, mutateUpdateOrderStatus])

    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center text-center gap-2">
                <h4 className="text-2xl font-bold text-primary capitalize">
                    Transaction {status}
                </h4>

                {order_id && (
                    <Button
                        className="mt-4 w-fit"
                        variant="bordered"
                        color="primary"
                        onPress={() => router.push(`/transaction/${order_id}`)}
                    >
                        Check your transaction here
                    </Button>
                )}
            </div>
        </div>
    )
}

export default Payment
"use client"

import { Card, CardBody, Chip, Skeleton } from "@heroui/react"
import type { ChipProps } from "@heroui/react"
import Image from "next/image"
import { format } from "date-fns"

import useDetailTransaction from "./useDetailTransaction"
import { convertIDR } from "@/src/utils/currency"

type OrderStatus = "completed" | "pending" | "cancelled"

interface Book {
    id: string
    title: string
    author: string
    image: string
}

interface OrderItem {
    id: string
    price: number
    quantity: number
    book: Book
}

interface Order {
    orderId: string
    createdAt: string
    total: number
    status: OrderStatus
    items: OrderItem[]
}

const DetailTransaction = () => {
    const { dataOrder, isLoadingOrder } = useDetailTransaction() as {
        dataOrder: Order | null
        isLoadingOrder: boolean
    }

    const getStatusColor = (status?: OrderStatus): ChipProps["color"] => {
        switch (status) {
            case "completed":
                return "success"
            case "pending":
                return "warning"
            case "cancelled":
                return "danger"
            default:
                return "default"
        }
    }

    return (
        <Card className="px-5 py-4">
            <CardBody className="gap-8">
                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-lg">Order Information</h4>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        <div>
                            <p className="text-sm font-semibold text-gray-600">Order ID</p>
                            <Skeleton isLoaded={!isLoadingOrder} className="h-4 rounded-md">
                                <p className="text-sm font-medium text-default-700">
                                    {dataOrder?.orderId ?? "-"}
                                </p>
                            </Skeleton>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-600">Order Date</p>
                            <Skeleton isLoaded={!isLoadingOrder} className="h-4 rounded-md">
                                <p className="text-sm font-medium text-default-700">
                                    {dataOrder?.createdAt
                                        ? format(new Date(dataOrder.createdAt), "dd MMM yyyy, HH:mm")
                                        : "-"}
                                </p>
                            </Skeleton>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-600">Total</p>
                            <Skeleton isLoaded={!isLoadingOrder} className="h-4 rounded-md">
                                <p className="text-sm font-medium text-primary">
                                    {convertIDR(dataOrder?.total ?? 0)}
                                </p>
                            </Skeleton>
                        </div>

                        <div>
                            <p className="text-sm font-semibold text-gray-600">Status</p>
                            <Skeleton isLoaded={!isLoadingOrder} className="h-4 rounded-md">
                                <Chip
                                    className="capitalize"
                                    color={getStatusColor(dataOrder?.status)}
                                    variant="flat"
                                    size="sm"
                                >
                                    {dataOrder?.status ?? "-"}
                                </Chip>
                            </Skeleton>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-2">
                    <h4 className="font-bold text-lg">Order Items</h4>

                    <div className="flex flex-col gap-4">
                        {isLoadingOrder ? (
                            <Skeleton className="h-32 rounded-lg" />
                        ) : (
                            dataOrder?.items.map((item) => (
                                <Card key={item.id} shadow="sm" className="p-4">
                                    <CardBody className="flex-row gap-4">
                                        <Image
                                            src={item.book.image}
                                            alt={item.book.title}
                                            width={80}
                                            height={120}
                                            className="rounded object-cover"
                                        />

                                        <div className="flex-1 space-y-2">
                                            <h3 className="font-bold text-lg text-default-700">
                                                {item.book.title}
                                            </h3>
                                            <p className="text-sm text-gray-600">
                                                by {item.book.author}
                                            </p>

                                            <div className="flex items-center gap-4">
                                                <p className="text-sm">
                                                    {convertIDR(item.price)} x {item.quantity}
                                                </p>
                                                <p className="font-semibold text-primary">
                                                    = {convertIDR(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))
                        )}
                    </div>
                </div>

                <div className="flex flex-col gap-2 border-t pt-4">
                    <h4 className="font-bold text-lg text-default-700">Order Summary</h4>

                    <div className="space-y-2">
                        <div className="flex justify-between border-t pt-2">
                            <p className="font-bold">Total</p>
                            <Skeleton isLoaded={!isLoadingOrder} className="h-4 rounded-md">
                                <p className="font-bold text-primary">
                                    {convertIDR(dataOrder?.total ?? 0)}
                                </p>
                            </Skeleton>
                        </div>
                    </div>
                </div>
            </CardBody>
        </Card>
    )
}

export default DetailTransaction

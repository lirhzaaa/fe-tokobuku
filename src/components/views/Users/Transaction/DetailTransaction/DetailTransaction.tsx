"use client"

import { Button, Card, CardBody, Chip, Skeleton } from "@heroui/react"
import type { ChipProps } from "@heroui/react"
import Image from "next/image"
import Script from "next/script"
import { format } from "date-fns"

import useDetailTransaction from "./useDetailTransaction"
import { convertIDR } from "@/src/utils/currency"
import { environment } from "@/src/config/environment"

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

interface Payment {
    token: string
}

interface Order {
    orderId: string
    createdAt: string
    total: number
    status: OrderStatus
    items: OrderItem[]
    payment?: Payment
}

const DetailTransaction = () => {
    const { dataOrder, isLoadingOrder, handlePay } = useDetailTransaction() as {
        dataOrder: Order | null
        isLoadingOrder: boolean
        handlePay: () => void
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
                <Script
                    src={environment.MIDTRANS_SNAP_URL}
                    data-client-key={environment.MIDTRANS_CLIENT_KEY}
                    strategy="lazyOnload"
                />

                <div className="flex flex-col gap-2">
                    <h4 className="font-bold">Order:</h4>

                    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                        <div>
                            <p className="text-sm font-semibold">Order ID:</p>
                            <Skeleton isLoaded={!isLoadingOrder}>
                                <p className="text-sm">{dataOrder?.orderId ?? "-"}</p>
                            </Skeleton>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Date:</p>
                            <Skeleton isLoaded={!isLoadingOrder}>
                                <p className="text-sm">
                                    {dataOrder?.createdAt
                                        ? format(new Date(dataOrder.createdAt), "dd MMM yyyy, HH:mm")
                                        : "-"}
                                </p>
                            </Skeleton>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Total:</p>
                            <Skeleton isLoaded={!isLoadingOrder}>
                                <p className="text-sm">
                                    {convertIDR(dataOrder?.total ?? 0)}
                                </p>
                            </Skeleton>
                        </div>

                        <div>
                            <p className="text-sm font-semibold">Status:</p>
                            <Skeleton isLoaded={!isLoadingOrder}>
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

                {dataOrder?.status === "completed" && (
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold">Books:</h4>

                        <div className="mt-2 flex flex-col gap-4">
                            {dataOrder.items.map((item) => (
                                <Card key={item.id} shadow="sm" className="p-4 pt-6 lg:p-2">
                                    <CardBody className="gap-8 lg:flex-row">
                                        <div className="mx-auto w-2/3 lg:m-0 lg:w-1/5">
                                            <Image
                                                src={item.book.image || "/placeholder.png"}
                                                alt={item.book.title}
                                                width={200}
                                                height={300}
                                                className="h-full w-full rounded object-cover"
                                            />
                                        </div>

                                        <div className="space-y-2">
                                            <h2 className="text-2xl font-bold text-primary">
                                                {item.book.title}
                                            </h2>

                                            <div className="text-sm font-bold">
                                                <p className="text-foreground-500">Author</p>
                                                <p className="text-primary">{item.book.author}</p>
                                            </div>

                                            <div className="text-sm font-bold">
                                                <p className="text-foreground-500">Quantity</p>
                                                <p className="text-primary">{item.quantity} pcs</p>
                                            </div>

                                            <div className="text-sm font-bold">
                                                <p className="text-foreground-500">Price</p>
                                                <p className="text-primary">
                                                    {convertIDR(item.price)} x {item.quantity} ={" "}
                                                    {convertIDR(item.price * item.quantity)}
                                                </p>
                                            </div>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                {dataOrder?.status === "pending" && (
                    <div className="flex flex-col gap-2">
                        <h4 className="font-bold">Order Items:</h4>

                        <div className="mt-2 flex flex-col gap-4">
                            {dataOrder.items.map((item) => (
                                <Card key={item.id} shadow="sm" className="p-4">
                                    <CardBody className="flex-row gap-4">
                                        <Image
                                            src={item.book.image || "/placeholder.png"}
                                            alt={item.book.title}
                                            width={60}
                                            height={90}
                                            className="rounded object-cover"
                                        />

                                        <div className="flex-1">
                                            <h3 className="font-bold">{item.book.title}</h3>
                                            <p className="text-sm text-gray-600">
                                                by {item.book.author}
                                            </p>
                                            <p className="mt-1 text-sm">
                                                {convertIDR(item.price)} x {item.quantity} ={" "}
                                                <span className="font-semibold text-primary">
                                                    {convertIDR(item.price * item.quantity)}
                                                </span>
                                            </p>
                                        </div>
                                    </CardBody>
                                </Card>
                            ))}
                        </div>
                    </div>
                )}

                <div className="flex justify-between border-t pt-2 font-bold">
                    <p>Total</p>
                    <Skeleton isLoaded={!isLoadingOrder}>
                        <p className="text-primary">
                            {convertIDR(dataOrder?.total ?? 0)}
                        </p>
                    </Skeleton>
                </div>

                {dataOrder?.status === "pending" && dataOrder.payment?.token && (
                    <Button color="primary" className="w-fit" onPress={handlePay}>
                        Pay Now
                    </Button>
                )}
            </CardBody>
        </Card>
    )
}

export default DetailTransaction

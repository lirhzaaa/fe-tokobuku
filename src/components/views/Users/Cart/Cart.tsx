"use client"

import { Button, Skeleton, Spinner } from "@heroui/react"
import { Minus, Plus, Trash2 } from "lucide-react"
import Image from "next/image"
import { Fragment, useEffect, useRef, useState } from "react"
import useCart from "./useCart"
import { convertIDR } from "@/src/utils/currency"
import Script from "next/script"
import { environment } from "@/src/config/environment"

const Cart = () => {
  const {
    items,
    totalPrice,
    updateQty,
    removeFromCart,
    isLoading,
    mutateCreateOrder,
    isLoadingCreateOrder,
  } = useCart()

  const [localQty, setLocalQty] = useState<Record<string, number>>({})
  const timeoutRef = useRef<Record<string, NodeJS.Timeout>>({})

  const isInitializedRef = useRef(false)

  useEffect(() => {
    setLocalQty((prev) => {
      const newMap: Record<string, number> = {}
      let hasChanges = false

      items.forEach((item) => {
        const bookId = item.book._id
        if (prev[bookId] !== undefined && isInitializedRef.current) {
          newMap[bookId] = prev[bookId]
        } else {
          newMap[bookId] = item.quantity
          hasChanges = true
        }
      })

      if (Object.keys(prev).length !== Object.keys(newMap).length) {
        hasChanges = true
      }

      isInitializedRef.current = true
      return hasChanges ? newMap : prev
    })
  }, [items])

  const changeQty = (bookId: string, qty: number) => {
    if (qty < 1) return

    setLocalQty((prev) => ({
      ...prev,
      [bookId]: qty,
    }))

    if (timeoutRef.current[bookId]) {
      clearTimeout(timeoutRef.current[bookId])
    }

    timeoutRef.current[bookId] = setTimeout(() => {
      updateQty(bookId, qty)
    }, 400)
  }

  const CartItemSkeleton = () => (
    <div className="flex flex-col sm:flex-row items-start sm:items-center p-3 sm:p-4 shadow-md rounded-lg gap-3 sm:gap-4">
      <Skeleton className="w-16 h-24 sm:w-[80px] sm:h-[120px] rounded shrink-0" />
      <div className="flex-1 space-y-2 w-full">
        <Skeleton className="h-4 w-full sm:w-3/4" />
        <Skeleton className="h-3 w-3/4 sm:w-1/2" />
        <Skeleton className="h-3 w-1/2 sm:w-1/3" />
      </div>
      <Skeleton className="h-8 w-20 sm:w-24" />
    </div>
  )

  return (
    <Fragment>
      <Script src={environment.MIDTRANS_SNAP_URL} data-client-key={environment.MIDTRANS_CLIENT_KEY} strategy="lazyOnload" />
      <div className="relative px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
          <h1 className="text-lg sm:text-xl font-bold text-primary">Cart Items</h1>
        </div>

        <div className="flex flex-col gap-3 sm:gap-4 mb-20 sm:mb-24">
          {isLoading ? (
            <Fragment>
              {[...Array(3)].map((_, i) => (
                <CartItemSkeleton key={i} />
              ))}
            </Fragment>
          ) : items.length === 0 ? (
            <div className="py-12 sm:py-20 text-center text-gray-500">
              <p className="text-lg sm:text-xl">Your cart is empty</p>
              <p className="mt-2 text-sm sm:text-base">Add some books to get started!</p>
            </div>
          ) : (
            items.map((item) => {
              const qty = localQty[item.book._id] ?? item.quantity

              return (
                <div
                  key={item.book._id}
                  className="flex w-full items-center gap-2"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 border border-default-200 shadow-sm rounded-lg w-full gap-3 sm:gap-4">
                    <div className="flex items-start sm:items-center gap-3 sm:gap-4 w-full sm:w-auto">
                      <Image
                        src={item.book.image}
                        alt={item.book.title}
                        width={80}
                        height={120}
                        className="rounded object-cover w-16 h-24 sm:w-[80px] sm:h-[120px] shrink-0"
                      />

                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-sm sm:text-base line-clamp-2 sm:truncate">
                          {item.book.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-600 truncate">
                          {item.book.author}
                        </p>
                        <p className="text-xs sm:text-sm text-gray-500 mt-1">
                          Stock: {item.book.stock}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-start w-full sm:w-auto gap-3 sm:gap-4">
                      <div className="flex items-center space-x-2">
                        <button
                          onClick={() =>
                            changeQty(item.book._id, qty - 1)
                          }
                          disabled={qty <= 1}
                          className="p-1.5 sm:p-2 border border-default-800 rounded-full hover:bg-primary/20 transition-colors duration-300 disabled:opacity-50">
                          <Minus size={12} className="sm:w-[10px] sm:h-[10px]" />
                        </button>

                        <span className="w-6 sm:w-8 text-center text-sm sm:text-base">{qty}</span>

                        <button
                          onClick={() =>
                            changeQty(item.book._id, qty + 1)
                          }
                          disabled={qty >= item.book.stock}
                          className="p-1.5 sm:p-2 border border-default-800 rounded-full hover:bg-primary/20 transition-colors duration-300 disabled:opacity-50">
                          <Plus size={12} className="sm:w-[10px] sm:h-[10px]" />
                        </button>
                      </div>

                      <p className="font-semibold text-sm sm:text-base sm:w-32 text-right">
                        {convertIDR(qty * item.price)}
                      </p>

                      <button
                        onClick={() => removeFromCart(item.book._id)}
                        className="p-1.5 sm:p-2 text-red-500 hover:bg-red-50 rounded transition-colors"
                        title="Remove from cart"
                      >
                        <Trash2 size={18} className="sm:w-5 sm:h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="sticky bottom-0 z-10 bg-white p-3 sm:p-4 border-t border-default-200 flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-0 shadow-md">
          {isLoading ? (
            <Skeleton className="h-8 w-full sm:w-64" />
          ) : (
            <>
              <h5 className="font-bold text-lg sm:text-xl text-center sm:text-left">
                Total:{" "}
                <span className="text-primary">
                  {convertIDR(totalPrice)}
                </span>
              </h5>

              <Button
                className="bg-primary text-white px-4 sm:px-6 py-2 rounded text-sm sm:text-base w-full sm:w-auto"
                onPress={() => mutateCreateOrder()}
                isDisabled={isLoadingCreateOrder}
              >
                {isLoadingCreateOrder ? (
                  <Spinner size="sm" color="white" />
                ) : (
                  "Checkout"
                )}
              </Button>
            </>
          )}
        </div>
      </div>
    </Fragment>
  )
}

export default Cart
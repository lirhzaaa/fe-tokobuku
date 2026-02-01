"use client"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { addToast } from "@heroui/react"
import CartService from "@/src/services/cart.service"
import orderServices from "@/src/services/order.service"

interface CartItem {
  book: {
    _id: string
    title: string
    author: string
    price: number
    image: string
    stock: number
  }
  quantity: number
  price: number
}

interface Cart {
  _id: string
  items: CartItem[]
  totalItems: number
  totalPrice: number
}

const useCart = () => {
  const router = useRouter()
  const queryClient = useQueryClient()

  const fetchCart = async (): Promise<Cart> => {
    const response = await CartService.findCart()
    return response.data?.data
  }

  const {
    data: Datacart,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["cart"],
    queryFn: fetchCart,
  })

  const addToCartMutation = useMutation({
    mutationFn: CartService.addCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      addToast({
        title: "Success",
        description: "Item added to cart",
        color: "success",
      })
    },
    onError: (error) => {
      addToast({
        title: "Error",
        description: error.message || "Failed to add item",
        color: "danger",
      })
    },
  })

  const updateCartMutation = useMutation({
    mutationFn: CartService.updateCart,
    onMutate: async ({ bookId, quantity }) => {
      await queryClient.cancelQueries({ queryKey: ["cart"] })
      const previousCart = queryClient.getQueryData<Cart>(["cart"])

      queryClient.setQueryData<Cart>(["cart"], (old) => {
        if (!old) return old
        return {
          ...old,
          items: old.items.map((item) =>
            item.book._id === bookId ? { ...item, quantity } : item
          ),
          totalItems: old.items.reduce(
            (sum, item) =>
              sum + (item.book._id === bookId ? quantity : item.quantity),
            0
          ),
          totalPrice: old.items.reduce(
            (sum, item) =>
              sum +
              (item.book._id === bookId
                ? quantity * item.price
                : item.quantity * item.price),
            0
          ),
        }
      })

      return { previousCart }
    },
    onError: (_err, _vars, context) => {
      if (context?.previousCart) {
        queryClient.setQueryData(["cart"], context.previousCart)
      }
    },
  })

  const removeFromCartMutation = useMutation({
    mutationFn: CartService.deleteCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["cart"] })
      addToast({
        title: "Success",
        description: "Item removed from cart",
        color: "success",
      })
    },
  })

  const createOrder = async () => {
    const { data } = await orderServices.createOrder()
    return data.data
  }

  const { mutate: mutateCreateOrder, isPending: isPendingCreateOrder } =
    useMutation({
      mutationFn: createOrder,
      onError: (error) => {
        addToast({
          title: "Error",
          description: error.message,
          color: "danger",
        })
      },
      onSuccess: (result) => {
        queryClient.invalidateQueries({ queryKey: ["cart"] })

        if (result.payment?.token) {
          const transactionToken = result.payment.token
          window.snap.pay(transactionToken)
        } else {
          addToast({
            title: "Order Created",
            description: "Your order has been created successfully.",
            color: "success",
          })
          router.push("/orders")
        }
      },
    })

  const handleAddToCart = (bookId: string, quantity: number) => {
    addToCartMutation.mutate({ bookId, quantity })
  }

  const updateQty = (bookId: string, quantity: number) => {
    updateCartMutation.mutate({ bookId, quantity })
  }

  const removeFromCart = (bookId: string) => {
    removeFromCartMutation.mutate({ bookId })
  }

  return {
    items: Datacart?.items ?? [],
    totalItems: Datacart?.totalItems ?? 0,
    totalPrice: Datacart?.totalPrice ?? 0,
    isLoading,
    error,

    handleAddToCart,
    updateQty,
    removeFromCart,

    mutateCreateOrder,
    isPendingCreateOrder,
  }
}

export default useCart
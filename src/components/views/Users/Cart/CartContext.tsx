"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from "react"

export interface CartItem {
  id: string
  title: string
  author: string
  price: number
  image: string
  stock: number
  qty: number
  selected: boolean
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "qty" | "selected">, qty: number) => void
  removeFromCart: (id: string) => void
  updateQty: (id: string, qty: number) => void
  toggleSelect: (id: string) => void
  toggleSelectAll: () => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
  selectedTotal: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window !== "undefined") {
      const savedCart = localStorage.getItem("cart")
      if (savedCart) {
        try {
          return JSON.parse(savedCart)
        } catch (error) {
          console.error("Failed to parse cart from localStorage:", error)
          return []
        }
      }
    }
    return []
  })

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(items))
    }
  }, [items])

  const addToCart = (item: Omit<CartItem, "qty" | "selected">, qty: number) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      
      if (existingItem) {
        return prevItems.map((i) =>
          i.id === item.id
            ? { ...i, qty: Math.min(i.qty + qty, item.stock) }
            : i
        )
      } else {
        return [...prevItems, { ...item, qty, selected: true }]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }

  const updateQty = (id: string, qty: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, Math.min(qty, item.stock)) } : item
      )
    )
  }

  const toggleSelect = (id: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, selected: !item.selected } : item
      )
    )
  }

  const toggleSelectAll = () => {
    const allSelected = items.every((item) => item.selected)
    setItems((prevItems) =>
      prevItems.map((item) => ({ ...item, selected: !allSelected }))
    )
  }

  const clearCart = () => {
    setItems([])
  }

  const totalItems = items.reduce((sum, item) => sum + item.qty, 0)
  const totalPrice = items.reduce((sum, item) => sum + item.qty * item.price, 0)
  const selectedTotal = items
    .filter((item) => item.selected)
    .reduce((sum, item) => sum + item.qty * item.price, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQty,
        toggleSelect,
        toggleSelectAll,
        clearCart,
        totalItems,
        totalPrice,
        selectedTotal,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCartContext = () => {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCartContext must be used within CartProvider")
  }
  return context
}
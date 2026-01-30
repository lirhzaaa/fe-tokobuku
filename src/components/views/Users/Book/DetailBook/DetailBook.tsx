"use client"

import Image from "next/image"
import useDetailBook from "./useDetailBook"
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Skeleton
} from "@heroui/react"
import { useEffect, useState } from "react"
import { COLUMN_LISTS_BOOK_DETAIL } from "./DetailBook.constants"
import { getBookDetailRows } from "./book-detail-rows"
import useCart from "../../Cart/useCart"

const DetailBook = () => {
  const { dataBook, isLoadingBook } = useDetailBook()
  const { handleAddToCart } = useCart()
  const [stock, setStock] = useState(1)

  useEffect(() => {
    if (dataBook) {
      console.log("dataBook structure:", dataBook)
    }
  }, [dataBook])

  if (isLoadingBook) {
    return (
      <section className="flex gap-10">
        <Skeleton className="w-[300px] h-[420px] rounded-xl" />
        <div className="flex flex-col gap-4 flex-1">
          <Skeleton className="w-full h-8 rounded-lg" />
          <Skeleton className="w-full h-32 rounded-lg" />
          <Skeleton className="w-1/3 h-10 rounded-lg" />
        </div>
      </section>
    )
  }

  if (!dataBook) {
    return (
      <div className="py-20 text-center text-gray-500">
        Book not found
      </div>
    )
  }

  const categoryName =
    typeof dataBook.category === "object" && dataBook.category !== null
      ? dataBook.category.name
      : "-"

  const increaseStock = () => {
    if (stock < dataBook.stock) setStock(stock + 1)
  }

  const decreaseStock = () => {
    if (stock > 1) setStock(stock - 1)
  }

  const onAddToCart = () => {
    handleAddToCart(dataBook._id, stock)
  }

  return (
    <section className="flex flex-col gap-10">
      <div className="flex flex-col md:flex-row gap-10">
        <div className="w-full md:w-[300px] shrink-0">
          <Image
            src={dataBook.image}
            alt={dataBook.title}
            width={300}
            height={420}
            className="rounded-xl object-cover w-full"
            priority
          />
        </div>

        <div className="flex flex-col gap-6 flex-1">
          <h1 className="text-2xl font-bold text-primary">
            {dataBook.title}
          </h1>

          <Table
            aria-label="Book information"
            removeWrapper
            classNames={{
              table: "border border-gray-200 rounded-lg",
              th: "text-sm font-semibold",
              td: "text-sm",
            }}
          >
            <TableHeader columns={COLUMN_LISTS_BOOK_DETAIL}>
              {(column) => (
                <TableColumn key={column.uid}>
                  {column.name}
                </TableColumn>
              )}
            </TableHeader>

            <TableBody items={getBookDetailRows(dataBook, categoryName)}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>
                      {item[columnKey as "label" | "value"]}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center border rounded-lg overflow-hidden">
              <button
                onClick={decreaseStock}
                className="px-4 py-2 border-r hover:bg-gray-100 disabled:opacity-50"
                disabled={stock === 1}
              >
                -
              </button>
              <span className="px-6">{stock}</span>
              <button
                onClick={increaseStock}
                className="px-4 py-2 border-l hover:bg-gray-100 disabled:opacity-50"
                disabled={stock === dataBook.stock}
              >
                +
              </button>
            </div>

            <Button
              color="primary"
              size="lg"
              className="px-8"
              isDisabled={dataBook.stock < 1}
              onClick={onAddToCart}
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <h2 className="text-lg font-semibold text-primary">
          Description
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {dataBook.description}
        </p>
      </div>
    </section>
  )
}

export default DetailBook

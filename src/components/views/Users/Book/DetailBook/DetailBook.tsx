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
import { useState } from "react"
import { COLUMN_LISTS_BOOK_DETAIL } from "./DetailBook.constants"
import { getBookDetailRows } from "./book-detail-rows"
import useCart from "../../Cart/useCart"

const DetailBook = () => {
  const { dataBook, isLoadingBook } = useDetailBook()
  const { handleAddToCart } = useCart()
  const [stock, setStock] = useState(1)

  const categoryName =
    typeof dataBook?.category === "object" && dataBook?.category !== null
      ? dataBook.category.name
      : "-"

  const increaseStock = () => {
    if (dataBook && stock < dataBook.stock) setStock(stock + 1)
  }

  const decreaseStock = () => {
    if (stock > 1) setStock(stock - 1)
  }

  const onAddToCart = () => {
    if (dataBook) {
      handleAddToCart(dataBook._id, stock)
    }
  }

  return (
    <section className="flex flex-col gap-6 sm:gap-8 lg:gap-10 px-4 sm:px-6 lg:px-0">
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
        <div className="w-full sm:w-auto sm:mx-auto lg:mx-0 lg:w-[300px] shrink-0">
          {isLoadingBook ? (
            <Skeleton className="w-full sm:w-[300px] h-[280px] sm:h-[350px] lg:h-[420px] rounded-xl mx-auto lg:mx-0" />
          ) : dataBook ? (
            <Image
              src={dataBook.image}
              alt={dataBook.title}
              width={300}
              height={420}
              className="rounded-xl object-cover w-full sm:w-[300px] mx-auto lg:mx-0"
              priority
            />
          ) : (
            <div className="w-full sm:w-[300px] h-[280px] sm:h-[350px] lg:h-[420px] rounded-xl bg-gray-200 flex items-center justify-center mx-auto lg:mx-0">
              <span className="text-gray-500">No Image</span>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 flex-1">
          {isLoadingBook ? (
            <Skeleton className="w-full sm:w-3/4 h-7 sm:h-8 rounded-lg" />
          ) : dataBook ? (
            <h1 className="text-xl sm:text-2xl font-bold text-primary">
              {dataBook.title}
            </h1>
          ) : (
            <h1 className="text-xl sm:text-2xl font-bold text-gray-400">
              Book not found
            </h1>
          )}

          {isLoadingBook ? (
            <Skeleton className="w-full h-48 sm:h-56 lg:h-64 rounded-lg" />
          ) : dataBook ? (
            <Table
              aria-label="Book information"
              removeWrapper
              classNames={{
                table: "border border-gray-200 rounded-lg",
                th: "text-xs sm:text-sm font-semibold",
                td: "text-xs sm:text-sm",
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
          ) : null}

          {isLoadingBook ? (
            <Skeleton className="w-full sm:w-1/2 h-12 rounded-lg" />
          ) : dataBook ? (
            <div className="flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-3 sm:gap-4">
              <div className="flex items-center border rounded-lg overflow-hidden w-full sm:w-auto">
                <button
                  onClick={decreaseStock}
                  className="px-3 sm:px-4 py-2 border-r hover:bg-gray-100 disabled:opacity-50 text-sm sm:text-base"
                  disabled={stock === 1}
                >
                  -
                </button>
                <span className="px-4 sm:px-6 text-sm sm:text-base">{stock}</span>
                <button
                  onClick={increaseStock}
                  className="px-3 sm:px-4 py-2 border-l hover:bg-gray-100 disabled:opacity-50 text-sm sm:text-base"
                  disabled={stock === dataBook.stock}
                >
                  +
                </button>
              </div>

              <Button
                color="primary"
                size="lg"
                className="px-6 sm:px-8 w-full sm:w-auto text-sm sm:text-base"
                isDisabled={dataBook.stock < 1}
                onClick={onAddToCart}
              >
                Add to Cart
              </Button>
            </div>
          ) : null}
        </div>
      </div>

      {isLoadingBook ? (
        <div className="flex flex-col gap-2 sm:gap-3">
          <Skeleton className="w-32 sm:w-40 h-6 sm:h-7 rounded-lg" />
          <Skeleton className="w-full h-20 sm:h-24 rounded-lg" />
        </div>
      ) : dataBook ? (
        <div className="flex flex-col gap-2 sm:gap-3">
          <h2 className="text-base sm:text-lg font-semibold text-primary">
            Description
          </h2>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed whitespace-pre-line">
            {dataBook.description}
          </p>
        </div>
      ) : null}
    </section>
  )
}

export default DetailBook
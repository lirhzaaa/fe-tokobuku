"use client"

import { IBook } from "@/src/types/Book"
import { cn } from "@/src/utils/cn"
import { Card, CardHeader, Skeleton } from "@heroui/react"
import Image from "next/image"
import { Fragment } from "react/jsx-runtime"

interface ICardBook {
    book?: IBook
    category?: string
    className?: string
    isLoading?: boolean
}

const CardBook = (props: ICardBook) => {
    const { book, category, className, isLoading } = props

    return (
        <Card shadow="sm" className={cn(className, "relative col-span-12 sm:col-span-4 h-[300px] cursor-pointer overflow-hidden")}>
            {isLoading ? (
                <Skeleton className="w-full h-full" />
            ) : (
                <Fragment>
                    <CardHeader className="absolute z-30 top-1 flex-col items-start!">
                        <p className="text-tiny text-white/80 uppercase font-bold">
                            {category}
                        </p>
                        <h4 className="text-white font-medium text-large">
                            {book?.title}
                        </h4>
                    </CardHeader>
                    {book?.image && (
                        <div className="absolute inset-0 z-0">
                            <Image
                                alt={`${book.title}`}
                                src={`${book.image}`}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-black/40 hover:bg-black/20 transition-colors duration-300" />
                        </div>
                    )}
                    <div className="absolute p-2 z-30 bottom-1 flex-col items-start!">
                        <p className="text-white font-serif text-small">{book?.author}</p>
                    </div>
                </Fragment>
            )}
        </Card>

    )
}

export default CardBook
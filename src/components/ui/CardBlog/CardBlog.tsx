"use client"

import { IBlog } from "@/src/types/Blog"
import { cn } from "@/src/utils/cn"
import { Card, CardBody, CardFooter, CardHeader, Skeleton } from "@heroui/react"
import Image from "next/image"
import { Fragment } from "react"

interface ICardBlog {
  blog?: IBlog
  className?: string
  isLoading?: boolean
  onClick?: () => void
}

const CardBlog = (props: ICardBlog) => {
  const { blog, className, isLoading, onClick } = props

  return (
    <Card 
      shadow="sm" 
      isPressable={!isLoading}
      onPress={onClick}
      className={cn(
        "transition-all hover:shadow-lg",
        !isLoading && "cursor-pointer",
        className
      )}
    >
      {isLoading ? (
        <Fragment>
          <CardHeader className="p-0">
            <Skeleton className="w-full h-48 rounded-t-lg" />
          </CardHeader>
          <CardBody className="gap-3">
            <Skeleton className="h-6 w-3/4 rounded" />
            <Skeleton className="h-4 w-full rounded" />
            <Skeleton className="h-4 w-5/6 rounded" />
            <div className="flex gap-2 mt-2">
              <Skeleton className="h-6 w-16 rounded-full" />
              <Skeleton className="h-6 w-20 rounded-full" />
            </div>
          </CardBody>
          <CardFooter className="justify-between">
            <Skeleton className="h-4 w-24 rounded" />
            <Skeleton className="h-4 w-32 rounded" />
          </CardFooter>
        </Fragment>
      ) : (
        <Fragment>
          <CardHeader className="relative overflow-hidden p-0">
            {blog?.coverImage ? (
              <Image 
                src={blog.coverImage} 
                alt={blog.title}
                width={1200} 
                height={800} 
                className="object-cover w-full h-48"
              />
            ) : (
              <div className="w-full h-48 bg-default-200 flex items-center justify-center">
                <p className="text-default-500">No Image Available</p>
              </div>
            )}
          </CardHeader>

          <CardBody className="gap-3 py-4">
            <h3 className="text-xl font-bold line-clamp-2 text-foreground">
              {blog?.title}
            </h3>
            
            <p className="text-sm text-default-600 line-clamp-3">
              {blog?.excerpt}
            </p>
            
            {blog?.tags && blog.tags.length > 0 && (
              <ul className="flex gap-2 flex-wrap mt-2">
                {blog.tags.slice(0, 3).map((tag) => (
                  <li 
                    key={tag}
                    className="px-3 py-1 bg-primary-100 text-primary-600 text-xs rounded-full font-medium"
                  >
                    #{tag}
                  </li>
                ))}
                {blog.tags.length > 3 && (
                  <span className="text-xs text-default-400 self-center">
                    +{blog.tags.length - 3} more
                  </span>
                )}
              </ul>
            )}
          </CardBody>

          <CardFooter className="flex items-center justify-between text-sm text-default-500 border-t border-default-200 pt-3">
            <div className="flex items-center gap-2">
              <span className="text-xs">By</span>
              <span className="font-medium text-default-700">
                {typeof blog?.author === 'object' && blog.author && 'name' in blog.author
                  ? blog.author 
                  : 'Anonymous'}
              </span>
            </div>
          </CardFooter>
        </Fragment>
      )}
    </Card>
  )
}

export default CardBlog
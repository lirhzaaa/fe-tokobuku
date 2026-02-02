"use client"

import Image from "next/image"
import useDetailBlog from "./useDetailBlog"
import { BreadcrumbItem, Breadcrumbs, Chip, Skeleton } from "@heroui/react"
import DOMPurify from "dompurify"

const DetailBlog = () => {
  const { dataBlog, isLoadingBlog } = useDetailBlog()

  const sanitizedContent = dataBlog?.content
    ? DOMPurify.sanitize(`${dataBlog.content}`)
    : ''

  return (
    <section className="flex flex-col gap-6 sm:gap-8 lg:gap-10 p-4 sm:p-6 lg:p-7 max-w-4xl mx-auto">
      {isLoadingBlog ? (
        <Skeleton className="w-full sm:w-1/2 h-5 rounded-lg" />
      ) : (
        <Breadcrumbs size="sm" className="text-xs sm:text-sm">
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
          <BreadcrumbItem className="truncate max-w-[150px] sm:max-w-none">{dataBlog?.title}</BreadcrumbItem>
        </Breadcrumbs>
      )}

      <article className="w-full">
        {isLoadingBlog ? (
          <Skeleton className="w-full sm:w-3/4 h-8 sm:h-10 mb-3 sm:mb-4 rounded-lg" />
        ) : (
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">{dataBlog?.title}</h1>
        )}

        {isLoadingBlog ? (
          <Skeleton className="w-full h-5 sm:h-6 mb-4 sm:mb-6 rounded-lg" />
        ) : dataBlog?.excerpt ? (
          <p className="text-base sm:text-lg text-default-600 mb-4 sm:mb-6">{`${dataBlog.excerpt}`}</p>
        ) : null}

        {isLoadingBlog ? (
          <Skeleton className="w-full sm:w-1/3 h-4 mb-4 sm:mb-6 rounded-lg" />
        ) : (
          <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-default-500 mb-4 sm:mb-6 pb-4 sm:pb-6 border-b border-default-200">
            <div className="flex items-center gap-2">
              <span className="font-medium text-default-700">
                {`${dataBlog?.author}`}
              </span>
            </div>
            <span className="hidden sm:inline">·</span>
            <time dateTime={dataBlog?.createdAt}>
              {dataBlog?.createdAt && new Date(`${dataBlog.createdAt}`).toLocaleDateString("id-ID", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
            {dataBlog?.views !== undefined && (
              <>
                <span className="hidden sm:inline">·</span>
                <span>{`${dataBlog.views}`.toLocaleString()} views</span>
              </>
            )}
          </div>
        )}

        {isLoadingBlog ? (
          <Skeleton className="w-full h-48 sm:h-64 lg:h-96 mb-6 sm:mb-8 rounded-lg" />
        ) : dataBlog?.image ? (
          <div className="relative w-full h-48 sm:h-64 lg:h-96 mb-6 sm:mb-8 rounded-lg overflow-hidden">
            <Image
              src={`${dataBlog.image}`}
              alt={`${dataBlog.title}` || 'Blog cover'}
              fill
              className="object-cover"
              priority
            />
          </div>
        ) : null}

        {isLoadingBlog ? (
          <div className="flex flex-col gap-2 sm:gap-3">
            <Skeleton className="w-full h-3 sm:h-4 rounded-lg" />
            <Skeleton className="w-full h-3 sm:h-4 rounded-lg" />
            <Skeleton className="w-5/6 h-3 sm:h-4 rounded-lg" />
            <Skeleton className="w-2/3 h-3 sm:h-4 rounded-lg" />
            <Skeleton className="w-full h-3 sm:h-4 rounded-lg mt-3 sm:mt-4" />
            <Skeleton className="w-4/5 h-3 sm:h-4 rounded-lg" />
          </div>
        ) : (
          <div
            className="blog-content prose prose-sm sm:prose-base lg:prose-lg max-w-none prose-headings:text-primary prose-a:text-primary prose-img:rounded-lg"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        )}

        {isLoadingBlog ? (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-default-200 flex gap-2 flex-wrap">
            <Skeleton className="w-14 sm:w-16 h-6 sm:h-7 rounded-full" />
            <Skeleton className="w-16 sm:w-20 h-6 sm:h-7 rounded-full" />
            <Skeleton className="w-12 sm:w-14 h-6 sm:h-7 rounded-full" />
          </div>
        ) : dataBlog?.tags && `${dataBlog.tags}`.length > 0 ? (
          <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-default-200">
            <p className="text-xs sm:text-sm font-semibold text-default-600 mb-2 sm:mb-3">Tags:</p>
            <div className="flex gap-2 flex-wrap">
              {dataBlog.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="flat"
                  color="primary"
                  size="sm"
                  className="text-xs"
                >
                  #{tag}
                </Chip>
              ))}
            </div>
          </div>
        ) : null}
      </article>
    </section>
  )
}

export default DetailBlog
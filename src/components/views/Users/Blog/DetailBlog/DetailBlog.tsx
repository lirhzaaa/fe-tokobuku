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
    <section className="flex flex-col gap-10 p-7 max-w-4xl mx-auto">
      {isLoadingBlog ? (
        <Skeleton className="w-1/2 h-5 rounded-lg" />
      ) : (
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
          <BreadcrumbItem>{dataBlog?.title}</BreadcrumbItem>
        </Breadcrumbs>
      )}

      <article className="w-full">
        {isLoadingBlog ? (
          <Skeleton className="w-3/4 h-10 mb-4 rounded-lg" />
        ) : (
          <h1 className="text-4xl font-bold mb-4">{dataBlog?.title}</h1>
        )}

        {isLoadingBlog ? (
          <Skeleton className="w-full h-6 mb-6 rounded-lg" />
        ) : dataBlog?.excerpt ? (
          <p className="text-lg text-default-600 mb-6">{`${dataBlog.excerpt}`}</p>
        ) : null}

        {isLoadingBlog ? (
          <Skeleton className="w-1/3 h-4 mb-6 rounded-lg" />
        ) : (
          <div className="flex items-center gap-4 text-sm text-default-500 mb-6 pb-6 border-b border-default-200">
            <div className="flex items-center gap-2">
              <span className="font-medium text-default-700">
                {`${dataBlog?.author}`}
              </span>
            </div>
            <span>·</span>
            <time dateTime={dataBlog?.createdAt}>
              {dataBlog?.createdAt && new Date(`${dataBlog.createdAt}`).toLocaleDateString("id-ID", {
                day: 'numeric',
                month: 'long',
                year: 'numeric'
              })}
            </time>
            {dataBlog?.views !== undefined && (
              <>
                <span>·</span>
                <span>{`${dataBlog.views}`.toLocaleString()} views</span>
              </>
            )}
          </div>
        )}

        {isLoadingBlog ? (
          <Skeleton className="w-full h-96 mb-8 rounded-lg" />
        ) : dataBlog?.image ? (
          <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
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
          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-5/6 h-4 rounded-lg" />
            <Skeleton className="w-2/3 h-4 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-lg mt-4" />
            <Skeleton className="w-4/5 h-4 rounded-lg" />
          </div>
        ) : (
          <div
            className="blog-content"
            dangerouslySetInnerHTML={{ __html: sanitizedContent }}
          />
        )}

        {isLoadingBlog ? (
          <div className="mt-8 pt-8 border-t border-default-200 flex gap-2">
            <Skeleton className="w-16 h-7 rounded-full" />
            <Skeleton className="w-20 h-7 rounded-full" />
            <Skeleton className="w-14 h-7 rounded-full" />
          </div>
        ) : dataBlog?.tags && `${dataBlog.tags}`.length > 0 ? (
          <div className="mt-8 pt-8 border-t border-default-200">
            <p className="text-sm font-semibold text-default-600 mb-3">Tags:</p>
            <div className="flex gap-2 flex-wrap">
              {dataBlog.tags.map((tag) => (
                <Chip
                  key={tag}
                  variant="flat"
                  color="primary"
                  size="sm"
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
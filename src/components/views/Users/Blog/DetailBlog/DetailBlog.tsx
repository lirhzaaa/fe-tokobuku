"use client"

import Image from "next/image"
import useDetailBlog from "./useDetailBlog"
import { BreadcrumbItem, Breadcrumbs, Skeleton } from "@heroui/react"

const DetailBlog = () => {
  const { dataBlog, isLoadingBlog } = useDetailBlog()

  return (
    <section className="flex flex-col gap-10 p-7">
      {isLoadingBlog ? (
        <Skeleton className="w-1/2 h-5 rounded-lg" />
      ) : (
        <Breadcrumbs>
          <BreadcrumbItem href="/">Home</BreadcrumbItem>
          <BreadcrumbItem href="/blog">Blog</BreadcrumbItem>
          <BreadcrumbItem>{dataBlog?.title}</BreadcrumbItem>
        </Breadcrumbs>
      )}

      <article className="w-full h-full">
        {isLoadingBlog ? (
          <Skeleton className="w-3/4 h-9 mb-4 rounded-lg" />
        ) : (
          <h1 className="text-3xl font-bold mb-4">{dataBlog?.title}</h1>
        )}

        {isLoadingBlog ? (
          <Skeleton className="w-1/3 h-4 mb-6 rounded-lg" />
        ) : (
          <div className="text-sm text-gray-500 mb-6">
            <span>By {`${dataBlog?.author}`}</span>
            {" · "}
            <span>
              {new Date(`${dataBlog?.createdAt}`!).toLocaleDateString("id-ID")}
            </span>
          </div>
        )}

        {isLoadingBlog ? (
          <Skeleton className="w-full h-100 mb-6 rounded-lg" />
        ) : (
          <Image
            src={`${dataBlog?.image}`}
            alt={`${dataBlog?.title}`}
            width={1920}
            height={800}
            className="w-full rounded-lg mb-6"
          />
        )}

        {isLoadingBlog ? (
          <div className="flex flex-col gap-3">
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-full h-4 rounded-lg" />
            <Skeleton className="w-5/6 h-4 rounded-lg" />
            <Skeleton className="w-2/3 h-4 rounded-lg" />
          </div>
        ) : (
          <div
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: `${dataBlog?.content}` }}
          />
        )}

        {isLoadingBlog ? (
          <div className="mt-8 flex gap-2">
            <Skeleton className="w-16 h-6 rounded-full" />
            <Skeleton className="w-20 h-6 rounded-full" />
            <Skeleton className="w-14 h-6 rounded-full" />
          </div>
        ) : dataBlog?.tags?.length ? (
          <div className="mt-8 flex gap-2 flex-wrap">
            {dataBlog.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 text-sm bg-gray-200 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        ) : null}
      </article>
    </section>
  )
}

export default DetailBlog
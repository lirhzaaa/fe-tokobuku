"use client"

import { Chip, useDisclosure } from "@heroui/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect } from "react"
import DataTable from "@/src/components/ui/DataTable"
import DropdownAction from "@/src/components/common/DropdownAction"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import useBlog from "./useBlog"
import { COLUMN_LISTS_BLOG } from "./Blog.constans"
import DeleteBlog from "./DeleteBlog"
import AddBlog from "./AddBlog/AddBlog"

const Blog = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        dataBlog,
        isLoadingBlog,
        isRefetchingBlog,
        refetchBlog,
        selectedId,
        setSelectedId } = useBlog()

    const addBlog = useDisclosure()
    const deleteBlog = useDisclosure()
    const { setURL } = useChangeUrl()

    useEffect(() => {
        setURL();
    }, []);

    const renderCell = useCallback(
        (Blog: Record<string, unknown>, columnKey: Key) => {
            const cellValue = Blog[columnKey as keyof typeof Blog]
            switch (columnKey) {
                case "image":
                    return (
                        <Image src={`${cellValue}`} alt="image" width={100} height={150} className="rounded-lg" />
                    )
                case "excerpt":
                    const excerptText = cellValue as string;
                    const truncatedText = excerptText.slice(0, 100).concat("...");
                    return (
                        <p className="line-clamp-2">{truncatedText}</p>
                    )
                case "isActive":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Publish" : "Pending"}
                        </Chip>
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => router.push(`/admin/blog/${Blog._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${Blog._id}`);
                                deleteBlog.onOpen()
                            }}
                        />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [router, deleteBlog, setSelectedId]
    )

    return (
        <section>
            {searchParams.toString().length > 0 && (
                <DataTable
                    buttonTopContent="Create Blog"
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_BLOG}
                    data={dataBlog?.data || []}
                    isLoading={isLoadingBlog || isRefetchingBlog}
                    onClickButtonTopContent={addBlog.onOpen}
                    totalPage={dataBlog?.pagination.totalPages}
                    emptyContent="Blog is empty"
                />
            )}

            <AddBlog
                {...addBlog}
                refetchBlog={refetchBlog} />

            <DeleteBlog
                {...deleteBlog}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchBlog={refetchBlog} />
        </section>
    )
}

export default Blog
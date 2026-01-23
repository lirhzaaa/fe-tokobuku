"use client"

import { Chip, useDisclosure } from "@heroui/react"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect } from "react"
import useBanner from "./useBanner"
import DataTable from "@/src/components/ui/DataTable"
import { COLUMN_LISTS_BANNER } from "./Banner.constants"
import DropdownAction from "@/src/components/common/DropdownAction"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import AddBanner from "./AddBanner"
import DeleteBanner from "./DeleteBanner"

const Banner = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const {
        dataBanner,
        isLoadingBanner,
        isRefetchingBanner,
        refetchBanner,
        selectedId,
        setSelectedId } = useBanner()

    const addBanner = useDisclosure()
    const deleteBanner = useDisclosure()
    const { setURL } = useChangeUrl()

    useEffect(() => {
        setURL();
    }, []);

    const renderCell = useCallback(
        (banner: Record<string, unknown>, columnKey: Key) => {
            const cellValue = banner[columnKey as keyof typeof banner]
            switch (columnKey) {
                case "image":
                    return (
                        <Image src={`${cellValue}`} alt="image" width={300} height={100} className="rounded-lg" />
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => router.push(`/admin/category/${banner._id}`)}
                            onPressButtonDelete={() => {
                                setSelectedId(`${banner._id}`);
                                deleteBanner.onOpen()
                            }}
                        />
                    )
                case "isShow":
                    return (
                        <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue === true ? "Published" : "Not Published"}
                        </Chip>
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [router, deleteBanner, setSelectedId]
    )

    return (
        <section>
            {searchParams.toString().length > 0 && (
                <DataTable
                    buttonTopContent="Create Banner"
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_BANNER}
                    data={dataBanner?.data || []}
                    isLoading={isLoadingBanner || isRefetchingBanner}
                    onClickButtonTopContent={addBanner.onOpen}
                    totalPage={dataBanner?.pagination.totalPages}
                    emptyContent="Banner is empty"
                />
            )}

            <AddBanner
                {...addBanner}
                refetchBanner={refetchBanner} />

            <DeleteBanner
                {...deleteBanner}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchBanner={refetchBanner} />
        </section>
    )
}

export default Banner
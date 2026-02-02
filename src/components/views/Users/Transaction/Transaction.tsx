"use client"

import { Chip } from "@heroui/react"
import { useRouter, useSearchParams } from "next/navigation"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants"
import useTransaction from "./useTransaction"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import { convertIDR } from "@/src/utils/currency"
import DropdownAction from "@/src/components/common/DropdownAction"
import DataTable from "@/src/components/ui/DataTable"   

const Transaction = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
    } = useTransaction()

    const { setURL } = useChangeUrl()

    useEffect(() => {
        setURL();
    }, []);

    const renderCell = useCallback(
        (transaction: Record<string, unknown>, columnKey: Key) => {
            const cellValue = transaction[columnKey as keyof typeof transaction]
            switch (columnKey) {
                case "total":
                    return convertIDR(Number(cellValue))
                case "status":
                    return (
                        <Chip color={cellValue === "completed" ? "success" : "warning"} size="sm" variant="flat">
                            {cellValue as ReactNode}
                        </Chip>
                    )
                case "actions":
                    return (
                        <DropdownAction
                            onPressButtonDetail={() => router.push(`/transaction/${transaction.orderId}`)}
                            hideButtonDelete
                        />
                    )
                default:
                    return cellValue as ReactNode;
            }
        }, [router]
    )

    return (
        <section>
            {searchParams.toString().length > 0 && (
                <DataTable
                    renderCell={renderCell}
                    columns={COLUMN_LISTS_TRANSACTION}
                    data={dataTransactions?.data || []}
                    emptyContent="Transaction is empty"
                    isLoading={isLoadingTransactions || isRefetchingTransactions}
                    totalPage={dataTransactions?.pagination.totalPages}
                />
            )}
        </section>
    )
}

export default Transaction
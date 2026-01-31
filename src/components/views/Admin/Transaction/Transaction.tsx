"use client"

import { Chip, useDisclosure } from "@heroui/react"
import { Key, ReactNode, useCallback, useEffect } from "react"
import { COLUMN_LISTS_TRANSACTION } from "./Transaction.constants"
import useTransaction from "./useTransaction"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import { convertIDR } from "@/src/utils/currency"
import DropdownAction from "@/src/components/common/DropdownAction"
import DataTable from "@/src/components/ui/DataTable"
import DeleteTransaction from "./DeleteTransaction"
import { useRouter, useSearchParams } from "next/navigation"

const Transaction = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    dataTransactions,
    isLoadingTransactions,
    isRefetchingTransactions,
    refetchTransactions,

    selectedId,
    setSelectedId
  } = useTransaction()

  const deleteTransaction = useDisclosure()
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
              onPressButtonDetail={() => router.push(`/admin/transaction/${transaction.orderId}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${transaction.orderId}`);
                deleteTransaction.onOpen()
              }}
            />
          )
        default:
          return cellValue as ReactNode;
      }
    }, [router, setSelectedId, deleteTransaction]
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

      <DeleteTransaction
        {...deleteTransaction}
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        refetchTransaction={refetchTransactions} />
    </section>
  )
}

export default Transaction  
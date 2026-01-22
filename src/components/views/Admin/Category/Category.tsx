"use client";

import { Chip, useDisclosure } from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { Key, ReactNode, useCallback, useEffect } from "react"
import useCategory from "./useCategory";
import useChangeUrl from "@/src/hooks/useChangeUrl";
import DropdownAction from "@/src/components/common/DropdownAction";
import DataTable from "@/src/components/ui/DataTable";
import { COLUMN_LISTS_CATEGORY } from "./Category.constants";

const Category = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    dataCategory,
    isLoadingCategory,
    isRefetchingCategory,
    refetchCategory,
    selectedId,
    setSelectedId } = useCategory()

  const addCategory = useDisclosure()
  const deleteCategory = useDisclosure()
  const { setURL } = useChangeUrl()

  useEffect(() => {
    setURL();
  }, []);

  const renderCell = useCallback(
    (category: Record<string, unknown>, columnKey: Key) => {
      const cellValue = category[columnKey as keyof typeof category]
      switch (columnKey) {
        case "actions":
          return (
            <DropdownAction
              onPressButtonDetail={() => router.push(`/admin/category/${category._id}`)}
              onPressButtonDelete={() => {
                setSelectedId(`${category._id}`);
                deleteCategory.onOpen()
              }}
            />
          )
        case "isActive":
          return (
            <Chip color={cellValue ? "success" : "warning"} size="sm" variant="flat">
              {cellValue === true ? "Active" : "Pending"}
            </Chip>
          )
        default:
          return cellValue as ReactNode;
      }
    }, [setSelectedId, deleteCategory, router]
  )

  return (
    <section>
      {searchParams.toString().length > 0 && (
        <DataTable
          buttonTopContent="Create Category"
          renderCell={renderCell}
          columns={COLUMN_LISTS_CATEGORY}
          data={dataCategory?.data || []}
          isLoading={isLoadingCategory || isRefetchingCategory}
          onClickButtonTopContent={addCategory.onOpen}
          totalPage={dataCategory?.pagination.totalPages}
          emptyContent="Category is empty"
        />
      )}

      {/* <AddCategory
                {...addCategory}
                refetchCategory={refetchCategory} />
            <DeleteCategory
                {...deleteCategory}
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                refetchCategory={refetchCategory} /> */}
    </section>
  )
}

export default Category

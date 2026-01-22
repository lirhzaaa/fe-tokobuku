import { LIMIT_LIST } from "@/src/app/constants/list.constants"
import useChangeUrl from "@/src/hooks/useChangeUrl"
import { cn } from "@/src/utils/cn"
import { Button, Input, Pagination, Select, SelectItem, Spinner, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from "@heroui/react"
import { Search } from "lucide-react"
import { Fragment, Key, ReactNode, useMemo } from "react"

interface PropTypes {
    buttonTopContent?: string
    columns: Record<string, unknown>[]
    data: Record<string, unknown>[]
    emptyContent: string
    totalPage: number
    isLoading?: boolean
    showBottom?: boolean
    showTop?: boolean
    onClickButtonTopContent?: () => void
    renderCell: (item: Record<string, unknown>, columnKey: Key) => ReactNode
}
const DataTable = (props: PropTypes) => {
    const {
        currentLimit,
        currentPage,
        handleChangeLimit,
        handleChangePage,
        handleSearch,
        handleClearSearch,
    } = useChangeUrl()

    const {
        buttonTopContent,
        columns,
        data,
        renderCell,
        onClickButtonTopContent,
        totalPage,
        emptyContent,
        isLoading,
        showBottom = true,
        showTop = true } = props

    const TopContent = useMemo(() => {
        return (
            <div className="flex flex-col-reverse items-start justify-between gap-y-4 lg:flex-row lg:items-center">
                {showTop && (
                    <Fragment>
                        <Input aria-label="Search by name" isClearable className="w-full sm:max-w-[24%]" placeholder="Search by name" startContent={<Search />} onChange={handleSearch} onClear={handleClearSearch} />
                        {buttonTopContent && (
                            <Button color="primary" onPress={onClickButtonTopContent}>{buttonTopContent}</Button>
                        )}
                    </Fragment>
                )}
            </div>
        )
    }, [showTop, handleSearch, handleClearSearch, onClickButtonTopContent, buttonTopContent])

    const BottomContent = useMemo(() => {
        const pageNumber = Number(currentPage);
        const safePage = Number.isNaN(pageNumber) || pageNumber < 1 ? 1 : pageNumber;
        return (
            <div className="flex items-center justify-center lg:justify-between">
                {showBottom && (
                    <Fragment>
                        <Select className="hidden max-w-36 lg:block" size="md" selectedKeys={[`${currentLimit}`]} selectionMode="single" onChange={handleChangeLimit} startContent={<p className="text-small">Show:</p>} disallowEmptySelection>
                            {LIMIT_LIST.map((item) => (
                                <SelectItem key={item.value} textValue={item.label}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </Select>
                        {totalPage > 1 && (
                            <Pagination
                                isCompact
                                showControls
                                color="primary"
                                page={safePage}
                                total={totalPage}
                                onChange={handleChangePage}
                                loop
                            />
                        )}
                    </Fragment>
                )}
            </div>
        )
    }, [showBottom, currentLimit, handleChangeLimit, currentPage, totalPage, handleChangePage])

    return (
        <Table topContent={TopContent} topContentPlacement="outside" bottomContent={BottomContent} bottomContentPlacement="outside" classNames={{
            base: "max-w-full",
            wrapper: cn({ "overflow-x-hidden": isLoading })
        }}>
            <TableHeader columns={columns}>
                {(column) => (
                    <TableColumn key={column.uid as Key}>
                        {column.name as string}
                    </TableColumn>
                )}
            </TableHeader>

            <TableBody
                items={data}
                emptyContent={emptyContent}
                isLoading={isLoading}
                loadingContent={
                    <div className={`flex h-full w-full items-center justify-center bg-foreground-700/30 ${isLoading ? "backdrop-blur-xs" : ""}`}>
                        <Spinner color="primary" />
                    </div>
                }>
                {(item) => (
                    <TableRow key={item._id as Key} className={`${isLoading ? "backdrop-blur-xs" : ""}`}>
                        {(columnKey) => (
                            <TableCell>
                                {renderCell(item, columnKey)}
                            </TableCell>
                        )}
                    </TableRow>
                )}
            </TableBody>
        </Table>
    )
}

export default DataTable
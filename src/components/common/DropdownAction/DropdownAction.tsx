"use client"

import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@heroui/react"
import { EllipsisVertical } from "lucide-react"
interface DropdownTypes {
    onPressButtonDetail: () => void
    onPressButtonDelete?: () => void
    hideButtonDelete?: boolean
}

const DropdownAction = (props: DropdownTypes) => {
    const {
        onPressButtonDetail,
        onPressButtonDelete,
        hideButtonDelete = false
    } = props

    return (
        <Dropdown>
            <DropdownTrigger>
                <Button isIconOnly size="sm" variant="bordered">
                    <EllipsisVertical size={15} className="text-default-500" />
                </Button>
            </DropdownTrigger>
            <DropdownMenu aria-label="Dropdown Action">
                <DropdownItem key="detail" onPress={onPressButtonDetail}>
                    Detail
                </DropdownItem>
                {!hideButtonDelete ? (
                    <DropdownItem key="delete" onPress={onPressButtonDelete} className="text-danger-500">
                        Delete
                    </DropdownItem>
                ) : null}
            </DropdownMenu>
        </Dropdown>
    )
}

export default DropdownAction
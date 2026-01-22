"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteCategory from "./useDeleteCategory"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IDeleteCategory {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchCategory: () => void
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteCategory = (props: IDeleteCategory) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchCategory,
        selectedId,
        setSelectedId } = props

    const {
        mutateDeleteCategory,
        isPendingDeleteCategory,
        isSuccessDeleteCategory
    } = useDeleteCategory()

    useEffect(() => {
        if (isSuccessDeleteCategory) {
            onClose()
            refetchCategory()
        }
    }, [isSuccessDeleteCategory])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Category
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this category?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="text-gray-500" variant="flat" disabled={isPendingDeleteCategory} onPress={() => {
                        onClose()
                        setSelectedId("")
                    }}>
                        Cancel
                    </Button>
                    <Button color="danger" type="submit" disabled={isPendingDeleteCategory} onPress={() => mutateDeleteCategory(selectedId)}>
                        {isPendingDeleteCategory ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Category"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteCategory
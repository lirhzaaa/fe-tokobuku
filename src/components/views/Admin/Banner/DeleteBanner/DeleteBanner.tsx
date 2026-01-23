"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteBanner from "./useDeleteBanner"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IDeleteBanner {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBanner: () => void
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteBanner = (props: IDeleteBanner) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchBanner,
        selectedId,
        setSelectedId } = props

    const {
        mutateDeleteBanner,
        isPendingDeleteBanner,
        isSuccessDeleteBanner
    } = useDeleteBanner()

    useEffect(() => {
        if (isSuccessDeleteBanner) {
            onClose()
            refetchBanner()
        }
    }, [isSuccessDeleteBanner])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Banner
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this banner?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="text-gray-500" variant="flat" disabled={isPendingDeleteBanner} onPress={() => {
                        onClose()
                        setSelectedId("")
                    }}>
                        Cancel
                    </Button>
                    <Button color="danger" type="submit" disabled={isPendingDeleteBanner} onPress={() => mutateDeleteBanner(selectedId)}>
                        {isPendingDeleteBanner ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Banner"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteBanner
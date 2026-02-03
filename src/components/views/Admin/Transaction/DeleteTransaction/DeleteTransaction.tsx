"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteTransaction from "./useDeleteTransaction"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IDeleteTransaction {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchTransaction: () => void
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteTransaction = (props: IDeleteTransaction) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchTransaction,
        selectedId,
        setSelectedId } = props

    const {
        mutateDeleteTransaction,
        isPendingDeleteTransaction,
        isSuccessDeleteTransaction
    } = useDeleteTransaction()

    useEffect(() => {
        if (isSuccessDeleteTransaction) {
            onClose()
            refetchTransaction()
        }
    }, [isSuccessDeleteTransaction])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Transaction
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this Transaction?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" variant="flat" disabled={isPendingDeleteTransaction} onPress={() => {
                        onClose()
                        setSelectedId("")
                    }}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={isPendingDeleteTransaction} onPress={() => mutateDeleteTransaction(selectedId)}>
                        {isPendingDeleteTransaction ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Transaction"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteTransaction
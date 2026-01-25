"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteBook from "./useDeleteBook"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IDeleteBook {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBook: () => void
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteBook = (props: IDeleteBook) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchBook,
        selectedId,
        setSelectedId } = props

    const {
        mutateDeleteBook,
        isPendingDeleteBook,
        isSuccessDeleteBook
    } = useDeleteBook()

    useEffect(() => {
        if (isSuccessDeleteBook) {
            onClose()
            refetchBook()
        }
    }, [isSuccessDeleteBook])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Book
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this Book?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="text-gray-500" variant="flat" disabled={isPendingDeleteBook} onPress={() => {
                        onClose()
                        setSelectedId("")
                    }}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={isPendingDeleteBook} onPress={() => mutateDeleteBook(selectedId)}>
                        {isPendingDeleteBook ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Book"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteBook
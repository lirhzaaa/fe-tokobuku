"use client"

import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Spinner } from "@heroui/react"
import useDeleteBlog from "./useDeleteBlog"
import { Dispatch, SetStateAction, useEffect } from "react"

interface IDeleteBlog {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBlog: () => void
    selectedId: string,
    setSelectedId: Dispatch<SetStateAction<string>>
}

const DeleteBlog = (props: IDeleteBlog) => {
    const {
        isOpen,
        onOpenChange,
        onClose,
        refetchBlog,
        selectedId,
        setSelectedId } = props

    const {
        mutateDeleteBlog,
        isPendingDeleteBlog,
        isSuccessDeleteBlog
    } = useDeleteBlog()

    useEffect(() => {
        if (isSuccessDeleteBlog) {
            onClose()
            refetchBlog()
        }
    }, [isSuccessDeleteBlog])

    return (
        <Modal placement="center" scrollBehavior="inside" isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange}>
            <ModalContent>
                <ModalHeader>
                    Delete Blog
                </ModalHeader>
                <ModalBody>
                    <p className="text-medium">Are you sure you want to delete this Blog?</p>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" className="text-gray-500" variant="flat" disabled={isPendingDeleteBlog} onPress={() => {
                        onClose()
                        setSelectedId("")
                    }}>
                        Cancel
                    </Button>
                    <Button color="primary" type="submit" disabled={isPendingDeleteBlog} onPress={() => mutateDeleteBlog(selectedId)}>
                        {isPendingDeleteBlog ? (
                            <Spinner size="sm" color="white" />
                        ) : "Delete Blog"}
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}

export default DeleteBlog
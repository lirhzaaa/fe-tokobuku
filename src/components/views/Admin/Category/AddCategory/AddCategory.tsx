"use client"

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import useAddCategory from "./useAddCategory"
import { Controller } from "react-hook-form"
import { useEffect } from "react"

interface IAddCategory {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchCategory: () => void
}

const AddCategory = (props: IAddCategory) => {
    const { isOpen, onClose, onOpenChange, refetchCategory } = props
    const {
        control,
        errors,
        handleSubmitForm,

        handleAddCategory,
        isPendingMutateAddCategory,
        isSuccessMutateAddCategory,
    } = useAddCategory()

    useEffect(() => {
        if (isSuccessMutateAddCategory) {
            onClose()
            refetchCategory()
        }
    }, [isSuccessMutateAddCategory])

    const disableSubmit = isPendingMutateAddCategory

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={onClose}>
            <form onSubmit={handleSubmitForm(handleAddCategory)}>
                <ModalContent className="m-4" >
                    <ModalHeader>
                        Add Category
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <Controller name="name" control={control} render={({ field }) => (
                                <Input {...field} autoFocus label="Name" variant="bordered" type="text" isInvalid={errors.name !== undefined} errorMessage={errors.name?.message} />
                            )} />
                            <Controller name="description" control={control} render={({ field }) => (
                                <Textarea {...field} label="Description" variant="bordered" isInvalid={errors.description !== undefined} errorMessage={errors.description?.message} />
                            )} />
                            <Controller name="isPublish" control={control} render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={errors.isPublish !== undefined}
                                    errorMessage={errors.isPublish?.message}
                                    disallowEmptySelection>
                                    <SelectItem key="true" textValue="Active">Active</SelectItem>
                                    <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                                </Select>
                            )} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="text-gray-500" variant="flat" onPress={() => onClose()} disabled={disableSubmit}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" disabled={disableSubmit}>
                            {isPendingMutateAddCategory ? (
                                <Spinner size="sm" color="white" />
                            ) : "Create Category"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddCategory
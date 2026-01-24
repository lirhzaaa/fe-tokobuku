"use client"

import { Autocomplete, AutocompleteItem, Button, DatePicker, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import useAddBook from "./useAddBook"
import InputFile from "@/src/components/ui/InputFile"
import { ICategory } from "@/src/types/Category"

interface IAddBook {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBook: () => void
}

const AddBook = (props: IAddBook) => {
    const { isOpen, onClose, onOpenChange, refetchBook } = props
    const {
        control,
        errors,
        handleSubmitForm,

        handleAddBook,
        isPendingMutateAddBook,
        isSuccessMutateAddBook,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        dataCategory,
        handleOnClose
    } = useAddBook()

    useEffect(() => {
        if (isSuccessMutateAddBook) {
            onClose()
            refetchBook()
        }
    }, [isSuccessMutateAddBook])

    const disableSubmit = isPendingMutateAddBook || isPendingMutateUploadFile || isPendingMutateDeleteFile

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => handleOnClose(onClose)}>
            <form onSubmit={handleSubmitForm(handleAddBook)}>
                <ModalContent className="m-4" >
                    <ModalHeader>
                        Add Book
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <Controller name="title" control={control} render={({ field }) => (
                                <Input {...field} label="Title" variant="bordered" isInvalid={errors.title !== undefined} errorMessage={errors.title?.message} />
                            )} />
                            <Controller name="author" control={control} render={({ field }) => (
                                <Input {...field} label="Author" variant="bordered" isInvalid={errors.author !== undefined} errorMessage={errors.author?.message} />
                            )} />
                            <Controller
                                name="publishDate"
                                control={control}
                                render={({ field }) => (
                                    <DatePicker
                                        label="Publish Date"
                                        variant="bordered"
                                        showMonthAndYearPickers 
                                        value={field.value}
                                        onChange={field.onChange}
                                        isInvalid={!!errors.publishDate}
                                        errorMessage={errors.publishDate?.message}
                                    />
                                )}
                            />
                            <Controller name="price" control={control} render={({ field }) => (
                                <Input {...field} label="Price" variant="bordered" isInvalid={errors.price !== undefined} errorMessage={errors.price?.message} />
                            )} />
                            <Controller name="stock" control={control} render={({ field }) => (
                                <Input {...field} label="Stock" variant="bordered" isInvalid={errors.stock !== undefined} errorMessage={errors.stock?.message} />
                            )} />
                            <Controller name="category" control={control} render={({ field: { onChange, ...field } }) => (
                                <Autocomplete
                                    {...field}
                                    defaultItems={dataCategory?.data.data || []}
                                    label="Category"
                                    placeholder="Search category here..."
                                    variant="bordered"
                                    isInvalid={errors.category !== undefined}
                                    errorMessage={errors.category?.message}
                                    onSelectionChange={(value) => onChange(value)}
                                >
                                    {(category: ICategory) => (
                                        <AutocompleteItem key={`${category._id}`}>
                                            {category.name}
                                        </AutocompleteItem>
                                    )}
                                </Autocomplete>
                            )} />
                            <Controller name="isActive" control={control} render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={errors.isActive !== undefined}
                                    errorMessage={errors.isActive?.message}
                                    disallowEmptySelection>
                                    <SelectItem key="true" textValue="Publish">Publish</SelectItem>
                                    <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                                </Select>
                            )} />
                            <Controller name="isFeatured" control={control} render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Featured"
                                    variant="bordered"
                                    isInvalid={errors.isFeatured !== undefined}
                                    errorMessage={errors.isFeatured?.message}
                                    disallowEmptySelection>
                                    <SelectItem key="true" textValue="Active">Active</SelectItem>
                                    <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                                </Select>
                            )} />
                            <Controller name="description" control={control} render={({ field }) => (
                                <Textarea {...field} label="Description" variant="bordered" isInvalid={errors.description !== undefined} errorMessage={errors.description?.message} />
                            )} />
                            <p className="text-sm font-bold">Image</p>
                            <Controller name="image" control={control} render={({ field: { onChange, value, ...field } }) => (
                                <InputFile
                                    {...field}
                                    isInvalid={errors.image !== undefined}
                                    errorMessage={errors.image?.message}
                                    onUpload={(files) => handleUploadImage(files, onChange)}
                                    onDelete={() => handleDeleteImage(onChange)}
                                    isDeleting={isPendingMutateDeleteFile}
                                    isUploading={isPendingMutateUploadFile}
                                    isDropable
                                    preview={typeof preview === "string" ? preview : ""}
                                />
                            )} />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" className="text-gray-700" variant="flat" onPress={() => handleOnClose(onClose)} disabled={disableSubmit}>
                            Cancel
                        </Button>
                        <Button color="primary" type="submit" disabled={disableSubmit}>
                            {isPendingMutateAddBook ? (
                                <Spinner size="sm" color="white" />
                            ) : "Create Book"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddBook
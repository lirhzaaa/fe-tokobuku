"use client"

import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner, Textarea, Chip } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect, useState } from "react"
import useAddBlog from "./useAddBlog"
import InputFile from "@/src/components/ui/InputFile"

interface IAddBlog {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBlog: () => void
}

const AddBlog = (props: IAddBlog) => {
    const { isOpen, onClose, onOpenChange, refetchBlog } = props
    const {
        control,
        errors,
        handleSubmitForm,

        handleAddBlog,
        isPendingMutateAddBlog,
        isSuccessMutateAddBlog,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        handleOnClose
    } = useAddBlog()

    const [tagInput, setTagInput] = useState("")

    useEffect(() => {
        if (isSuccessMutateAddBlog) {
            onClose()
            refetchBlog()
        }
    }, [isSuccessMutateAddBlog, onClose, refetchBlog])

    const disableSubmit = isPendingMutateAddBlog || isPendingMutateUploadFile || isPendingMutateDeleteFile

    return (
        <Modal
            onOpenChange={onOpenChange}
            isOpen={isOpen}
            placement="center"
            scrollBehavior="inside"
            onClose={() => handleOnClose(onClose)}
            size="2xl">
            <form onSubmit={handleSubmitForm(handleAddBlog)}>
                <ModalContent className="m-4">
                    <ModalHeader>Add Blog</ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Basic Information</p>
                            <Controller
                                name="title"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Title"
                                        placeholder="Enter blog title"
                                        variant="bordered"
                                        isInvalid={!!errors.title}
                                        errorMessage={errors.title?.message}
                                    />
                                )}
                            />

                            <Controller
                                name="slug"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Slug (Optional - auto-generated from title)"
                                        placeholder="my-blog-post"
                                        variant="bordered"
                                        isInvalid={!!errors.slug}
                                        errorMessage={errors.slug?.message}
                                        description="Leave empty to auto-generate from title"
                                    />
                                )}
                            />

                            <Controller
                                name="excerpt"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Excerpt"
                                        placeholder="Short description (10-300 characters)"
                                        variant="bordered"
                                        isInvalid={!!errors.excerpt}
                                        errorMessage={errors.excerpt?.message}
                                        maxRows={3}
                                    />
                                )}
                            />

                            <Controller
                                name="author"
                                control={control}
                                render={({ field }) => (
                                    <Input
                                        {...field}
                                        label="Author (Optional)"
                                        placeholder="Author name"
                                        variant="bordered"
                                        isInvalid={!!errors.author}
                                        errorMessage={errors.author?.message}
                                    />
                                )}
                            />

                            <p className="text-sm font-bold mt-4">Content</p>
                            <Controller
                                name="content"
                                control={control}
                                render={({ field }) => (
                                    <Textarea
                                        {...field}
                                        label="Content (HTML supported)"
                                        placeholder="Enter blog content here..."
                                        variant="bordered"
                                        isInvalid={!!errors.content}
                                        errorMessage={errors.content?.message}
                                        minRows={8}
                                        description="You can use HTML tags for formatting"
                                    />
                                )}
                            />

                            <p className="text-sm font-bold mt-4">Tags</p>
                            <Controller
                                name="tags"
                                control={control}
                                render={({ field }) => (
                                    <div className="flex flex-col gap-2">
                                        <Input
                                            label="Add Tags"
                                            placeholder="Type and press Enter"
                                            variant="bordered"
                                            value={tagInput}
                                            onChange={(e) => setTagInput(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') {
                                                    e.preventDefault()
                                                    if (tagInput.trim() && !field.value?.includes(tagInput.trim())) {
                                                        field.onChange([...(field.value || []), tagInput.trim()])
                                                        setTagInput("")
                                                    }
                                                }
                                            }}
                                            isInvalid={!!errors.tags}
                                            errorMessage={errors.tags?.message}
                                        />

                                        {field.value && field.value.length > 0 && (
                                            <div className="flex flex-wrap gap-2">
                                                {field.value.map((tag, index) => (
                                                    <Chip
                                                        key={index}
                                                        onClose={() => {
                                                            const newTags = field.value?.filter((_, i) => i !== index)
                                                            field.onChange(newTags)
                                                        }}
                                                        variant="flat"
                                                        color="primary"
                                                    >
                                                        {tag}
                                                    </Chip>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                )}
                            />

                            <p className="text-sm font-bold mt-4">Cover Image</p>
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

                            <p className="text-sm font-bold mt-4">Settings</p>
                            <Controller
                                name="isActive"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <Select
                                        {...field}
                                        label="Status"
                                        placeholder="Select status"
                                        variant="bordered"
                                        selectedKeys={value !== undefined ? [String(value)] : []}
                                        onSelectionChange={(keys) => {
                                            const selected = Array.from(keys)[0]
                                            onChange(selected === "true")
                                        }}
                                        isInvalid={!!errors.isActive}
                                        errorMessage={errors.isActive?.message}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="true" textValue="true">Published</SelectItem>
                                        <SelectItem key="false" textValue="false">Draft</SelectItem>
                                    </Select>
                                )}
                            />

                            <Controller
                                name="isFeatured"
                                control={control}
                                render={({ field: { onChange, value, ...field } }) => (
                                    <Select
                                        {...field}
                                        label="Featured"
                                        placeholder="Select featured status"
                                        variant="bordered"
                                        selectedKeys={value !== undefined ? [String(value)] : []}
                                        onSelectionChange={(keys) => {
                                            const selected = Array.from(keys)[0]
                                            onChange(selected === "true")
                                        }}
                                        isInvalid={!!errors.isFeatured}
                                        errorMessage={errors.isFeatured?.message}
                                        disallowEmptySelection
                                    >
                                        <SelectItem key="true" textValue="true">Featured</SelectItem>
                                        <SelectItem key="false" textValue="false">Not Featured</SelectItem>
                                    </Select>
                                )}
                            />
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button
                            color="default"
                            variant="flat"
                            onPress={() => handleOnClose(onClose)}
                            disabled={disableSubmit}
                        >
                            Cancel
                        </Button>
                        <Button
                            color="primary"
                            type="submit"
                            disabled={disableSubmit}
                        >
                            {isPendingMutateAddBlog ? (
                                <Spinner size="sm" color="white" />
                            ) : "Create Blog"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddBlog
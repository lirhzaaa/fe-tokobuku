import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, Select, SelectItem, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import useAddBanner from "./useAddBanner"
import InputFile from "@/src/components/ui/InputFile"

interface IAddBanner {
    isOpen: boolean
    onClose: () => void
    onOpenChange: () => void
    refetchBanner: () => void
}

const AddBanner = (props: IAddBanner) => {
    const { isOpen, onClose, onOpenChange, refetchBanner } = props
    const {
        control,
        errors,
        handleSubmitForm,

        handleAddBanner,
        isPendingMutateAddBanner,
        isSuccessMutateAddBanner,

        preview,
        handleUploadImage,
        handleDeleteImage,
        isPendingMutateDeleteFile,
        isPendingMutateUploadFile,

        handleOnClose
    } = useAddBanner()

    useEffect(() => {
        if (isSuccessMutateAddBanner) {
            onClose()
            refetchBanner()
        }
    }, [isSuccessMutateAddBanner])

    const disableSubmit = isPendingMutateAddBanner || isPendingMutateUploadFile || isPendingMutateDeleteFile

    return (
        <Modal onOpenChange={onOpenChange} isOpen={isOpen} placement="center" scrollBehavior="inside" onClose={() => handleOnClose(onClose)}>
            <form onSubmit={handleSubmitForm(handleAddBanner)}>
                <ModalContent className="m-4" >
                    <ModalHeader>
                        Add Banner
                    </ModalHeader>
                    <ModalBody>
                        <div className="flex flex-col gap-4">
                            <p className="text-sm font-bold">Information</p>
                            <Controller name="title" control={control} render={({ field }) => (
                                <Input {...field} autoFocus label="Name" variant="bordered" type="text" isInvalid={errors.title !== undefined} errorMessage={errors.title?.message} />
                            )} />
                            <Controller name="isShow" control={control} render={({ field }) => (
                                <Select
                                    {...field}
                                    label="Status"
                                    variant="bordered"
                                    isInvalid={errors.isShow !== undefined}
                                    errorMessage={errors.isShow?.message}
                                    disallowEmptySelection>
                                    <SelectItem key="true" textValue="Active">Active</SelectItem>
                                    <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                                </Select>
                            )} />
                            <p className="text-sm font-bold">Image</p>
                            <Controller name="image" control={control} render={({ field: { onChange, value, ...field } }) => (
                                <InputFile
                                    {...field}
                                    isInvalid={errors.image !== undefined}
                                    errorMessage={errors.image?.message}
                                    isDropable
                                    onUpload={(files) => handleUploadImage(files, onChange)}
                                    onDelete={() => handleDeleteImage(onChange)}
                                    isDeleting={isPendingMutateDeleteFile}
                                    isUploading={isPendingMutateUploadFile}
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
                            {isPendingMutateAddBanner ? (
                                <Spinner size="sm" color="white" />
                            ) : "Create Banner"}
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </form>
        </Modal>
    )
}

export default AddBanner
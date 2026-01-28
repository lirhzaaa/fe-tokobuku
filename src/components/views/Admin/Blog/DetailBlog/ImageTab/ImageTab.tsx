import { Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react"
import Image from "next/image"
import useImageTab from "./useImageTab"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import InputFile from "@/src/components/ui/InputFile"

interface IImageTypes {
    currentImage: string
    onUpdate: (data: { image: FileList | string }) => void
    isPendingUpdateBlog: boolean
    isSuccessUpdateBlog: boolean
}

const ImageTab = (props: IImageTypes) => {
    const { currentImage, onUpdate, isPendingUpdateBlog, isSuccessUpdateBlog } = props
    const {
        preview,

        handleUploadUpdateImage,
        handleDeleteUpdateImage,
        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        controlUpdateImage,
        handleSubmitUpdateImage,
        resetUpdateImage,
        errorsUpdateImage,
    } = useImageTab()

    useEffect(() => {
        if (isSuccessUpdateBlog) {
            resetUpdateImage()
        }
    }, [isSuccessUpdateBlog])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Blog Image</h3>
                <p className="w-full text-small text-default-400">Manage image of this Blog</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateImage(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Image</p>
                        <Skeleton isLoaded={!!currentImage} className="aspect-video rounded-lg">
                            <Image src={currentImage} alt="Image for Blog" fill className="relative!" />
                        </Skeleton>
                    </div>
                    <Controller name="image" control={controlUpdateImage} render={({ field: { onChange, value, ...field } }) => (
                        <InputFile
                            {...field}
                            name="image"
                            label="Upload New Image"
                            onDelete={() => handleDeleteUpdateImage(onChange)}
                            onUpload={(files) => handleUploadUpdateImage(files, onChange)}
                            isUploading={isPendingMutateUploadFile}
                            isDeleting={isPendingMutateDeleteFile}
                            isInvalid={errorsUpdateImage.image !== undefined}
                            errorMessage={errorsUpdateImage.image?.message}
                            preview={typeof preview === "string" ? preview : ""}
                            isDropable />
                    )} />
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingMutateUploadFile || isPendingUpdateBlog || !preview}>
                        {isPendingUpdateBlog ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default ImageTab

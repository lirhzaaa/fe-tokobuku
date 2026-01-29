"use client"

import { useEffect } from "react"
import usePictureTab from "./usePictureTab"
import { Avatar, Button, Card, CardBody, CardHeader, Skeleton, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import InputFile from "@/src/components/ui/InputFile"
import { IProfile } from "@/src/types/Auth"

interface IPictureTypes {
    currentPicture: string
    onUpdate: (data: IProfile) => void
    isPendingUpdate: boolean
    isSuccessUpdate: boolean
}

const PictureTab = (props: IPictureTypes) => {
    const {
        currentPicture,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate
    } = props

    const {
        handleUploadUpdatePicture,
        handleDeleteUploadPicture,
        handleSubmitUpdatePicture,

        isPendingMutateUploadFile,
        isPendingMutateDeleteFile,

        preview,
        controlUpdatePicture,
        errosUpdatePicture,
        resetUpdatePicture
    } = usePictureTab()

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdatePicture()
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Profile Picture</h3>
                <p className="w-full text-small text-default-400">Manage picture of this profile</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-10" onSubmit={handleSubmitUpdatePicture(onUpdate)}>
                    <div className="flex flex-col gap-2">
                        <p className="text-sm font-medium text-default-700">Current Picture</p>
                        <Skeleton isLoaded={!!currentPicture !== undefined  } className="w-1/2 aspect-square rounded-lg">
                            <Avatar src={currentPicture} alt="Image Picture for Profile" showFallback className="aspect-square h-full w-full cursor-pointer" />
                        </Skeleton>
                    </div>
                    <Controller name="profilePicture" control={controlUpdatePicture} render={({ field: { onChange, value, ...field } }) => (
                        <InputFile
                            {...field}
                            name="profilePicture"
                            label="Upload New Picture"
                            onUpload={(files) => handleUploadUpdatePicture(files, onChange)}
                            onDelete={() => handleDeleteUploadPicture(onChange)}
                            isUploading={isPendingMutateUploadFile}
                            isDeleting={isPendingMutateDeleteFile}
                            isInvalid={errosUpdatePicture.profilePicture !== undefined}
                            errorMessage={errosUpdatePicture.profilePicture?.message}
                            preview={typeof preview === "string" ? preview : ""}
                            isDropable />
                    )} />
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingMutateUploadFile || isPendingUpdate || !preview}>
                        {isPendingUpdate ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default PictureTab
"use client"

import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Skeleton, Spinner, Textarea } from "@heroui/react"
import useInfoTab from "./useInfoTab"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import { ICategory } from "@/src/types/Category"

interface IInfoTypes {
    dataCategory: ICategory
    onUpdate: (data: ICategory) => void
    isPendingUpdateCategory: boolean
    isSuccessUpdateCategory: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const { dataCategory, onUpdate, isPendingUpdateCategory, isSuccessUpdateCategory } = props
    console.log(dataCategory)

    const {
        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        setValueUpdateInformation,
        resetUpdateInformation
    } = useInfoTab()

    useEffect(() => {
        setValueUpdateInformation('name', `${dataCategory?.name}`)
        setValueUpdateInformation('description', `${dataCategory?.description}`)
        setValueUpdateInformation('isPublish', `${dataCategory?.isPublish}`)
    }, [dataCategory])

    useEffect(() => {
        if (isSuccessUpdateCategory) {
            resetUpdateInformation()
        }
    }, [isSuccessUpdateCategory])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Category Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this category</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInformation(onUpdate)}>
                    <Skeleton isLoaded={!!dataCategory?.name} className="rounded-lg">
                        <Controller name="name" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Name"
                                placeholder="Please Input Name For Category"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataCategory?.name}
                                isInvalid={errorsUpdateInformation.name !== undefined}
                                errorMessage={errorsUpdateInformation.name?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataCategory?.description} className="rounded-lg">
                        <Controller name="description" control={controlUpdateInformation} render={({ field }) => (
                            <Textarea
                                {...field}
                                label="Description"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Input Description For Category"
                                defaultValue={dataCategory?.description}
                                isInvalid={errorsUpdateInformation.description !== undefined}
                                errorMessage={errorsUpdateInformation.description?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={dataCategory !== undefined} className="rounded-lg">
                        <Controller name="isPublish" control={controlUpdateInformation} render={({ field }) => (
                            <Select
                                {...field}
                                label="Status"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Select Status For Category"
                                disallowEmptySelection
                                isInvalid={errorsUpdateInformation.isPublish !== undefined}
                                errorMessage={errorsUpdateInformation.isPublish?.message}
                                selectedKeys={field.value ? [field.value] : []}>
                                <SelectItem key="true" textValue="Active">Active</SelectItem>
                                <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                            </Select>
                        )} />
                    </Skeleton>
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingUpdateCategory || !dataCategory?._id}>
                        {isPendingUpdateCategory ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab

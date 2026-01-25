import { Button, Card, CardBody, CardHeader, Input, Select, SelectItem, Skeleton, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import { useEffect } from "react"
import { IBanner } from "@/src/types/Banner"
import useInfoTab from "./useInfoTab"

interface IInfoTypes {
    dataBanner: IBanner
    onUpdate: (data: Partial<IBanner>) => void
    isPendingUpdateBanner: boolean
    isSuccessUpdateBanner: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const { dataBanner, onUpdate, isPendingUpdateBanner, isSuccessUpdateBanner } = props
    const {
        controlUpdateInformation,
        handleSubmitUpdateInformation,
        errorsUpdateInformation,
        setValueUpdateInformation,
        resetUpdateInformation
    } = useInfoTab()

    useEffect(() => {
        setValueUpdateInformation('title', `${dataBanner?.title}`)
        setValueUpdateInformation('isShow', `${dataBanner?.isShow}`)
    }, [dataBanner])

    useEffect(() => {
        if (isSuccessUpdateBanner) {
            resetUpdateInformation()
        }
    }, [isSuccessUpdateBanner])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Banner Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this banner</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInformation(onUpdate)}>
                    <Skeleton isLoaded={!!dataBanner?.title} className="rounded-lg">
                        <Controller name="title" control={controlUpdateInformation} render={({ field }) => (
                            <Input
                                {...field}
                                label="Title"
                                placeholder="Please Input Title For Banner"
                                type="text"
                                variant="bordered"
                                labelPlacement="outside"
                                defaultValue={dataBanner?.title}
                                isInvalid={errorsUpdateInformation.title !== undefined}
                                errorMessage={errorsUpdateInformation.title?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={!!dataBanner?.isShow !== undefined} className="rounded-lg">
                        <Controller name="isShow" control={controlUpdateInformation} render={({ field }) => (
                            <Select
                                {...field}
                                label="Status"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please Select Status For Category"
                                disallowEmptySelection
                                isInvalid={errorsUpdateInformation.isShow !== undefined}
                                errorMessage={errorsUpdateInformation.isShow?.message}
                                defaultSelectedKeys={[dataBanner?.isShow ? "true" : "false"]}>
                                <SelectItem key="true" textValue="Active">Active</SelectItem>
                                <SelectItem key="false" textValue="Pending">Pending</SelectItem>
                            </Select>
                        )} />
                    </Skeleton>
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingUpdateBanner || !dataBanner?._id}>
                        {isPendingUpdateBanner ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab

"use client"

import { Button, Card, CardBody, CardHeader, Input, Skeleton, Spinner } from "@heroui/react"
import { useEffect } from "react"
import { Controller } from "react-hook-form"
import useInfoTab from "./useInfoTab"
import { IProfile } from "@/src/types/Auth"

interface IInfoTypes {
    dataProfile: IProfile
    onUpdate: (data: IProfile) => void
    isPendingUpdate: boolean
    isSuccessUpdate: boolean
}

const InfoTab = (props: IInfoTypes) => {
    const {
        dataProfile,
        onUpdate,
        isPendingUpdate,
        isSuccessUpdate,
    } = props

    const {
        controlUpdateInfo,
        handleSubmitUpdateInfo,
        errorsUpdateInfo,
        resetUpdateInfo,
        setValueUpdateInfo,
    } = useInfoTab()

    useEffect(() => {
        if (dataProfile) {
            setValueUpdateInfo("fullName", `${dataProfile?.fullName}`)
            setValueUpdateInfo("username", `${dataProfile?.username}`)
        }
    }, [dataProfile]);

    useEffect(() => {
        if (isSuccessUpdate) {
            resetUpdateInfo()
        }
    }, [isSuccessUpdate])

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Profile Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this Info</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdateInfo(onUpdate)}>
                    <Skeleton isLoaded={dataProfile?.fullName !== undefined} className="rounded-lg">
                        <Controller name="fullName" control={controlUpdateInfo} render={({ field }) => (
                            <Input
                                {...field}
                                label="fullName"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please input your fullName"
                                defaultValue={dataProfile?.fullName}
                                isInvalid={errorsUpdateInfo.fullName !== undefined}
                                errorMessage={errorsUpdateInfo.fullName?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={dataProfile?.username !== undefined} className="rounded-lg">
                        <Controller name="username" control={controlUpdateInfo} render={({ field }) => (
                            <Input
                                {...field}
                                label="Username"
                                variant="bordered"
                                labelPlacement="outside"
                                placeholder="Please input your username"
                                defaultValue={dataProfile?.username}
                                isInvalid={errorsUpdateInfo.username !== undefined}
                                errorMessage={errorsUpdateInfo.username?.message}
                            />
                        )} />
                    </Skeleton>
                    <Skeleton isLoaded={dataProfile?.email !== undefined} className="rounded-lg">
                        <Input
                            label="Email"
                            variant="flat"
                            labelPlacement="outside"
                            value={dataProfile?.email}
                            disabled
                        />
                    </Skeleton>
                    <Skeleton isLoaded={dataProfile?.role !== undefined} className="rounded-lg">
                        <Input
                            label="Role"
                            variant="flat"
                            labelPlacement="outside"
                            value={dataProfile?.role}
                            classNames={{
                                input: "capitalize",
                            }}
                            disabled
                        />
                    </Skeleton>
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingUpdate}>
                        {isPendingUpdate ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default InfoTab

"use client"

import { Button, Card, CardBody, CardHeader, Input, Spinner } from "@heroui/react"
import { Controller } from "react-hook-form"
import useSecurityTab from "./useSecurityTab"
import { Eye, EyeClosed } from "lucide-react"

const SecurityTab = () => {
    const {
        controlUpdatePassword,
        handleSubmitUpdatePassword,
        handleUpdatePassword,
        errorsUpdatePassword,
        isPendingMutatePassword,

        isVisible,
        handleTogglePassword
    } = useSecurityTab()

    return (
        <Card className="w-full lg:w-1/2 p-4">
            <CardHeader className="flex flex-col lg:items-start gap-1">
                <h3 className="text-xl font-bold">Security Information</h3>
                <p className="w-full text-small text-default-400">Manage information of this security</p>
            </CardHeader>
            <CardBody>
                <form className="flex flex-col gap-4" onSubmit={handleSubmitUpdatePassword(handleUpdatePassword)}>
                    <Controller name="oldPassword" control={controlUpdatePassword} render={({ field }) => (
                        <Input
                            {...field}
                            label="Password"
                            labelPlacement="outside"
                            type={isVisible.oldPassword ? "true" : "password"}
                            variant="bordered"
                            placeholder="Please input your password"
                            isInvalid={errorsUpdatePassword.oldPassword !== undefined}
                            errorMessage={errorsUpdatePassword.oldPassword?.message}
                            endContent={
                                <button type="button" className="focus:outline-none" onClick={() => ("oldPassword")}>
                                    {isVisible.oldPassword ? (
                                        <Eye size={20} className="text-xl text-default-400 cursor-pointer" />
                                    ) : (
                                        <EyeClosed size={20} className="text-xl text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                    )} />
                    <Controller name="password" control={controlUpdatePassword} render={({ field }) => (
                        <Input
                            {...field}
                            label="New Password"
                            labelPlacement="outside"
                            type={isVisible.password ? "true" : "password"}
                            variant="bordered"
                            placeholder="Please input your new password"
                            isInvalid={errorsUpdatePassword.password !== undefined}
                            errorMessage={errorsUpdatePassword.password?.message}
                            endContent={
                                <button type="button" className="focus:outline-none" onClick={() => handleTogglePassword("password")}>
                                    {isVisible.password ? (
                                        <Eye size={20} className="text-xl text-default-400 cursor-pointer" />
                                    ) : (
                                        <EyeClosed size={20} className="text-xl text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                    )} />
                    <Controller name="confirmPassword" control={controlUpdatePassword} render={({ field }) => (
                        <Input
                            {...field}
                            label="Confirm Password"
                            labelPlacement="outside"
                            type={isVisible.confirmPassword ? "true" : "password"}
                            variant="bordered"
                            placeholder="Please confirm password"
                            isInvalid={errorsUpdatePassword.confirmPassword !== undefined}
                            errorMessage={errorsUpdatePassword.confirmPassword?.message}
                            endContent={
                                <button type="button" className="focus:outline-none" onClick={() => handleTogglePassword("confirmPassword")}>
                                    {isVisible.confirmPassword ? (
                                        <Eye size={20} className="text-xl text-default-400 cursor-pointer" />
                                    ) : (
                                        <EyeClosed size={20} className="text-xl text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                    )} />
                    <Button color="primary" type="submit" className="disabled:bg-default-500 mt-2" disabled={isPendingMutatePassword}>
                        {isPendingMutatePassword ? (
                            <Spinner size="sm" color="white" />
                        ) : "Save Changes"}
                    </Button>
                </form>
            </CardBody>
        </Card>
    )
}

export default SecurityTab

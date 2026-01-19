"use client"

import { cn } from "@/src/utils/cn"
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import useLogin from "./useLogin"
import { Controller } from "react-hook-form"

const Login = () => {
    const {
        visible,
        handleVisible,
        control,
        handleSubmit,
        handleLogin,
        isPendingLogin,
        errors,
    } = useLogin()

    return (
        <div className="flex flex-col items-center justify-center">
            <Card className="w-fit">
                <CardBody className="px-8 py-5">
                    <h1 className="text-2xl font-bold text-primary mb-2">Login Account</h1>
                    <p className="text-foreground text-sm">Not have an account?&nbsp;
                        <Link href="/auth/register" className="font-semibold text-sm text-primary">Register</Link>
                    </p>
                    <form className={cn("flex w-80 flex-col mt-4", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleLogin)}>
                        <Controller name="identifier" control={control} render={({ field }) => (
                            <Input {...field} type="text" label="Email / Username" variant="bordered" autoComplete="off" isInvalid={errors.identifier !== undefined} errorMessage={errors.identifier?.message} />
                        )} />
                        <Controller name="password" control={control} render={({ field }) => (
                            <Input {...field} type={visible ? "text" : "password"} label="Password" variant="bordered" autoComplete="off" isInvalid={errors.password !== undefined} errorMessage={errors.password?.message} endContent={
                                <button type="button" className="focus:outline-none" onClick={handleVisible}>
                                    {visible ? (
                                        <Eye size={20} className="text-default-400 cursor-pointer" />
                                    ) : (
                                        <EyeClosed size={20} className="text-default-400 cursor-pointer" />
                                    )}
                                </button>
                            } />
                        )} />
                        <Button color="primary" type="submit">
                            {isPendingLogin ? <Spinner color="white" size="sm" /> : "Login"}
                        </Button>
                    </form>
                </CardBody>
            </Card>
        </div>
    )
}

export default Login
"use client"

import { cn } from "@/src/utils/cn"
import { Button, Card, CardBody, Input, Spinner } from "@heroui/react"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import useRegister from "./useRegister"
import { Controller } from "react-hook-form"

const Register = () => {
  const {
    visible,
    handleVisible,

    control,
    handleSubmit,
    handleRegister,
    isPendingRegister,
    errors,
  } = useRegister()

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-fit">
        <CardBody className="px-8 py-5">
          <h1 className="text-2xl font-bold text-primary mb-2">Create Account</h1>
          <p className="text-foreground text-sm">Have an account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-sm text-primary">Login</Link>
          </p>
          <form className={cn("flex w-80 flex-col mt-4", Object.keys(errors).length > 0 ? "gap-2" : "gap-4")} onSubmit={handleSubmit(handleRegister)}>
            <Controller name="fullName" control={control} render={({ field }) => (
              <Input {...field} type="text" label="FullName" variant="bordered" autoComplete="off" isInvalid={errors.fullName !== undefined} errorMessage={errors.fullName?.message} />
            )} />
            <Controller name="username" control={control} render={({ field }) => (
              <Input {...field} type="text" label="Username" variant="bordered" autoComplete="off" isInvalid={errors.username !== undefined} errorMessage={errors.username?.message} />
            )} />
            <Controller name="email" control={control} render={({ field }) => (
              <Input {...field} type="email" label="Email" variant="bordered" autoComplete="off" isInvalid={errors.email !== undefined} errorMessage={errors.email?.message} />
            )} />
            <Controller name="password" control={control} render={({ field }) => (
              <Input {...field} label="Password" variant="bordered" autoComplete="off" type={visible.password ? "text" : "password"} endContent={
                <button type="button" className="focus:outline:none" onClick={() => handleVisible("password")}>
                  {visible.password ? (
                    <Eye size={20} className="text-default-400 cursor-pointer" />
                  ) : (
                    <EyeClosed size={20} className="text-default-400 cursor-pointer" />
                  )}
                </button>
              } isInvalid={errors.password !== undefined} errorMessage={errors.password?.message} />
            )} />
            <Controller name="confirmPassword" control={control} render={({ field }) => (
              <Input {...field} label="Confirmation Password" variant="bordered" autoComplete="off" type={visible.confirmPassword ? "text" : "password"} endContent={
                <button type="button" className="focus:outline:none" onClick={() => handleVisible("confirmPassword")}>
                  {visible.confirmPassword ? (
                    <Eye size={20} className="text-default-400 cursor-pointer" />
                  ) : (
                    <EyeClosed size={20} className="text-default-400 cursor-pointer" />
                  )}
                </button>
              } isInvalid={errors.confirmPassword !== undefined} errorMessage={errors.confirmPassword?.message} />
            )} />
            <Button color="primary" type="submit">
              {isPendingRegister ? <Spinner color="white" size="sm" /> : "Register"}
            </Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Register
"use client"

import { cn } from "@/src/utils/cn"
import { Button, Card, CardBody, Input } from "@heroui/react"
import { Eye, EyeClosed } from "lucide-react"
import Link from "next/link"
import useRegister from "./useRegister"

const Register = () => {
  const { visible, handleVisible } = useRegister()

  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-1/4">
        <CardBody className="px-8 py-5">
          <h1 className="text-xl font-bold text-primary">Create Account</h1>
          <p className="text-foreground text-sm">Have an account?&nbsp;
            <Link href="/auth/login" className="font-semibold text-sm text-primary">Login</Link>
          </p>
          <form className={cn("flex flex-col mt-4", "gap-4")}>
            <Input label="FullName" variant="bordered" autoComplete="off" />
            <Input label="Username" variant="bordered" autoComplete="off" />
            <Input label="Email" variant="bordered" autoComplete="off" />
            <Input label="Password" variant="bordered" autoComplete="off" type={visible.password ? "text" : "password"} endContent={
              <button type="button" className="focus:outline:none" onClick={() => handleVisible("password")}>
                {visible.password ? (
                  <Eye size={20} className="text-default-400 cursor-pointer" />
                ) : (
                  <EyeClosed size={20} className="text-default-400 cursor-pointer" />
                )}
              </button>
            } />
            <Input label="Confirmation Password" variant="bordered" autoComplete="off" type={visible.confirmPassword ? "text" : "password"} endContent={
              <button type="button" className="focus:outline:none" onClick={() => handleVisible("confirmPassword")}>
                {visible.confirmPassword ? (
                  <Eye size={20} className="text-default-400 cursor-pointer" />
                ) : (
                  <EyeClosed size={20} className="text-default-400 cursor-pointer" />
                )}
              </button>
            } />
            <Button color="primary" >Register</Button>
          </form>
        </CardBody>
      </Card>
    </div>
  )
}

export default Register
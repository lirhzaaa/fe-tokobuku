"use client"

import { Button } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

const RegisterSuccess = () => {
    const router = useRouter()
    return (
        <div className="flex flex-col items-center justify-center p-4">
            <div className="flex items-center justify-center mb-20">
                <Image src="/images/general/logo.svg" alt="Logo" width={200} height={200} />
            </div>
            <div className="flex flex-col items-center justify-center gap-2 mb-4 text-center">
                <h4 className="text-2xl font-bold text-primary">Create Account Success</h4>
                <p className="text-md font-semibold text-default-500">Check your email in all email or spam for account activation</p>
            </div>
            <Button className="mt-4 w-fit" variant="bordered" color="primary" onPress={() => router.push("/")}>Back To Home</Button>
        </div>
    )
}

export default RegisterSuccess

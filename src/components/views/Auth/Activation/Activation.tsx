import { Button } from "@heroui/react"
import Image from "next/image"
import { useRouter } from "next/navigation"

interface IPropsTypes {
    status: "success" | "failed"
}

const Activation = (props: IPropsTypes) => {
    const router = useRouter()
    const { status } = props
    return (
        <div className="flex flex-col items-center justify-center gap-10 p-4">
            <div className="flex flex-col items-center justify-center gap-10">
                <Image src="/images/general/logo.svg" alt="Success Activation" width={200} height={200} />
            </div>
            <div className="flex flex-col items-center justify-center text-center gap-2">
                <h4 className="text-2xl font-bold text-danger">{status === "success" ? "Activation Success" : "Activation Failed"}</h4>
                <p className="text-md font-semibold text-default-500">{status === "success" ? "Thank you for register account in Tokobuku" : "Confirmation code is invalid"}</p>
                <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={() => router.push("/")}>Back To Home</Button>
            </div>
        </div>
    )
}

export default Activation
import AuthLayout from "@/src/components/layouts/AuthLayout"
import Activation from "@/src/components/views/Auth/Activation"
import { environment } from "@/src/config/environment"

interface IProps {
    searchParams: Promise<{ code?: string }>
}

export default async function ActivationPage({ searchParams }: IProps) {
    const params = await searchParams
    let status: "success" | "failed" = "failed"

    try {
        const code = params.code

        if (!code) {
            return (
                <AuthLayout>
                    <Activation status="failed" />
                </AuthLayout>
            )
        }

        const fullURL = `${environment.API_URL}/auth/activation`
        
        const response = await fetch(fullURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ code }),
            cache: 'no-store',
        })

        const responseText = await response.text()
        if (!response.headers.get('content-type')?.includes('application/json')) {
            console.error("response:", responseText)
            status = "failed"
        } else {
            const result = JSON.parse(responseText)
            console.log("result:", result)
            if (response.ok && result?.data) {
                status = "success"
            } else {
                console.log("failed:", result)
            }
        }
    } catch (error) {
        console.error("activation error:", error)
    }

    return (
        <AuthLayout>
            <Activation status={status} />
        </AuthLayout>
    )
}
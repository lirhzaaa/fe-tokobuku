import AuthLayout from "@/src/components/layouts/AuthLayout"
import Activation from "@/src/components/views/Auth/Activation"
import AuthService from "@/src/services/auth.service"

interface IProps {
    status: "success" | "failed"
}

const ActivationPage = (props: IProps) => {
    return (
        <AuthLayout>
            <Activation {...props} />
        </AuthLayout>
    )
}

export async function getServerSideProps(context: { query: { code: string } }) {
    try {
        const result = await AuthService.activation({ code: context.query.code })
        if (result.data.data) {
            return {
                props: {
                    status: "success"
                }
            }
        } else {
            return {
                props: {
                    status: "failed"
                }
            }
        }
    } catch (error) {
        return {
            props: {
                status: "failed",
                error: error
            }
        }
    }
}

export default ActivationPage
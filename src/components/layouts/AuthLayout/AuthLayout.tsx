import { ReactNode } from "react"

interface PropTypes {
    children?: ReactNode
}

const AuthLayout = (props: PropTypes) => {
    const { children } = props
    return (
        <div className="flex min-h-screen min-w-full flex-col items-center justify-center gap-10 py-10 lg:py-0">
            <section className="max-w-screen-2xl 2xl:container p-6">
                {children}
            </section>
        </div>
    )
}

export default AuthLayout
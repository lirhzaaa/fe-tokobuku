"use client"

import { Button, Listbox, ListboxItem } from "@heroui/react"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { JSX } from "react"
import { signOut } from "next-auth/react"
import Link from "next/link"
import { cn } from "@/src/utils/cn"
import { LogOut } from "lucide-react"

interface SidebarItems {
    key: string
    label: string
    href: string
    icon: JSX.Element
}

interface PropsTypes {
    sidebarItems: SidebarItems[]
    isOpen: boolean
}

const DashboardLayoutSidebar = (props: PropsTypes) => {
    const { sidebarItems, isOpen } = props
    const router = useRouter()
    const pathname = usePathname()

    return (
        <div className={cn("fixed lg:relative z-50 h-screen w-full max-w-75 -translate-x-full lg:translate-x-0 flex flex-col justify-between border-r-1 border-default-200 bg-white px-5 py-6 transition-all",
            { "translate-x-0": isOpen }
        )}>
            <div>
                <div className="flex">
                    <Image src="/images/general/logo.png" alt="Logo" width={180} height={60} className="mb-6 w-36 cursor-pointer" onClick={() => router.push("/")} />
                </div>
                <Listbox items={sidebarItems} variant="solid" className="p-0">
                    {(item) => (
                        <ListboxItem key={item.key} className={cn("h-12 mb-2 text-2xl transition-all duration-300", {
                            "bg-primary text-white": pathname.startsWith(item.href)
                        })}
                            startContent={item.icon}
                            aria-labelledby={item.label}
                            aria-describedby={item.label}
                            as={Link}
                            href={item.href}
                        >
                            <p className="text-small">{item.label}</p>
                        </ListboxItem>
                    )}
                </Listbox>
            </div>
            <div className="flex items-center">
                <Button color="danger" fullWidth variant="flat" className="flex justify-start rounded-lg px-2 py-1.5" size="lg" onPress={() => signOut()}>
                    <LogOut />
                    Logout
                </Button>
            </div>
        </div>
    )
}

export default DashboardLayoutSidebar
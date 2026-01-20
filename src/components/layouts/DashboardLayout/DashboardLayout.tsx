"use client"

import { Fragment, ReactNode, useState } from "react"
import DashboardLayoutSidebar from "./DashboardLayoutSidebar"
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "./DashboardLayout.constans"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarMenuToggle } from "@heroui/react"
import { usePathname } from "next/navigation"

interface PropsTypes {
    children?: ReactNode
}

const DashboardLayout = (props: PropsTypes) => {
    const { children } = props
    const pathname = usePathname()
    const isAdmin = pathname.startsWith("/admin")
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <div className="max-w-screen-2xl 2xl:container flex">
                <DashboardLayoutSidebar sidebarItems={isAdmin ? SIDEBAR_ADMIN : SIDEBAR_USER} isOpen={open} />
                <div className="h-screen w-full overflow-y-auto">
                    <Navbar className="border-b border-default-200" position="static" maxWidth="full">
                        <NavbarContent justify="start">
                            <NavbarMenuToggle
                                aria-label={open ? "Close Menu" : "Open Menu"}
                                onClick={() => setOpen(!open)}
                            />
                        </NavbarContent>

                        <NavbarContent justify="end">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform cursor-pointer"
                                        color="primary"
                                        name="Jason Hughes"
                                        size="sm"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-12 gap-2">
                                        <p className="font-semibold">azhril@example.com</p>
                                    </DropdownItem>
                                    <DropdownItem key="profile">Profile</DropdownItem>
                                    <DropdownItem key="settings">Settings</DropdownItem>
                                    <DropdownItem key="logout" color="danger">
                                        Log Out
                                    </DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </NavbarContent>
                    </Navbar>
                    <div className="p-5">
                        {children}
                    </div>
                </div>
            </div>
        </Fragment>
    )
}

export default DashboardLayout

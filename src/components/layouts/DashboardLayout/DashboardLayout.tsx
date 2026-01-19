"use client"

import { Fragment, ReactNode, useState } from "react"
import DashboardLayoutSidebar from "./DashboardLayoutSidebar"
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "./DashboardLayout.constans"
import { Avatar, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger, Navbar, NavbarContent, NavbarMenuToggle } from "@heroui/react"

interface PropsTypes {
    children?: ReactNode
    title?: string
    description?: string
    type?: string
}

const DashboardLayout = (props: PropsTypes) => {
    const { children, title, description, type } = props
    const [open, setOpen] = useState(false)

    return (
        <Fragment>
            <div className="max-w-screen-2xl 2xl:container flex">
                <DashboardLayoutSidebar sidebarItems={type === "admin" ? SIDEBAR_ADMIN : SIDEBAR_USER} isOpen={open} />
                <div className="h-screen w-full overflow-y-auto">
                    <Navbar className={`flex justify-between items-center border-b border-default-200 w-full`} position="static" >
                        <NavbarMenuToggle arial-label={open ? "Close Menu" : "Open Menu"} onClick={() => setOpen(!open)} />
                        <NavbarContent as="div" justify="end">
                            <Dropdown placement="bottom-end">
                                <DropdownTrigger>
                                    <Avatar
                                        isBordered
                                        as="button"
                                        className="transition-transform"
                                        color="secondary"
                                        name="Jason Hughes"
                                        size="sm"
                                        src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                                    />
                                </DropdownTrigger>
                                <DropdownMenu aria-label="Profile Actions" variant="flat">
                                    <DropdownItem key="profile" className="h-14 gap-2">
                                        <p className="font-semibold">Signed in as</p>
                                        <p className="font-semibold">zoey@example.com</p>
                                    </DropdownItem>
                                    <DropdownItem key="settings">My Settings</DropdownItem>
                                    <DropdownItem key="team_settings">Team Settings</DropdownItem>
                                    <DropdownItem key="analytics">Analytics</DropdownItem>
                                    <DropdownItem key="system">System</DropdownItem>
                                    <DropdownItem key="configurations">Configurations</DropdownItem>
                                    <DropdownItem key="help_and_feedback">Help & Feedback</DropdownItem>
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

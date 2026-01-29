"use client"

import { Fragment, ReactNode, useState } from "react"
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar,
  NavbarContent,
  NavbarMenuToggle,
} from "@heroui/react"
import { usePathname } from "next/navigation"
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "../../constants/DashboardLayout.constants"
import DashboardLayoutSidebar from "@/src/components/layouts/DashboardLayoutSidebar"
import useDashboardLayoutClient from "./useDashboardLayoutClient"
import { signOut } from "next-auth/react"

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const [open, setOpen] = useState(false)

  const {
    dataProfile
  } = useDashboardLayoutClient()

  return (
    <Fragment>
      <div className="flex">
        <DashboardLayoutSidebar
          sidebarItems={isAdmin ? SIDEBAR_ADMIN : SIDEBAR_USER}
          isOpen={open}
        />

        <div className="h-screen w-full overflow-y-auto">
          <Navbar className="border-b border-default-200" position="sticky" maxWidth="full">
            <NavbarContent justify="end" className="items-center gap-2">
              <div className="hidden md:flex">
                <Dropdown placement="bottom-end">
                  <DropdownTrigger>
                    <Avatar
                      isBordered
                      as="button"
                      className="transition-transform cursor-pointer"
                      color="primary"
                      size="sm"
                      name={dataProfile?.username}
                      src={dataProfile?.profilePicture}
                      showFallback
                    />
                  </DropdownTrigger>

                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="username" className="h-12 gap-2">
                      <p className="font-semibold">@{dataProfile?.username}</p>
                    </DropdownItem>
                    {!isAdmin ? (
                      <DropdownItem key="admin" href="/admin">Admin</DropdownItem>
                    ) : null}
                    <DropdownItem key="profile" href="/profile">Profile</DropdownItem>
                    <DropdownItem key="logout" color="primary" onPress={() => signOut()}>
                      Log Out
                    </DropdownItem>
                  </DropdownMenu>
                </Dropdown>
              </div>

              <div className="md:hidden">
                <NavbarMenuToggle
                  aria-label={open ? "Close Menu" : "Open Menu"}
                  onClick={() => setOpen(!open)}
                />
              </div>
            </NavbarContent>
          </Navbar>

          <main className="p-5">
            {children}
          </main>

          <footer className="border-t border-default-200 px-5 py-3 text-sm text-default-500">
            © {new Date().getFullYear()} My Dashboard. All rights reserved.
          </footer>
        </div>
      </div>
    </Fragment>
  )
}

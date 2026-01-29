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

export default function DashboardLayoutClient({
  children,
}: {
  children: ReactNode
}) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith("/admin")
  const [open, setOpen] = useState(false)

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
                      name="Jason Hughes"
                      size="sm"
                      src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
                    />
                  </DropdownTrigger>

                  <DropdownMenu aria-label="Profile Actions" variant="flat">
                    <DropdownItem key="email" className="h-12 gap-2">
                      <p className="font-semibold">azhril@example.com</p>
                    </DropdownItem>
                    {!isAdmin ? (
                      <DropdownItem key="admin" href="/admin">Admin</DropdownItem>
                    ) : null}
                    <DropdownItem key="profile" href="/profile">Profile</DropdownItem>
                    <DropdownItem key="settings">Settings</DropdownItem>
                    <DropdownItem key="logout" color="primary">
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

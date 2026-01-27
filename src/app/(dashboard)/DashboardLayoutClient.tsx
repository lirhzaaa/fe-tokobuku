"use client"

import { Fragment, ReactNode, useState } from "react"
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Input,
  Navbar,
  NavbarContent,
} from "@heroui/react"
import { usePathname } from "next/navigation"
import { SIDEBAR_ADMIN, SIDEBAR_USER } from "../../constants/DashboardLayout.constants"
import DashboardLayoutSidebar from "@/src/components/layouts/DashboardLayoutSidebar"
import { SearchIcon } from "lucide-react"

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
            <NavbarContent justify="start">
              <Input
                classNames={{
                  base: "max-w-full sm:max-w-[20rem] h-10",
                  mainWrapper: "h-full",
                  input: "text-small",
                  inputWrapper:
                    "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
                }}
                placeholder="Type to search..."
                size="sm"
                startContent={<SearchIcon size={18} />}
                type="search"
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
                  <DropdownItem key="logout" color="primary">
                    Log Out
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
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

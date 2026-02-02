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
import Image from "next/image"
import Link from "next/link"
import { Facebook, Instagram, Mail, Phone } from "lucide-react"

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

  const menuLinks = [
    { key: "dashboard", label: "Dashboard", href: "/dashboard" },
    { key: "book", label: "Book", href: "/book" },
    { key: "cart", label: "Keranjang", href: "/cart" },
    { key: "blog", label: "Blog", href: "/blog" },
    { key: "transaction", label: "Transaction", href: "/transaction" },
  ]

  const aboutLinks = [
    { key: "about", label: "Tentang Kami", href: "#" },
    { key: "terms", label: "Syarat & Ketentuan", href: "#" },
    { key: "privacy", label: "Kebijakan Privasi", href: "#" },
    { key: "faq", label: "FAQ", href: "#" },
  ]

  const socialMediaLinks = [
    {
      key: "whatsapp",
      icon: Phone,
      href: "#",
      ariaLabel: "WhatsApp"
    },
    {
      key: "instagram",
      icon: Instagram,
      href: "#",
      ariaLabel: "Instagram"
    },
    {
      key: "facebook",
      icon: Facebook,
      href: "#",
      ariaLabel: "Facebook"
    },
    {
      key: "email",
      icon: Mail,
      href: "tokobukuexample@gmail.com",
      ariaLabel: "Email"
    },
  ]

  const contactInfo = {
    address: "Bogor",
    email: "tokobukuexample@gmail.com",
    phone: "+62 838 0565 0232"
  }

  return (
    <Fragment>
      <div className="flex">
        <DashboardLayoutSidebar
          sidebarItems={isAdmin ? SIDEBAR_ADMIN : SIDEBAR_USER}
          isOpen={open}
        />

        <div className="h-screen w-full overflow-y-auto flex flex-col">
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

          <main className="flex-1 p-4 sm:p-5 lg:p-6">
            {children}
          </main>

          <footer className="border-t border-default-200 bg-default-50">
            <div className="px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-6 sm:mb-8">
                <div className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-3 sm:space-y-4">

                  <Image
                    src="/images/general/logo.png"
                    alt="Tokobuku Logo"
                    width={180}
                    height={60}
                    className="w-32 sm:w-36 cursor-pointer"
                  />
                  <p className="text-xs sm:text-sm text-default-600 leading-relaxed">
                    Tokobuku - Your Smart Library. Platform terpercaya untuk membeli buku berkualitas dengan harga terjangkau.
                  </p>
                  <div className="flex gap-3 sm:gap-4 pt-2">
                    {socialMediaLinks.map((social) => {
                      const IconComponent = social.icon
                      return (
                        <Link
                          key={social.key}
                          href={social.href}
                          target="_blank"
                          className="p-2 rounded-full hover:bg-default-200 bg-primary text-white hover:text-primary transition-colors duration-300"
                          aria-label={social.ariaLabel}
                        >
                          <IconComponent size={18} className="sm:w-5 sm:h-5" />
                        </Link>
                      )
                    })}
                  </div>
                </div>

                <div className="flex flex-col items-center text-center sm:items-start sm:text-left space-y-2 sm:space-y-3">
                  <h3 className="text-sm sm:text-base font-semibold text-primary mb-1 sm:mb-2">Menu</h3>
                  {menuLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="text-xs sm:text-sm text-default-600 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-3 items-center text-center sm:items-start sm:text-left">
                  <h3 className="text-sm sm:text-base font-semibold text-primary mb-1 sm:mb-2">Tentang</h3>
                  {aboutLinks.map((link) => (
                    <Link
                      key={link.key}
                      href={link.href}
                      className="text-xs sm:text-sm text-default-600 hover:text-primary transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </div>

                <div className="flex flex-col space-y-2 sm:space-y-3 items-center text-center sm:items-start sm:text-left">
                  <h3 className="text-sm sm:text-base font-semibold text-primary mb-1 sm:mb-2">Kontak</h3>
                  <div className="flex flex-col space-y-2">
                    <div className="text-xs sm:text-sm text-default-600">
                      <p className="font-medium">Alamat:</p>
                      <p>{contactInfo.address}</p>
                    </div>
                    <div className="text-xs sm:text-sm text-default-600">
                      <p className="font-medium">Email:</p>
                      <Link href={contactInfo.email} className="hover:text-primary transition-colors">
                        {contactInfo.email === "#" ? "-" : contactInfo.email}
                      </Link>
                    </div>
                    <div className="text-xs sm:text-sm text-default-600">
                      <p className="font-medium">Telepon:</p>
                      <Link href={contactInfo.phone} className="hover:text-primary transition-colors">
                        {contactInfo.phone === "#" ? "-" : contactInfo.phone}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-default-200 pt-4 sm:pt-6">
                <p className="text-xs sm:text-sm text-center text-default-500">
                  Copyright © {new Date().getFullYear()} Tokobuku (Your Smart Library). Seluruh Hak Cipta Dilindungi Undang-Undang.
                </p>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </Fragment>
  )
}
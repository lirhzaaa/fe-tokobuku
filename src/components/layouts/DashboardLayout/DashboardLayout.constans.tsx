import { Bookmark, BookText, LayoutDashboard, Newspaper, ShoppingCart, Tags, User, Wallet } from "lucide-react"

const SIDEBAR_ADMIN = [
    {
        key: "books",
        label: "Books",
        href: "/admin/books",
        icon: <BookText />
    },
    {
        key: "category",
        label: "Category",
        href: "/admin/category",
        icon: <Tags />
    },
    {
        key: "banner",
        label: "Banner",
        href: "/admin/banner",
        icon: <Bookmark />
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/admin/transaction",
        icon: <Wallet />
    },
]

const SIDEBAR_USER = [
    {
        key: "dashboard",
        label: "Dashboard",
        href: "/",
        icon: <LayoutDashboard />
    },
    {
        key: "books",
        label: "Books",
        href: "/books",
        icon: <BookText />
    },
    {
        key: "cart",
        label: "Keranjang",
        href: "/cart",
        icon: <ShoppingCart />
    },
    {
        key: "blog",
        label: "Blog",
        href: "/blog",
        icon: <Newspaper />
    },
    {
        key: "transaction",
        label: "Transaction",
        href: "/transaction",
        icon: <Wallet />
    },
]

export { SIDEBAR_ADMIN, SIDEBAR_USER }
"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";
import { DELAY, LIMIT_DEFAULT, PAGE_DEFAULT } from "../app/constants/list.constants";
import useDebounce from "./useDebounce";

const useChangeUrl = () => {
    const router = useRouter()
    const searchParams = useSearchParams();
    const debounce = useDebounce();
    const currentLimit = searchParams.get("limit") ?? LIMIT_DEFAULT.toString();
    const currentPage = searchParams.get("page") ?? PAGE_DEFAULT.toString();
    const currentSearch = searchParams.get("search") ?? "";
    const currentCategory = searchParams.get("category") ?? "";
    const currentIsFeatured = searchParams.get("isFeatured") ?? "";

    const setURL = () => {
        const params = new URLSearchParams()
        params.set("limit", currentLimit)
        params.set("page", currentPage)

        if (currentSearch) {
            params.set("search", currentSearch)
        }

        router.replace(`?${params.toString()}`)
    };

    const setExplore = () => {
        const params = new URLSearchParams()

        params.set("limit", currentLimit)
        params.set("page", currentPage)

        if (currentCategory) params.set("category", currentCategory)
        if (currentIsFeatured) params.set("isFeatured", currentIsFeatured)

        router.replace(`?${params.toString()}`)
    };

    const handleChangePage = (page: number) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("page", page.toString())

        router.push(`?${params.toString()}`)
    };

    const handleChangeLimit = (e: ChangeEvent<HTMLSelectElement>) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("limit", e.target.value)
        params.set("page", PAGE_DEFAULT.toString())

        router.push(`?${params.toString()}`)
    };

    const handleChangeCategory = (category: string) => {
        const params = new URLSearchParams(searchParams.toString())

        params.set("category", category)
        params.set("page", PAGE_DEFAULT.toString())

        router.push(`?${params.toString()}`)
    };

    const handleChangeIsFeatured = (isFeatured: string) => {
        const params = new URLSearchParams(searchParams.toString())
        params.set("isFeatured", isFeatured)
        params.set("page", PAGE_DEFAULT.toString())

        router.push(`?${params.toString()}`)
    };

    const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value

        debounce(() => {
            const params = new URLSearchParams(searchParams.toString())
            params.set("search", value)
            params.set("page", PAGE_DEFAULT.toString())

            router.push(`?${params.toString()}`)
        }, DELAY)
    };

    const handleClearSearch = () => {
        const params = new URLSearchParams(searchParams.toString())
        params.delete("search")
        params.set("page", PAGE_DEFAULT.toString())

        router.push(`?${params.toString()}`)
    };


    return {
        currentLimit,
        currentPage,
        currentSearch,
        currentCategory,
        currentIsFeatured,

        setURL,
        setExplore,

        handleChangePage,
        handleChangeLimit,
        handleSearch,
        handleClearSearch,
        handleChangeCategory,
        handleChangeIsFeatured
    }
}

export default useChangeUrl
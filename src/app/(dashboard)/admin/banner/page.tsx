"use client";

import Banner from "@/src/components/views/Admin/Banner";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const BannerPageAdmin = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <Banner />
        </Suspense>
    )
};

export default BannerPageAdmin;
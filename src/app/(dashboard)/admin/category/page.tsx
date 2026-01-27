"use client";

import { Suspense } from "react";
import Category from "@/src/components/views/Admin/Category";
import { Spinner } from "@heroui/react";

const CategoryPageAdmin = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <Category />
        </Suspense>
    );
};

export default CategoryPageAdmin
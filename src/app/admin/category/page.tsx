"use client";

import { Suspense } from "react";
import DashboardLayout from "@/src/components/layouts/DashboardLayout";
import Category from "@/src/components/views/Admin/Category";
import { Spinner } from "@heroui/react";

const CategoryPage = () => {
    return (
        <DashboardLayout>
            <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
                <Category />
            </Suspense>
        </DashboardLayout>
    );
};

export default CategoryPage;
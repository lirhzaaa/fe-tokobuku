"use client";

import { Suspense } from "react";
import AuthLayout from "@/src/components/layouts/AuthLayout";
import Login from "@/src/components/views/Auth/Login";
import { Spinner } from "@heroui/react";

export default function LoginPage() {
    return (
        <AuthLayout>
            <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
                <Login />
            </Suspense>
        </AuthLayout>
    );
}
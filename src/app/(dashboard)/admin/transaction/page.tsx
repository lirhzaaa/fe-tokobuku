"use client";

import Transaction from "@/src/components/views/Admin/Transaction";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const TransactionPageAdmin = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <Transaction />
        </Suspense>
    )
};

export default TransactionPageAdmin
"use client";

import Transaction from "@/src/components/views/Users/Transaction";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const TransactionPage = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <Transaction />
        </Suspense>
    )
};

export default TransactionPage
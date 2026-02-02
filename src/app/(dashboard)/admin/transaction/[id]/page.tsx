"use client";

import DetailTransaction from "@/src/components/views/Admin/Transaction/DetailTransaction";
import { Spinner } from "@heroui/react";
import { Suspense } from "react";

const DetailTransactionPageAdmin = () => {
    return (
        <Suspense fallback={<Spinner color="primary" size="sm" className="mx-auto mt-4" />}>
            <DetailTransaction />
        </Suspense>
    )
};

export default DetailTransactionPageAdmin
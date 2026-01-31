"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl";
import orderServices from "@/src/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";

const useTransactions = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();
    const [selectedId, setSelectedId] = useState("")

    const getAdminTransactions = async () => {
        const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
        const result = await orderServices.getOrders(params);
        const { data } = result;
        return data;
    };

    const {
        data: dataTransactions,
        isLoading: isLoadingTransactions,
        isRefetching: isRefetchingTransactions,
        refetch: refetchTransactions,
    } = useQuery({
        queryKey: ["AdminTransactions", currentPage, currentLimit, currentSearch],
        queryFn: () => getAdminTransactions(),
        enabled: router && !!currentPage && !!currentLimit,
    });

    console.log(dataTransactions)

    return {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
        
        selectedId,
        setSelectedId
    };
};

export default useTransactions;

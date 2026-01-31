"use client"

import useChangeUrl from "@/src/hooks/useChangeUrl";
import orderServices from "@/src/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useTransactions = () => {
    const router = useRouter();
    const { currentLimit, currentPage, currentSearch } = useChangeUrl();

    const getMemberTransactions = async () => {
        const params = `limit=${currentLimit}&page=${currentPage}&search=${currentSearch}`;
        const result = await orderServices.getUserOrder(params);
        const { data } = result;
        return data;
    };

    const {
        data: dataTransactions,
        isLoading: isLoadingTransactions,
        isRefetching: isRefetchingTransactions,
        refetch: refetchTransactions,
    } = useQuery({
        queryKey: ["MemberTransactions", currentPage, currentLimit, currentSearch],
        queryFn: () => getMemberTransactions(),
        enabled: router && !!currentPage && !!currentLimit,
    });

    return {
        dataTransactions,
        isLoadingTransactions,
        isRefetchingTransactions,
        refetchTransactions,
    };
};

export default useTransactions;

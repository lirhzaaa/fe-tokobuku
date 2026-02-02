"use client";

import orderServices from "@/src/services/order.service";
import { useQuery } from "@tanstack/react-query";
import { useMemo } from "react";

export type HomeChartItem = {
  date: string
  value: number
}

export type HomeStatusItem = {
  status: string
  value: number
}

interface HomeTransaction {
  createdAt?: string;
  date?: string;
  total?: number;
  status?: string;
}

const useHome = () => {
  const getHomeTransactions = async () => {
    const params = `limit=10&page=1&search=`;
    const result = await orderServices.getOrders(params);
    return result.data;
  };

  const {
    data: dataTransactions,
    isLoading: isLoadingTransactions,
  } = useQuery({
    queryKey: ["HomeTransactions"],
    queryFn: getHomeTransactions,
  });

  const chartData = useMemo<HomeChartItem[]>(() => {
    if (!dataTransactions?.data) return []

    const groupedByDate = dataTransactions.data.reduce(
      (acc: Record<string, number>, transaction: HomeTransaction) => {
        if (!transaction.createdAt && !transaction.date) return acc

        const rawDate = transaction.createdAt ?? transaction.date!
        const date = new Date(rawDate).toLocaleDateString("id-ID", {
          day: "2-digit",
          month: "short",
        })

        acc[date] = (acc[date] || 0) + (transaction.total ?? 0)
        return acc
      },
      {}
    )

    return (Object.entries(groupedByDate) as [string, number][])
      .map(([date, value]) => ({
        date,
        value,
      }))

  }, [dataTransactions])


  const statusData = useMemo<HomeStatusItem[]>(() => {
    if (!dataTransactions?.data) return []

    const groupedByStatus = dataTransactions.data.reduce(
      (acc: Record<string, number>, transaction: HomeTransaction) => {
        const status = transaction.status ?? "pending"
        acc[status] = (acc[status] || 0) + (transaction.total ?? 0)
        return acc
      },
      {}
    )

    return (Object.entries(groupedByStatus) as [string, number][])
      .map(([status, value]) => ({
        status: status.charAt(0).toUpperCase() + status.slice(1),
        value,
      }))
  }, [dataTransactions])


  return {
    dataTransactions,
    isLoadingTransactions,
    chartData,
    statusData,
  };
};

export default useHome;

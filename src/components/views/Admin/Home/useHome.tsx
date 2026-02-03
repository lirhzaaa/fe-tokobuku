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
  // Query untuk table (10 data saja)
  const getHomeTransactions = async () => {
    const params = `limit=10&page=1&search=`;
    const result = await orderServices.getOrders(params);
    return result.data;
  };

  // Query untuk chart (ambil lebih banyak data)
  const getChartData = async () => {
    const params = `limit=100&page=1&search=`; // Ambil 100 transaksi untuk chart
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

  const {
    data: dataChart,
    isLoading: isLoadingChart,
  } = useQuery({
    queryKey: ["HomeChart"],
    queryFn: getChartData,
  });

  const chartData = useMemo<HomeChartItem[]>(() => {
    if (!dataChart?.data) return []

    const groupedByDate = dataChart.data.reduce(
      (acc: Record<string, number>, transaction: HomeTransaction) => {
        if (!transaction.createdAt && !transaction.date) return acc

        const rawDate = transaction.createdAt ?? transaction.date!
        const dateObj = new Date(rawDate)
        
        // Gunakan format ISO sebagai key untuk grouping (YYYY-MM-DD)
        const dateKey = dateObj.toISOString().split('T')[0]
        
        acc[dateKey] = (acc[dateKey] || 0) + (transaction.total ?? 0)
        return acc
      },
      {}
    )

    return (Object.entries(groupedByDate) as [string, number][])
      .map(([date, value]) => ({
        date,
        value,
      }))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()) // Urutkan berdasarkan tanggal

  }, [dataChart])

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
    isLoadingChart,
    chartData,
    statusData,
  };
};

export default useHome;
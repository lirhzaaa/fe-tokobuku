"use client"

import { Chip } from "@heroui/react"
import { Key, ReactNode, useCallback, useMemo, useState } from "react"
import { COLUMN_LISTS_HOME_TRANSACTION } from "./Home.constants"
import useHome from "./useHome"
import { convertIDR } from "@/src/utils/currency"
import DataTable from "@/src/components/ui/DataTable"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/src/components/ui/chart"

const Home = () => {
  const {
    dataTransactions,
    isLoadingTransactions,
    chartData,
  } = useHome()

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction]
      switch (columnKey) {
        case "total":
          return convertIDR(Number(cellValue))
        case "status":
          return (
            <Chip
              color={cellValue === "completed" ? "success" : "warning"}
              size="sm"
              variant="flat"
            >
              {cellValue as ReactNode}
            </Chip>
          )
        default:
          return cellValue as ReactNode
      }
    },
    []
  )

  const chartConfig: ChartConfig = {
    value: {
      label: "Transaction Value",
      color: "hsl(var(--chart-1))",
    },
  }

  const totalValue = useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData]
  )

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Transaction Chart</CardTitle>
          <CardDescription>
            Total transaksi: {convertIDR(totalValue)}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <ChartContainer
            config={chartConfig}
            className="aspect-auto h-[300px] w-full"
          >
            <BarChart
              data={chartData}
              margin={{ left: 12, right: 12 }}
            >
              <CartesianGrid vertical={false} />
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={8}
                minTickGap={32}
                tickFormatter={(value) => {
                  const date = new Date(value)
                  return date.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                  })
                }}
              />
              <ChartTooltip
                content={
                  <ChartTooltipContent
                    labelFormatter={(label) =>
                      new Date(label).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })
                    }
                  />
                }
              />
              <Bar dataKey="value" fill="var(--color-primary)" />
            </BarChart>
          </ChartContainer>
        </CardContent>
      </Card>

      <div className="mt-8">
        <h2 className="mb-4 text-xl font-semibold">Table Transactions</h2>
        <DataTable
          renderCell={renderCell}
          columns={COLUMN_LISTS_HOME_TRANSACTION}
          data={dataTransactions?.data || []}
          emptyContent="No transactions found"
          isLoading={isLoadingTransactions}
          totalPage={1}
          showTop={false}
          showBottom={false}
        />
      </div>
    </section>
  )
}

export default Home

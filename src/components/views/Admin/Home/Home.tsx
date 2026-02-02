"use client"

import { Chip } from "@heroui/react"
import { Key, ReactNode, useCallback } from "react"
import { COLUMN_LISTS_HOME_TRANSACTION } from "./Home.constants"
import useHome from "./useHome"
import { convertIDR } from "@/src/utils/currency"
import DataTable from "@/src/components/ui/DataTable"
import { BarChart, DonutChart } from "@tremor/react"
import type { CustomTooltipProps } from "@tremor/react"

const Home = () => {
  const {
    dataTransactions,
    isLoadingTransactions,
    chartData,
    statusData,
  } = useHome()

  const renderCell = useCallback(
    (transaction: Record<string, unknown>, columnKey: Key) => {
      const cellValue = transaction[columnKey as keyof typeof transaction]
      switch (columnKey) {
        case "total":
          return convertIDR(Number(cellValue))
        case "status":
          return (
            <Chip color={cellValue === "completed" ? "success" : "warning"} size="sm" variant="flat">
              {cellValue as ReactNode}
            </Chip>
          )
        default:
          return cellValue as ReactNode;
      }
    }, []
  )

  const valueFormatter = (number: number) => {
    return convertIDR(number)
  }

  const statusColors = statusData.map((item) => {
    const colorMap: Record<string, string> = {
      'Completed': '#648376',
      'Pending': '#94a89a',
      'Processing': '#7d9585',
      'Cancelled': '#b8c5bd',
    }
    return colorMap[item.status] || '#648376'
  })

  return (
    <section>
      <div className="mb-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-semibold">Transaction Chart</h3>
          <BarChart
            className="h-72"
            data={chartData}
            index="date"
            categories={["value"]}
            colors={["emerald"]}
            valueFormatter={valueFormatter}
            showLegend={false}
            showAnimation={true}
            yAxisWidth={80}
            customTooltip={(props: CustomTooltipProps) => {
              if (!props.active || !props.payload || !props.payload.length) return null

              const value = Number(props.payload[0]?.value ?? 0)

              return (
                <div className="rounded-lg border bg-white p-3 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <p className="text-sm font-medium">
                    {props.payload[0]?.payload?.date}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "#648376" }}>
                    {convertIDR(value)}
                  </p>
                </div>
              )
            }}
          />
          <style jsx>{`
            :global(.recharts-bar-rectangle) {
              fill: #648376 !important;
            }
          `}</style>
        </div>

        <div className="rounded-lg border bg-white p-6 shadow-sm dark:bg-gray-800 dark:border-gray-700">
          <h3 className="mb-4 text-lg font-semibold">Transaction Status</h3>
          <DonutChart
            className="h-72"
            data={statusData}
            category="value"
            index="status"
            valueFormatter={valueFormatter}
            colors={["emerald", "teal", "cyan", "sky"]}
            showAnimation={true}
            showLabel={true}
            customTooltip={(props: CustomTooltipProps) => {
              if (!props.active || !props.payload?.length) return null
              const value = Number(props.payload[0]?.value ?? 0)
              return (
                <div className="rounded-lg border bg-white p-3 shadow-lg dark:bg-gray-800 dark:border-gray-700">
                  <p className="text-sm font-medium">
                    {props.payload[0]?.payload?.date}
                  </p>
                  <p className="text-sm font-bold" style={{ color: "#648376" }}>
                    {convertIDR(value)}
                  </p>
                </div>
              )
            }}
          />
          <style jsx>{`
            :global(.recharts-pie-sector:nth-child(1)) {
              fill: #648376 !important;
            }
            :global(.recharts-pie-sector:nth-child(2)) {
              fill: #94a89a !important;
            }
            :global(.recharts-pie-sector:nth-child(3)) {
              fill: #7d9585 !important;
            }
            :global(.recharts-pie-sector:nth-child(4)) {
              fill: #b8c5bd !important;
            }
          `}</style>
        </div>
      </div>

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
"use client"

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts"

import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts - expanded with more data points for better visualization
const data = [
  { name: "Batch 1", rouge: 0.78, compression: 41.2, tokens: 720, similarity: 0.82 },
  { name: "Batch 2", rouge: 0.75, compression: 43.5, tokens: 680, similarity: 0.79 },
  { name: "Batch 3", rouge: 0.77, compression: 42.8, tokens: 700, similarity: 0.81 },
  { name: "Batch 4", rouge: 0.79, compression: 44.1, tokens: 650, similarity: 0.83 },
  { name: "Batch 5", rouge: 0.76, compression: 41.9, tokens: 710, similarity: 0.8 },
  { name: "Batch 6", rouge: 0.74, compression: 43.2, tokens: 690, similarity: 0.78 },
  { name: "Batch 7", rouge: 0.77, compression: 42.5, tokens: 705, similarity: 0.81 },
  { name: "Batch 8", rouge: 0.8, compression: 44.5, tokens: 640, similarity: 0.84 },
  { name: "Batch 9", rouge: 0.76, compression: 42.1, tokens: 695, similarity: 0.79 },
  { name: "Batch 10", rouge: 0.78, compression: 43.0, tokens: 675, similarity: 0.82 },
]

// Custom tooltip component to handle null/undefined safely
const CustomTooltip = ({ active, payload, dataKey, label }: any) => {
  if (!active || !payload || !payload.length) return null

  const data = payload[0]
  if (!data) return null

  return (
    <ChartTooltip>
      <ChartTooltipContent
        content={
          <div className="flex flex-col gap-0.5">
            <span className="text-sm font-bold">{data.payload?.name || "Unknown"}</span>
            <span className="text-xs">
              {label}: {data.value || "0"}
              {dataKey === "compression" ? "%" : ""}
            </span>
          </div>
        }
      />
    </ChartTooltip>
  )
}

export function DashboardCharts() {
  return (
    <Tabs defaultValue="rouge">
      <TabsList className="grid w-full grid-cols-4 h-9 bg-white p-1 rounded-lg dark:bg-hypernym-dark/50">
        <TabsTrigger
          value="rouge"
          className="h-7 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
        >
          ROUGE
        </TabsTrigger>
        <TabsTrigger
          value="compression"
          className="h-7 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
        >
          Compression %
        </TabsTrigger>
        <TabsTrigger
          value="tokens"
          className="h-7 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
        >
          Token Savings
        </TabsTrigger>
        <TabsTrigger
          value="similarity"
          className="h-7 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
        >
          Similarity
        </TabsTrigger>
      </TabsList>

      <TabsContent value="rouge" className="mt-3 focus-visible:outline-none focus-visible:ring-0">
        <Card className="p-4 hypernym-card">
          <ChartContainer className="w-full h-full" title="ROUGE Score by Batch">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  height={40}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={[0.7, 0.85]}
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  tickCount={4}
                  width={40}
                />
                <Tooltip content={(props) => <CustomTooltip {...props} label="ROUGE" />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />
                <Line
                  name="ROUGE Score"
                  type="monotone"
                  dataKey="rouge"
                  stroke="#9747FF"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#9747FF" }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#9747FF" }}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </TabsContent>

      <TabsContent value="compression" className="mt-3 focus-visible:outline-none focus-visible:ring-0">
        <Card className="p-4 hypernym-card">
          <ChartContainer className="w-full h-full" title="Compression % by Batch">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  height={40}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={[40, 45]}
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  tickCount={6}
                  width={40}
                />
                <Tooltip content={(props) => <CustomTooltip {...props} label="Compression" dataKey="compression" />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />
                <Bar
                  name="Compression Rate"
                  dataKey="compression"
                  fill="#47FFAE"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </TabsContent>

      <TabsContent value="tokens" className="mt-3 focus-visible:outline-none focus-visible:ring-0">
        <Card className="p-4 hypernym-card">
          <ChartContainer className="w-full h-full" title="Token Savings by Batch">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  height={40}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={[600, 750]}
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  tickCount={6}
                  width={40}
                />
                <Tooltip content={(props) => <CustomTooltip {...props} label="Tokens" />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />
                <Bar
                  name="Token Savings"
                  dataKey="tokens"
                  fill="#4AADFF"
                  radius={[4, 4, 0, 0]}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </TabsContent>

      <TabsContent value="similarity" className="mt-3 focus-visible:outline-none focus-visible:ring-0">
        <Card className="p-4 hypernym-card">
          <ChartContainer className="w-full h-full" title="Similarity Score by Batch">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={data}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis
                  dataKey="name"
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  height={40}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  domain={[0.75, 0.85]}
                  stroke="#94a3b8"
                  tick={{ fontSize: 12 }}
                  tickLine={{ stroke: "#94a3b8" }}
                  axisLine={{ stroke: "#94a3b8" }}
                  tickCount={5}
                  width={40}
                />
                <Tooltip content={(props) => <CustomTooltip {...props} label="Similarity" />} />
                <Legend
                  verticalAlign="top"
                  height={36}
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ paddingBottom: "10px" }}
                />
                <Line
                  name="Similarity Score"
                  type="monotone"
                  dataKey="similarity"
                  stroke="#FF47B3"
                  strokeWidth={3}
                  dot={{ r: 4, strokeWidth: 2, fill: "#FF47B3" }}
                  activeDot={{ r: 6, strokeWidth: 0, fill: "#FF47B3" }}
                  isAnimationActive={true}
                  animationDuration={1000}
                  animationEasing="ease-in-out"
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </Card>
      </TabsContent>
    </Tabs>
  )
}

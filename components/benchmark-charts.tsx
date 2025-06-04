"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  ScatterChart,
  Scatter,
  ReferenceLine,
} from "recharts"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Simplified mock data with guaranteed valid numbers
const tokenSavingsData = [
  {
    category: "Token Reduction",
    value: 5,
  },
]

const rougeComparisonData = [
  {
    metric: "ROUGE-1",
    standardRAG: 0.33,
    hypernymRAG: 0.32,
  },
  {
    metric: "ROUGE-2",
    standardRAG: 0.11,
    hypernymRAG: 0.09,
  },
  {
    metric: "ROUGE-L",
    standardRAG: 0.19,
    hypernymRAG: 0.17,
  },
]

const semanticSimilarityData = [
  {
    name: "Standard RAG",
    x: 0.49,
    y: 0.12,
  },
  {
    name: "Hypernym RAG",
    x: 0.42,
    y: 0.115,
  },
]

// Simple tooltip components
const SimpleTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow">
        <p className="text-sm">{label}</p>
        {payload.map((entry: any, index: number) => (
          <p key={index} className="text-sm" style={{ color: entry.color }}>
            {`${entry.name}: ${entry.value}`}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export function BenchmarkCharts() {
  const [activeTab, setActiveTab] = useState("token-savings")

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3 h-10 bg-background/95 p-1 rounded-lg">
          <TabsTrigger
            value="token-savings"
            className="h-8 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
          >
            Token Savings
          </TabsTrigger>
          <TabsTrigger
            value="rouge-scores"
            className="h-8 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
          >
            ROUGE Scores
          </TabsTrigger>
          <TabsTrigger
            value="semantic-similarity"
            className="h-8 rounded-md data-[state=active]:bg-hypernym-purple data-[state=active]:text-white"
          >
            Semantic Similarity
          </TabsTrigger>
        </TabsList>

        {/* Token Savings Chart - HORIZONTAL */}
        <TabsContent value="token-savings" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <Card className="hypernym-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">Token Savings</CardTitle>
              <p className="text-sm text-muted-foreground text-center">
                Percentage reduction in tokens used vs. standard RAG
              </p>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  layout="horizontal"
                  data={tokenSavingsData}
                  margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" domain={[0, 100]} tick={{ fontSize: 12 }} />
                  <YAxis type="category" dataKey="category" tick={false} axisLine={false} width={0} />
                  <Tooltip content={<SimpleTooltip />} />
                  <Bar dataKey="value" fill="#F5A623" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <span className="text-2xl font-bold text-[#F5A623]">5.0%</span>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* ROUGE Scores Comparison */}
        <TabsContent value="rouge-scores" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <Card className="hypernym-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">ROUGE Scores Comparison</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={rougeComparisonData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="metric" tick={{ fontSize: 12 }} />
                  <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} />
                  <Tooltip content={<SimpleTooltip />} />
                  <Legend />
                  <Bar dataKey="standardRAG" fill="#4A90E2" name="Standard RAG" />
                  <Bar dataKey="hypernymRAG" fill="#F5A623" name="Hypernym RAG" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Semantic Similarity Metrics */}
        <TabsContent value="semantic-similarity" className="mt-6 focus-visible:outline-none focus-visible:ring-0">
          <Card className="hypernym-card">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-center">Semantic Similarity Metrics</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <ScatterChart margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" dataKey="x" domain={[0, 1]} tick={{ fontSize: 12 }} name="Cosine Similarity" />
                  <YAxis type="number" dataKey="y" domain={[0, 1]} tick={{ fontSize: 12 }} name="Jaccard Similarity" />
                  <Tooltip
                    cursor={{ strokeDasharray: "3 3" }}
                    content={({ active, payload }) => {
                      if (active && payload && payload.length) {
                        const data = payload[0].payload
                        return (
                          <div className="bg-white dark:bg-gray-800 p-2 border rounded shadow">
                            <p className="text-sm font-medium">{data.name}</p>
                            <p className="text-sm">Cosine: {data.x}</p>
                            <p className="text-sm">Jaccard: {data.y}</p>
                          </div>
                        )
                      }
                      return null
                    }}
                  />

                  {/* Threshold lines */}
                  <ReferenceLine x={0.7} stroke="#FF6B6B" strokeDasharray="5 5" />
                  <ReferenceLine y={0.7} stroke="#FF6B6B" strokeDasharray="5 5" />

                  {/* Diagonal line */}
                  <ReferenceLine
                    segment={[
                      { x: 0, y: 0 },
                      { x: 1, y: 1 },
                    ]}
                    stroke="#999"
                    strokeDasharray="3 3"
                  />

                  <Scatter data={semanticSimilarityData} fill="#4A90E2" />
                </ScatterChart>
              </ResponsiveContainer>

              {/* Legend */}
              <div className="mt-4 flex justify-center space-x-6">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#4A90E2]" />
                  <span>Standard RAG</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded-full bg-[#F5A623]" />
                  <span>Hypernym RAG</span>
                </div>
              </div>
              <div className="mt-2 text-center text-xs text-muted-foreground">Threshold: 0.70</div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}

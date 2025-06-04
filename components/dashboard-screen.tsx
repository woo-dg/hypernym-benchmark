"use client"

import { useState } from "react"
import { Download, FileDown, RefreshCw, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useToast } from "@/hooks/use-toast"
import { JobSidebar } from "@/components/job-sidebar"
import { DashboardCharts } from "@/components/dashboard-charts"

// Fallback component for error boundary
function ErrorFallback({ error, resetErrorBoundary }: { error: Error; resetErrorBoundary: () => void }) {
  return (
    <Card className="hypernym-card">
      <CardHeader>
        <CardTitle className="text-hypernym-pink">Something went wrong</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          There was an error loading this component. Please try again or contact support if the issue persists.
        </p>
        <Button
          onClick={resetErrorBoundary}
          variant="outline"
          className="text-hypernym-purple border-hypernym-purple/20"
        >
          Try again
        </Button>
      </CardContent>
    </Card>
  )
}

export function DashboardScreen() {
  const [selectedJobId, setSelectedJobId] = useState<string | null>("job-3") // Default to a completed job
  const { toast } = useToast()

  const handleDownload = (format: string) => {
    toast({
      title: `Downloading ${format.toUpperCase()} report`,
      description: "Your report is being generated and will download shortly.",
    })
  }

  const handleJobSelect = (jobId: string) => {
    setSelectedJobId(jobId)
  }

  const selectedJobName = selectedJobId
    ? selectedJobId === "job-1"
      ? "Product Catalog Benchmark"
      : selectedJobId === "job-2"
        ? "Service Descriptions Test"
        : selectedJobId === "job-3"
          ? "Feature Analysis Run"
          : selectedJobId === "job-4"
            ? "Mixed Category Benchmark"
            : "Large Scale Test"
    : null

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-background">
      {/* Job Sidebar */}
      <JobSidebar selectedJobId={selectedJobId} onJobSelect={handleJobSelect} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="bg-background border-b border-border p-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold tracking-tight hypernym-gradient-text">
                {selectedJobName ? `Results: ${selectedJobName}` : "Benchmark Dashboard"}
              </h1>
              <p className="text-sm text-muted-foreground">
                {selectedJobName
                  ? "Detailed analysis and performance metrics for this benchmark run"
                  : "Select a benchmark job from the sidebar to view detailed results"}
              </p>
            </div>

            {selectedJobId && (
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-hypernym-purple/20 text-hypernym-purple hover:bg-hypernym-purple/10"
                >
                  <RefreshCw className="h-4 w-4" />
                  Refresh
                </Button>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="gap-1.5 border-hypernym-pink/20 text-hypernym-pink hover:bg-hypernym-pink/10"
                    >
                      <Download className="h-4 w-4" />
                      Export
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => handleDownload("csv")}>
                      <FileDown className="mr-2 h-4 w-4" />
                      <span>CSV Report</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload("pdf")}>
                      <FileDown className="mr-2 h-4 w-4" />
                      <span>PDF Report</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleDownload("json")}>
                      <FileDown className="mr-2 h-4 w-4" />
                      <span>JSON Data</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <Button
                  variant="outline"
                  size="sm"
                  className="gap-1.5 border-hypernym-blue/20 text-hypernym-blue hover:bg-hypernym-blue/10"
                >
                  <Settings className="h-4 w-4" />
                  Configure
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto p-6">
          {selectedJobId ? (
            <DashboardCharts />
          ) : (
            <div className="flex items-center justify-center h-full">
              <Card className="w-96 hypernym-card">
                <CardHeader className="text-center">
                  <CardTitle className="text-xl">No Job Selected</CardTitle>
                  <CardDescription>
                    Choose a benchmark job from the sidebar to view detailed results and analytics.
                  </CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-hypernym-purple/10 rounded-full flex items-center justify-center">
                    <Settings className="h-8 w-8 text-hypernym-purple" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select from in-progress or completed benchmark runs to explore performance metrics, token savings,
                    and semantic similarity analysis.
                  </p>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

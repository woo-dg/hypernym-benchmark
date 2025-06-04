"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ChevronRight, Code, FileJson, Save, Play, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

export function ConfigScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [activeTab, setActiveTab] = useState("generated")
  const router = useRouter()
  const { toast } = useToast()

  // Mock generated config
  const generatedConfig = {
    name: "Hypernym Benchmark",
    version: "1.0.0",
    description: "Configuration for hypernym benchmarking",
    models: [
      {
        name: "gpt-4",
        provider: "openai",
        parameters: {
          temperature: 0.7,
          max_tokens: 100,
        },
      },
      {
        name: "claude-3",
        provider: "anthropic",
        parameters: {
          temperature: 0.5,
          max_tokens: 100,
        },
      },
    ],
    metrics: ["rouge", "compression_ratio", "token_savings", "similarity_score"],
    categories: ["Product", "Service", "Feature"],
    batch_size: 10,
    output_format: "json",
  }

  const [config, setConfig] = useState(JSON.stringify(generatedConfig, null, 2))

  const handleSaveConfig = () => {
    try {
      // Validate JSON
      JSON.parse(config)

      toast({
        title: "Configuration saved",
        description: "Your benchmark configuration has been saved successfully.",
      })
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your configuration for syntax errors.",
        variant: "destructive",
      })
    }
  }

  const handleRunBenchmark = () => {
    try {
      // Validate JSON
      JSON.parse(config)

      toast({
        title: "Benchmark started",
        description: "Your benchmark is now running. Redirecting to dashboard...",
      })

      // Redirect to dashboard after a short delay
      setTimeout(() => {
        router.push("/dashboard")
      }, 1500)
    } catch (error) {
      toast({
        title: "Invalid JSON",
        description: "Please check your configuration for syntax errors.",
        variant: "destructive",
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold tracking-tight">Configuration</h1>
          <p className="text-sm text-muted-foreground">Configure your hypernym benchmark settings</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={handleSaveConfig} className="gap-1.5">
            <Save className="h-4 w-4" />
            Save Config
          </Button>
          <Button size="sm" onClick={handleRunBenchmark} className="gap-1.5">
            <Play className="h-4 w-4" />
            Run Benchmark
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
        {sidebarOpen && (
          <div className="md:col-span-1">
            <Card className="overflow-hidden border-none shadow-md">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 bg-gradient-to-r from-slate-50 to-white pb-2 dark:from-slate-900 dark:to-slate-800">
                <CardTitle className="text-sm font-medium">Catalog Structure</CardTitle>
                <Button variant="ghost" size="icon" className="h-8 w-8 lg:hidden" onClick={() => setSidebarOpen(false)}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  <div className="border-b p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                    <h3 className="mb-3 text-sm font-medium">Categories</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-blue-500" />
                        <span className="text-xs">Product (42)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-green-500" />
                        <span className="text-xs">Service (36)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
                        <span className="text-xs">Feature (50)</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-b p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                    <h3 className="mb-3 text-sm font-medium">Models</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-purple-500" />
                        <span className="text-xs">GPT-4</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-pink-500" />
                        <span className="text-xs">Claude-3</span>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 transition-colors hover:bg-slate-50 dark:hover:bg-slate-900">
                    <h3 className="mb-3 text-sm font-medium">Metrics</h3>
                    <div className="space-y-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-cyan-500" />
                        <span className="text-xs">ROUGE</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        <span className="text-xs">Compression %</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                        <span className="text-xs">Token Savings</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="h-2.5 w-2.5 rounded-full bg-rose-500" />
                        <span className="text-xs">Similarity Score</span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        <div className={cn("md:col-span-3", !sidebarOpen && "md:col-span-4")}>
          <Card className="h-full overflow-hidden border-none shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 border-b bg-gradient-to-r from-slate-50 to-white pb-2 dark:from-slate-900 dark:to-slate-800">
              <div className="flex items-center gap-2">
                <CardTitle>Configuration Editor</CardTitle>
                {!sidebarOpen && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hidden lg:flex"
                    onClick={() => setSidebarOpen(true)}
                  >
                    <ChevronRight className="h-4 w-4 rotate-180" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <div className="border-b">
                  <TabsList className="mx-4 my-2 h-9 w-auto bg-transparent p-0">
                    <TabsTrigger
                      value="generated"
                      className="flex h-9 items-center gap-1.5 rounded-md border-b-2 border-transparent bg-transparent px-3 py-1.5 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-slate-50"
                    >
                      <FileJson className="h-4 w-4" />
                      <span>Generated Config</span>
                    </TabsTrigger>
                    <TabsTrigger
                      value="manual"
                      className="flex h-9 items-center gap-1.5 rounded-md border-b-2 border-transparent bg-transparent px-3 py-1.5 data-[state=active]:border-slate-900 data-[state=active]:bg-transparent data-[state=active]:shadow-none dark:data-[state=active]:border-slate-50"
                    >
                      <Code className="h-4 w-4" />
                      <span>Edit Manually</span>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <TabsContent value="generated" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="rounded-md p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Sparkles className="h-4 w-4 text-amber-500" />
                      <span className="text-sm font-medium">Auto-generated configuration</span>
                    </div>
                    <pre className="rounded-lg bg-slate-50 p-4 text-sm font-mono overflow-auto max-h-[60vh] shadow-inner dark:bg-slate-900">
                      {JSON.stringify(generatedConfig, null, 2)}
                    </pre>
                  </div>
                </TabsContent>
                <TabsContent value="manual" className="m-0 focus-visible:outline-none focus-visible:ring-0">
                  <div className="p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Code className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium">Edit configuration manually</span>
                    </div>
                    <textarea
                      className="w-full h-[60vh] p-4 font-mono text-sm rounded-lg bg-slate-50 border-0 resize-none focus:outline-none focus:ring-2 focus:ring-slate-500 shadow-inner dark:bg-slate-900"
                      value={config}
                      onChange={(e) => setConfig(e.target.value)}
                      spellCheck="false"
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

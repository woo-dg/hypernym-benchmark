"use client"

import type React from "react"
import { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { FileUp, X, CheckCircle2, FileText, Upload, Sparkles, FileJson, ArrowRight, Loader2 } from "lucide-react"
import { motion } from "framer-motion"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/hooks/use-toast"

export function UploadScreen() {
  const [isDragging, setIsDragging] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [isUploading, setIsUploading] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [previewData, setPreviewData] = useState<any>(null)
  const { toast } = useToast()
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }

  const handleDragLeave = () => {
    setIsDragging(false)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileUpload(e.target.files[0])
    }
  }

  const handleFileUpload = (file: File) => {
    const validTypes = [
      "text/csv",
      "application/pdf",
      "text/plain",
      "application/vnd.ms-excel",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ]

    if (!validTypes.includes(file.type)) {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV, PDF, or text file.",
        variant: "destructive",
      })
      return
    }

    setUploadedFile(file)
    setIsUploading(true)

    // Simulate upload progress
    let progress = 0
    const interval = setInterval(() => {
      progress += 5
      setUploadProgress(progress)

      if (progress >= 100) {
        clearInterval(interval)
        setIsUploading(false)

        // Mock preview data
        setPreviewData({
          fileName: file.name,
          fileSize: (file.size / 1024).toFixed(2) + " KB",
          entries: 128,
          categories: ["Product", "Service", "Feature"],
          sampleEntries: [
            { id: 1, name: "Cloud Storage Solution", category: "Product" },
            { id: 2, name: "API Integration", category: "Service" },
            { id: 3, name: "Real-time Analytics", category: "Feature" },
          ],
        })

        toast({
          title: "Upload complete",
          description: "Your file has been processed successfully.",
        })
      }
    }, 100)
  }

  const handleRemoveFile = () => {
    setUploadedFile(null)
    setPreviewData(null)
    setUploadProgress(0)
  }

  const handleGenerateConfig = () => {
    router.push("/configure")
  }

  const handleEditExistingConfig = () => {
    router.push("/configure")
  }

  return (
    <div className="flex flex-col items-center justify-center py-10 px-4">
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-2 hypernym-gradient-text">Hypernym Benchmarking</h1>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Perfect semantic compression for AI systems that scale. Upload your catalog to begin benchmarking.
          </p>
        </div>

        {!previewData ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full max-w-xl mx-auto"
          >
            <Card className="hypernym-card">
              <CardHeader className="text-center pb-0">
                <div className="mx-auto mb-4 hypernym-icon-container hypernym-icon-purple">
                  <Upload className="h-6 w-6" />
                  <div className="absolute inset-0 bg-hypernym-purple/10 rounded-full animate-pulse-subtle"></div>
                </div>
                <CardTitle className="text-xl">Upload Your Catalog</CardTitle>
              </CardHeader>
              <CardContent className="pt-4 pb-6 px-6">
                <div
                  className={`hypernym-upload-zone h-64 ${isDragging ? "dragging" : ""}`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <div className="flex flex-col items-center justify-center p-6 text-center">
                    <div className="mb-4 relative">
                      <div className="absolute -top-3 -right-3 w-6 h-6 rounded-full bg-hypernym-blue animate-float"></div>
                      <div
                        className="absolute -bottom-2 -left-3 w-4 h-4 rounded-full bg-hypernym-pink animate-float"
                        style={{ animationDelay: "0.5s" }}
                      ></div>
                      <FileUp className="h-10 w-10 text-hypernym-purple" />
                    </div>
                    <p className="mb-2 text-base font-medium">
                      <span className="font-semibold">Click to upload</span> or drag and drop
                    </p>
                    <p className="text-sm text-muted-foreground">CSV, PDF, or TXT (Max size: 10MB)</p>
                  </div>
                  <input
                    ref={fileInputRef}
                    id="file-upload"
                    type="file"
                    className="hidden"
                    accept=".csv,.pdf,.txt"
                    onChange={handleFileChange}
                  />
                </div>

                {isUploading && (
                  <div className="mt-6 animate-fade-in">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-hypernym-purple" />
                        <span className="font-medium">Processing {uploadedFile?.name}</span>
                      </div>
                      <span className="text-hypernym-purple font-medium">{uploadProgress}%</span>
                    </div>
                    <Progress
                      value={uploadProgress}
                      className="h-2 bg-hypernym-purple/20"
                      indicatorClassName="bg-hypernym-gradient"
                    />
                  </div>
                )}
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 w-full">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
              <Card className="hypernym-card h-full">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="hypernym-icon-container hypernym-icon-green">
                        <CheckCircle2 className="h-5 w-5" />
                      </div>
                      <CardTitle>Catalog Uploaded</CardTitle>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={handleRemoveFile}
                      className="h-8 w-8 rounded-full hover:bg-hypernym-pink/10 hover:text-hypernym-pink"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3 p-3 bg-hypernym-blue/5 rounded-lg">
                      <div className="hypernym-icon-container hypernym-icon-blue">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{previewData.fileName}</p>
                        <p className="text-xs text-muted-foreground">
                          {previewData.fileSize} • {previewData.entries} entries
                        </p>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-2">Categories</p>
                      <div className="flex flex-wrap gap-2">
                        {previewData.categories.map((category: string, index: number) => {
                          const colors = [
                            "bg-hypernym-blue/10 text-hypernym-blue",
                            "bg-hypernym-purple/10 text-hypernym-purple",
                            "bg-hypernym-pink/10 text-hypernym-pink",
                          ]
                          return (
                            <div
                              key={category}
                              className={`rounded-full px-2.5 py-1 text-xs font-medium ${colors[index % colors.length]}`}
                            >
                              {category}
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <Card className="hypernym-card h-full">
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="hypernym-icon-container hypernym-icon-purple">
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <CardTitle>Sample Entries</CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="space-y-2">
                    {previewData.sampleEntries.map((entry: any, index: number) => {
                      const colors = ["border-hypernym-blue", "border-hypernym-purple", "border-hypernym-pink"]
                      return (
                        <div
                          key={entry.id}
                          className={`p-3 rounded-lg border ${colors[index % colors.length]} bg-white dark:bg-hypernym-dark/30 transition-all hover:shadow-md`}
                        >
                          <div className="flex justify-between items-center">
                            <span className="text-sm font-medium">{entry.name}</span>
                            <span
                              className={`text-xs rounded-full px-2 py-0.5 ${
                                entry.category === "Product"
                                  ? "bg-hypernym-blue/10 text-hypernym-blue"
                                  : entry.category === "Service"
                                    ? "bg-hypernym-purple/10 text-hypernym-purple"
                                    : "bg-hypernym-pink/10 text-hypernym-pink"
                              }`}
                            >
                              {entry.category}
                            </span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between gap-3 pt-2">
                  <Button
                    variant="default"
                    className="flex-1 h-10 bg-hypernym-gradient hover:opacity-90 transition-opacity"
                    onClick={handleGenerateConfig}
                  >
                    <div className="flex items-center gap-2">
                      <FileJson className="h-4 w-4" />
                      <span>Generate Config</span>
                    </div>
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 h-10 border-hypernym-purple/20 text-hypernym-purple hover:bg-hypernym-purple/10"
                    onClick={handleEditExistingConfig}
                  >
                    <div className="flex items-center gap-2">
                      <ArrowRight className="h-4 w-4" />
                      <span>Use Existing</span>
                    </div>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  )
}

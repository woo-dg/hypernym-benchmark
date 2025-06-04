"use client"
import { Clock, CheckCircle2, Play, BarChart3, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface BenchmarkJob {
  id: string
  name: string
  status: "in-progress" | "completed"
  progress?: number
  startTime: string
  endTime?: string
  model: string
  samples: number
}

const mockJobs: BenchmarkJob[] = [
  {
    id: "job-1",
    name: "Product Catalog Benchmark",
    status: "in-progress",
    progress: 65,
    startTime: "2024-01-15 10:30",
    model: "GPT-4",
    samples: 128,
  },
  {
    id: "job-2",
    name: "Service Descriptions Test",
    status: "in-progress",
    progress: 23,
    startTime: "2024-01-15 11:45",
    model: "Claude-3",
    samples: 96,
  },
  {
    id: "job-3",
    name: "Feature Analysis Run",
    status: "completed",
    startTime: "2024-01-14 14:20",
    endTime: "2024-01-14 16:45",
    model: "GPT-4",
    samples: 200,
  },
  {
    id: "job-4",
    name: "Mixed Category Benchmark",
    status: "completed",
    startTime: "2024-01-14 09:15",
    endTime: "2024-01-14 11:30",
    model: "Claude-3",
    samples: 150,
  },
  {
    id: "job-5",
    name: "Large Scale Test",
    status: "completed",
    startTime: "2024-01-13 16:00",
    endTime: "2024-01-13 18:45",
    model: "GPT-4",
    samples: 500,
  },
]

interface JobSidebarProps {
  selectedJobId: string | null
  onJobSelect: (jobId: string) => void
}

export function JobSidebar({ selectedJobId, onJobSelect }: JobSidebarProps) {
  const inProgressJobs = mockJobs.filter((job) => job.status === "in-progress")
  const completedJobs = mockJobs.filter((job) => job.status === "completed")

  const JobItem = ({ job }: { job: BenchmarkJob }) => (
    <div
      className={cn(
        "p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:shadow-md",
        selectedJobId === job.id
          ? "border-hypernym-purple bg-hypernym-purple/10 shadow-md"
          : "border-gray-200 bg-white dark:bg-hypernym-dark/50 dark:border-gray-800 hover:border-hypernym-blue/50 dark:hover:border-hypernym-blue/50",
      )}
      onClick={() => onJobSelect(job.id)}
    >
      <div className="flex items-start justify-between mb-2">
        <h4 className="text-sm font-medium line-clamp-2">{job.name}</h4>
        {job.status === "in-progress" ? (
          <Clock className="h-4 w-4 text-hypernym-blue flex-shrink-0 ml-2" />
        ) : (
          <CheckCircle2 className="h-4 w-4 text-hypernym-green flex-shrink-0 ml-2" />
        )}
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>{job.model}</span>
          <span>{job.samples} samples</span>
        </div>

        {job.status === "in-progress" && job.progress && (
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
            <div
              className="bg-hypernym-blue h-1.5 rounded-full transition-all duration-300"
              style={{ width: `${job.progress}%` }}
            />
          </div>
        )}

        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Calendar className="h-3 w-3" />
          <span>{job.startTime}</span>
        </div>

        {job.status === "in-progress" && job.progress && (
          <Badge variant="outline" className="text-xs border-hypernym-blue/20 text-hypernym-blue">
            {job.progress}% complete
          </Badge>
        )}
      </div>
    </div>
  )

  return (
    <div className="w-80 h-full bg-background border-r border-border flex flex-col">
      <div className="p-4 border-b border-border bg-background/95">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-hypernym-purple" />
          Benchmark Jobs
        </h2>
      </div>

      <div className="flex-1 overflow-auto p-4 space-y-6">
        {/* In Progress Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <Play className="h-4 w-4 text-hypernym-blue" />
            <h3 className="text-sm font-medium">In Progress</h3>
            <Badge variant="secondary" className="text-xs">
              {inProgressJobs.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {inProgressJobs.length > 0 ? (
              inProgressJobs.map((job) => <JobItem key={job.id} job={job} />)
            ) : (
              <div className="text-sm text-muted-foreground text-center py-4">No jobs in progress</div>
            )}
          </div>
        </div>

        {/* Completed Section */}
        <div>
          <div className="flex items-center gap-2 mb-3">
            <CheckCircle2 className="h-4 w-4 text-hypernym-green" />
            <h3 className="text-sm font-medium">Completed</h3>
            <Badge variant="secondary" className="text-xs">
              {completedJobs.length}
            </Badge>
          </div>
          <div className="space-y-2">
            {completedJobs.map((job) => (
              <JobItem key={job.id} job={job} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

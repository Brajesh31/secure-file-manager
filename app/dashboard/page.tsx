"use client"

import { useEffect, useState, useMemo, useCallback } from "react"
import { FileList } from "@/components/file-list"
import { FileGrid } from "@/components/file-grid"
import { ViewToggle } from "@/components/view-toggle"
import { mockFiles } from "@/lib/mock-data"
import type { FileType } from "@/lib/types"
import { ActivityIcon, Bell, ChevronLeft, ChevronRight, Clock, FileText, ImageIcon, Music, Search, Video, X } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { RecentActivity } from "@/components/recent-activity"
import { FolderManagement } from "@/components/folder-management"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

// Define QuickAccessCard outside of main component for better performance
function QuickAccessCard({ file, index }: { file: FileType; index: number }) {
  const getFileTypeClass = () => {
    switch (file.type) {
      case "pdf":
        return "file-card-pdf"
      case "doc":
        return "file-card-doc"
      case "image":
        return "file-card-image"
      case "zip":
        return "file-card-zip"
      default:
        return "file-card-default"
    }
  }

  const getFileIcon = () => {
    switch (file.type) {
      case "pdf":
        return <FileText className="h-10 w-10 text-red-500" />
      case "doc":
        return <FileText className="h-10 w-10 text-blue-500" />
      case "image":
        return <ImageIcon className="h-10 w-10 text-cyan-500" />
      default:
        return <FileText className="h-10 w-10 text-slate-500" />
    }
  }

  return (
    <Card 
      key={file.id}
      // Removed animation-related classes that cause lag
      className={`card-3d relative ${getFileTypeClass()}`}
    >
      <div className="p-2">
        <div className="h-12 w-12 rounded-lg glass-effect flex items-center justify-center">
          {getFileIcon()}
        </div>
        <div className="text-sm font-medium mt-2 truncate">{file.name}</div>
      </div>
    </Card>
  )
}

export default function Dashboard() {
  const [viewMode, setViewMode] = useState<"list" | "grid">("grid")
  const [userRole, setUserRole] = useState<string | null>(null)
  const [files, setFiles] = useState<FileType[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("files")
  const [showActivity, setShowActivity] = useState(false)

  // Load data only once when component mounts
  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    // Filter files based on user role
    if (role === "admin") {
      setFiles(mockFiles)
    } else {
      // For regular users, only show files assigned to them
      setFiles(mockFiles.filter((file) => file.assignedTo.includes("user")))
    }
  }, [])

  // Memoize the toggle function to prevent unnecessary renders
  const toggleActivity = useCallback(() => {
    setShowActivity(prev => !prev)
  }, [])

  // Memoize filtered files to prevent recalculating on every render
  const filteredFiles = useMemo(() => {
    return files.filter((file) => 
      file.name.toLowerCase().includes(searchQuery.toLowerCase())
    )
  }, [files, searchQuery])

  // Memoize category cards to prevent recalculating on every render
  const categoryCards = useMemo(() => [
    {
      name: "Documents",
      icon: <FileText className="h-6 w-6 text-blue-500" />,
      count: files.filter((f) => f.type === "pdf" || f.type === "doc").length,
      className: "category-card-documents"
    },
    {
      name: "Images",
      icon: <ImageIcon className="h-6 w-6 text-cyan-500" />,
      count: files.filter((f) => f.type === "image").length,
      className: "category-card-images"
    },
    {
      name: "Videos",
      icon: <Video className="h-6 w-6 text-green-500" />,
      count: 0,
      className: "category-card-videos"
    },
    {
      name: "Audio",
      icon: <Music className="h-6 w-6 text-red-500" />,
      count: 0,
      className: "category-card-audio"
    },
    {
      name: "Recent",
      icon: <Clock className="h-6 w-6 text-purple-500" />,
      count: files.length,
      className: "category-card-other"
    },
  ], [files])

  // Memoize quick access files to prevent recalculating on every render
  const quickAccessFiles = useMemo(() => files.slice(0, 6), [files])

  return (
    <div className="flex h-full relative">
      <div className={cn(
        "flex-1 overflow-y-auto p-6 transition-all duration-300",
        showActivity && "pr-[320px] lg:pr-6"
      )}>
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <h1 className="text-2xl font-bold">{userRole === "admin" ? "Admin Dashboard" : "My Files"}</h1>

            <div className="flex items-center gap-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search files..."
                  className="pl-8 rounded-xl"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <ViewToggle viewMode={viewMode} setViewMode={setViewMode} />
              <Button
                variant="outline"
                size="sm"
                className="h-9 rounded-xl border-2 border-primary/30 hover:bg-primary/10 lg:hidden flex items-center gap-2"
                onClick={toggleActivity}
              >
                {showActivity ? (
                  <>
                    <X className="h-4 w-4" />
                    <span>Close</span>
                  </>
                ) : (
                  <>
                    <Bell className="h-4 w-4" />
                    <span>Activity</span>
                  </>
                )}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
            {categoryCards.map((category) => (
              <Card 
                key={category.name} 
                // Removed animation classes causing lag
                className={`card-3d ${category.className}`}
              >
                <div className="flex items-center justify-between p-4">
                  <div className="h-12 w-12 rounded-full glass-effect flex items-center justify-center shadow-sm">
                    {category.icon}
                  </div>
                  <span className="text-2xl font-bold">{category.count}</span>
                </div>
                <div className="px-4 pb-4">
                  <h3 className="font-medium">{category.name}</h3>
                </div>
              </Card>
            ))}
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList>
              <TabsTrigger value="files">Files</TabsTrigger>
              <TabsTrigger value="folders">Folders</TabsTrigger>
            </TabsList>
            
            <TabsContent value="files" className="mt-6">
              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Quick Access</h2>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
                {quickAccessFiles.map((file, index) => (
                  <QuickAccessCard 
                    key={file.id} 
                    file={file} 
                    index={index}
                  />
                ))}
              </div>

              <div className="mb-6 flex items-center justify-between">
                <h2 className="text-xl font-semibold">All Files</h2>
              </div>

              {viewMode === "list" ? (
                <FileList files={filteredFiles} userRole={userRole} />
              ) : (
                <FileGrid files={filteredFiles} userRole={userRole} />
              )}
            </TabsContent>
            
            <TabsContent value="folders" className="mt-6">
              <FolderManagement userRole={userRole} />
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Activity Panel - Hidden on mobile by default, toggled with the button */}
      <div className={cn(
        "fixed top-0 right-0 h-full w-80 border-l bg-card p-6 transition-transform duration-300 z-10",
        showActivity ? "translate-x-0" : "translate-x-full lg:translate-x-0 lg:static lg:hidden"
      )}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <ActivityIcon className="h-5 w-5 text-primary" />
            Activity
          </h2>
          
          <Button
            variant="outline"
            size="sm"
            className="rounded-xl border-2 border-primary/30 h-9 lg:hidden"
            onClick={toggleActivity}
          >
            <X className="h-4 w-4 mr-1" />
            Close
          </Button>
        </div>
        <RecentActivity />
      </div>

      {/* Desktop Activity Toggle */}
      <Button 
        variant="outline" 
        size="sm" 
        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 h-12 w-8 rounded-l-xl border-2 border-r-0 border-primary/30 shadow-sm bg-card hover:bg-primary/10 z-10 items-center justify-center"
        onClick={toggleActivity}
      >
        {showActivity ? (
          <ChevronRight className="h-5 w-5 text-primary" />
        ) : (
          <ChevronLeft className="h-5 w-5 text-primary" />
        )}
      </Button>
    </div>
  )
}

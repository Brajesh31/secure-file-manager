"use client"

import { useState } from "react"
import {
  FileIcon,
  FileText,
  FileImage,
  FileIcon as FilePdf,
  FileArchive,
  MoreVertical,
  Trash2,
  Eye,
  UserPlus,
  Share2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import type { FileType } from "@/lib/types"
import { FilePreviewDialog } from "@/components/file-preview-dialog"
import { AssignUserDialog } from "@/components/assign-user-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Card } from "@/components/ui/card"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FileListProps {
  files: FileType[]
  userRole: string | null
}

export function FileList({ files, userRole }: FileListProps) {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-6 w-6 text-red-500" />
      case "image":
        return <FileImage className="h-6 w-6 text-cyan-500" />
      case "doc":
      case "docx":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "zip":
        return <FileArchive className="h-6 w-6 text-amber-500" />
      default:
        return <FileIcon className="h-6 w-6 text-slate-500" />
    }
  }

  const handleDelete = (id: string) => {
    // In a real app, this would call an API to delete the file
    console.log(`Deleting file with ID: ${id}`)
  }

  const handlePreview = (file: FileType) => {
    setSelectedFile(file)
    setPreviewOpen(true)
  }

  const handleAssign = (file: FileType) => {
    setSelectedFile(file)
    setAssignOpen(true)
  }

  const getUserPermission = (file: FileType, userId: string) => {
    if (!file.accessibility) return "unknown";
    const userAccess = file.accessibility.find(access => access.userId === userId);
    return userAccess ? userAccess.permission : "unknown";
  }

  return (
    <Card className="card-3d card-3d-hover overflow-hidden glass-morphism realistic-shadow">
      <div className="grid grid-cols-12 gap-4 p-4 font-medium text-muted-foreground border-b glass-effect">
        <div className="col-span-4">Name</div>
        <div className="col-span-2">Type</div>
        <div className="col-span-1">Size</div>
        <div className="col-span-2">Risk Level</div>
        <div className="col-span-2">Assigned To</div>
        <div className="col-span-1"></div>
      </div>

      <div className="divide-y divide-gray-100/20">
        {files.map((file, index) => (
          <div 
            key={file.id} 
            className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/30 transition-all transform hover:-translate-y-1 hover:shadow-md"
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            <div className="col-span-4 flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl glass-effect">
                {getFileIcon(file.type)}
              </div>
              <div>
                <div className="font-medium">{file.name}</div>
                <div className="text-xs text-muted-foreground">{file.uploadDate}</div>
              </div>
            </div>
            <div className="col-span-2 capitalize">{file.type}</div>
            <div className="col-span-1">{file.size}</div>
            <div className="col-span-2">
              <Badge
                variant={
                  file.riskLevel === "high" ? "destructive" : file.riskLevel === "medium" ? "warning" : "secondary"
                }
                className="rounded-md depth-effect"
              >
                {file.riskLevel}
              </Badge>
            </div>
            <div className="col-span-2">
              <TooltipProvider>
                <AvatarGroup limit={3}>
                  {file.assignedTo.map((userId) => (
                    <Tooltip key={userId}>
                      <TooltipTrigger asChild>
                        <Avatar className={`h-7 w-7 border-2 border-background ${
                          getUserPermission(file, userId) === "read" ? "bg-blue-100 dark:bg-blue-900" : 
                          getUserPermission(file, userId) === "write" ? "bg-green-100 dark:bg-green-900" : ""
                        }`}>
                          <AvatarFallback className="text-xs">{userId.charAt(0).toUpperCase()}</AvatarFallback>
                        </Avatar>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{userId} - {getUserPermission(file, userId) === "read" ? "Read only" : "Read & Write"}</p>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </AvatarGroup>
              </TooltipProvider>
            </div>
            <div className="col-span-1 flex justify-end">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreVertical className="h-4 w-4" />
                    <span className="sr-only">Actions</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handlePreview(file)}>
                    <Eye className="mr-2 h-4 w-4" />
                    Preview
                  </DropdownMenuItem>

                  <DropdownMenuItem>
                    <Share2 className="mr-2 h-4 w-4" />
                    Share
                  </DropdownMenuItem>

                  {userRole === "admin" && (
                    <>
                      <DropdownMenuItem onClick={() => handleAssign(file)}>
                        <UserPlus className="mr-2 h-4 w-4" />
                        Assign Users
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDelete(file.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </>
                  )}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {selectedFile && (
        <>
          <FilePreviewDialog file={selectedFile} open={previewOpen} onOpenChange={setPreviewOpen} />

          {userRole === "admin" && (
            <AssignUserDialog file={selectedFile} open={assignOpen} onOpenChange={setAssignOpen} />
          )}
        </>
      )}
    </Card>
  )
}

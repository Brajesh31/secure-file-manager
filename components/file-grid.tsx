"use client"

import { useState, memo, useCallback } from "react"
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
import { Card } from "@/components/ui/card"
import type { FileType } from "@/lib/types"
import { FilePreviewDialog } from "@/components/file-preview-dialog"
import { AssignUserDialog } from "@/components/assign-user-dialog"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { AvatarGroup } from "@/components/ui/avatar-group"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface FileGridProps {
  files: FileType[]
  userRole: string | null
}

// Memoize individual file card for better performance
const FileCard = memo(({ 
  file, 
  index, 
  userRole, 
  onPreview, 
  onAssign, 
  onDelete 
}: { 
  file: FileType; 
  index: number;
  userRole: string | null;
  onPreview: (file: FileType) => void;
  onAssign: (file: FileType) => void;
  onDelete: (id: string) => void;
}) => {
  const getFileTypeClass = (type: string) => {
    switch (type) {
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

  const getFileIcon = (type: string) => {
    switch (type) {
      case "pdf":
        return <FilePdf className="h-14 w-14 text-red-500" />
      case "image":
        return <FileImage className="h-14 w-14 text-cyan-500" />
      case "doc":
      case "docx":
        return <FileText className="h-14 w-14 text-blue-500" />
      case "zip":
        return <FileArchive className="h-14 w-14 text-amber-500" />
      default:
        return <FileIcon className="h-14 w-14 text-slate-500" />
    }
  }
  
  const getUserPermission = (file: FileType, userId: string) => {
    if (!file.accessibility) return "unknown";
    const userAccess = file.accessibility.find(access => access.userId === userId);
    return userAccess ? userAccess.permission : "unknown";
  }

  return (
        <Card 
          key={file.id} 
      className={`card-3d ${getFileTypeClass(file.type)}`}
        >
          <div 
            className="p-6 flex items-center justify-center h-48 cursor-pointer relative" 
        onClick={() => onPreview(file)}
          >
        <div className="h-24 w-24 rounded-2xl glass-effect flex items-center justify-center">
              {getFileIcon(file.type)}
            </div>
          </div>
      <div className="p-4">
            <div className="font-medium truncate mb-2">{file.name}</div>
            <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
              <span className="capitalize">{file.type}</span>
              <span>{file.size}</span>
            </div>
            <div className="flex justify-between items-center">
              <Badge
                variant={
                  file.riskLevel === "high" ? "destructive" : file.riskLevel === "medium" ? "warning" : "secondary"
                }
            className="rounded-md"
              >
                {file.riskLevel}
              </Badge>

              <div className="flex items-center gap-2">
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

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                      <MoreVertical className="h-4 w-4" />
                      <span className="sr-only">Actions</span>
                    </Button>
                  </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => onPreview(file)}>
                      <Eye className="mr-2 h-4 w-4" />
                      Preview
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>

                    {userRole === "admin" && (
                      <>
                    <DropdownMenuItem onClick={() => onAssign(file)}>
                          <UserPlus className="mr-2 h-4 w-4" />
                          Assign Users
                        </DropdownMenuItem>
                        <DropdownMenuItem
                      onClick={() => onDelete(file.id)}
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
          </div>
        </Card>
  );
});

FileCard.displayName = 'FileCard';

export function FileGrid({ files, userRole }: FileGridProps) {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [assignOpen, setAssignOpen] = useState(false)

  // Use callbacks for event handlers
  const handleDelete = useCallback((id: string) => {
    // In a real app, this would call an API to delete the file
    console.log(`Deleting file with ID: ${id}`)
  }, []);

  const handlePreview = useCallback((file: FileType) => {
    setSelectedFile(file)
    setPreviewOpen(true)
  }, []);

  const handleAssign = useCallback((file: FileType) => {
    setSelectedFile(file)
    setAssignOpen(true)
  }, []);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {files.map((file, index) => (
        <FileCard
          key={file.id}
          file={file}
          index={index}
          userRole={userRole}
          onPreview={handlePreview}
          onAssign={handleAssign}
          onDelete={handleDelete}
        />
      ))}

      {selectedFile && (
        <>
          <FilePreviewDialog file={selectedFile} open={previewOpen} onOpenChange={setPreviewOpen} />

          {userRole === "admin" && (
            <AssignUserDialog file={selectedFile} open={assignOpen} onOpenChange={setAssignOpen} />
          )}
        </>
      )}
    </div>
  )
}

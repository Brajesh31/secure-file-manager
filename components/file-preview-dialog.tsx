"use client"

import { useEffect, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import type { FileType } from "@/lib/types"
import { Badge } from "@/components/ui/badge"

interface FilePreviewDialogProps {
  file: FileType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function FilePreviewDialog({ file, open, onOpenChange }: FilePreviewDialogProps) {
  const previewRef = useRef<HTMLDivElement>(null)

  // Prevent right-click on the preview
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault()
      return false
    }

    const element = previewRef.current
    if (element) {
      element.addEventListener("contextmenu", handleContextMenu)

      // Prevent drag and drop
      element.addEventListener("dragstart", (e) => e.preventDefault())

      return () => {
        element.removeEventListener("contextmenu", handleContextMenu)
        element.removeEventListener("dragstart", (e) => e.preventDefault())
      }
    }
  }, [open])

  const renderPreview = () => {
    // In a real app, this would render different previews based on file type
    // For this demo, we'll just show a placeholder
    switch (file.type) {
      case "pdf":
        return (
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-red-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium">{file.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">PDF Document Preview</p>
            </div>
          </div>
        )
      case "image":
        return (
          <div className="bg-muted rounded-lg p-4 flex items-center justify-center h-[400px]">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt={file.name}
              className="max-h-full max-w-full object-contain"
            />
          </div>
        )
      default:
        return (
          <div className="bg-muted rounded-lg p-8 flex items-center justify-center h-[400px]">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center">
                  <svg className="h-8 w-8 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                </div>
              </div>
              <h3 className="text-lg font-medium">{file.name}</h3>
              <p className="text-sm text-muted-foreground mt-2">Document Preview</p>
            </div>
          </div>
        )
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{file.name}</span>
            <Badge
              variant={
                file.riskLevel === "high" ? "destructive" : file.riskLevel === "medium" ? "warning" : "secondary"
              }
            >
              {file.riskLevel}
            </Badge>
          </DialogTitle>
        </DialogHeader>

        <div ref={previewRef} className="select-none" onCopy={(e) => e.preventDefault()}>
          {renderPreview()}
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="text-muted-foreground">Type</p>
            <p className="font-medium capitalize">{file.type}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Size</p>
            <p className="font-medium">{file.size}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Uploaded</p>
            <p className="font-medium">{file.uploadDate}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Uploaded By</p>
            <p className="font-medium">{file.uploadedBy}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

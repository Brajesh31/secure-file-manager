"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog"
import {
  Folder,
  FolderPlus,
  MoreVertical,
  PenSquare,
  Trash2,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ScrollArea } from "@/components/ui/scroll-area"
import { mockFolders } from "@/lib/mock-data"
import type { FolderType } from "@/lib/types"

interface FolderManagementProps {
  userRole: string | null
}

export function FolderManagement({ userRole }: FolderManagementProps) {
  const { toast } = useToast()
  const [folders, setFolders] = useState<FolderType[]>(mockFolders)
  const [isAddFolderOpen, setIsAddFolderOpen] = useState(false)
  const [newFolderName, setNewFolderName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleCreateFolder = () => {
    if (!newFolderName.trim()) {
      toast({
        title: "Error",
        description: "Folder name cannot be empty",
        variant: "destructive"
      })
      return
    }

    setIsSubmitting(true)

    // In a real app, this would call an API to create the folder
    setTimeout(() => {
      const newFolder: FolderType = {
        id: `folder${Date.now()}`,
        name: newFolderName,
        path: `/${newFolderName}`,
        createdBy: "admin1",
        createdAt: new Date().toISOString().split('T')[0]
      }

      setFolders([...folders, newFolder])
      setIsSubmitting(false)
      setNewFolderName("")
      setIsAddFolderOpen(false)
      
      toast({
        title: "Success",
        description: `Folder "${newFolderName}" created successfully`
      })
    }, 500)
  }

  const handleEditFolder = (folderId: string) => {
    // In a real app, this would open a dialog to edit the folder
    console.log(`Edit folder with ID: ${folderId}`)
  }

  const handleDeleteFolder = (folderId: string) => {
    // In a real app, this would call an API to delete the folder
    setFolders(prevFolders => prevFolders.filter(folder => folder.id !== folderId))
    
    toast({
      title: "Folder deleted",
      description: "Folder has been removed"
    })
  }

  const isAdmin = userRole === "admin"

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Folders</h2>
        {isAdmin && (
          <Button size="sm" onClick={() => setIsAddFolderOpen(true)}>
            <FolderPlus className="mr-2 h-4 w-4" />
            Add Folder
          </Button>
        )}
      </div>

      <Card className="card-3d overflow-hidden">
        <ScrollArea className="h-[300px]">
          <div className="divide-y">
            {folders.map((folder) => (
              <div
                key={folder.id}
                className="p-3 flex justify-between items-center hover:bg-muted/50 transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <Folder className="h-5 w-5 text-muted-foreground" />
                  <span>{folder.name}</span>
                </div>
                {isAdmin && (
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleEditFolder(folder.id)}>
                        <PenSquare className="mr-2 h-4 w-4" />
                        Edit
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => handleDeleteFolder(folder.id)}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>

      <Dialog open={isAddFolderOpen} onOpenChange={setIsAddFolderOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Folder</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <Input
              placeholder="Folder name"
              value={newFolderName}
              onChange={(e) => setNewFolderName(e.target.value)}
              disabled={isSubmitting}
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsAddFolderOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button onClick={handleCreateFolder} disabled={isSubmitting}>
              {isSubmitting ? "Creating..." : "Create"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
} 
"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { Folder, Check, X } from "lucide-react"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Badge } from "@/components/ui/badge"
import { mockFolders, mockFolderPermissions } from "@/lib/mock-data"
import type { FolderPermissionType } from "@/lib/types"

interface FolderPermission {
  folderId: string
  folderName: string
  read: boolean
  write: boolean
  create: boolean
}

interface FolderAccessDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  userId: string
  userName: string
  onSave?: (userId: string, permissions: FolderPermission[]) => void
}

export function FolderAccessDialog({ open, onOpenChange, userId, userName, onSave }: FolderAccessDialogProps) {
  const { toast } = useToast()
  const [permissions, setPermissions] = useState<FolderPermission[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      // Initialize with data from mock folders and permissions
      const initialPermissions = mockFolders.map(folder => {
        // Find existing permissions for this user and folder
        const existingPermission = mockFolderPermissions.find(
          p => p.userId === userId && p.folderId === folder.id
        )
        
        return {
          folderId: folder.id,
          folderName: folder.name,
          read: existingPermission ? existingPermission.read : false,
          write: existingPermission ? existingPermission.write : false,
          create: existingPermission ? existingPermission.create : false,
        }
      })
      
      setPermissions(initialPermissions)
    }
  }, [open, userId])

  const handleTogglePermission = (folderId: string, permissionType: 'read' | 'write' | 'create') => {
    setPermissions(prevPermissions => 
      prevPermissions.map(perm => {
        if (perm.folderId === folderId) {
          // If turning off read, also turn off write and create
          if (permissionType === 'read' && perm.read) {
            return { ...perm, read: false, write: false, create: false }
          }
          
          // If turning on write or create, also turn on read
          if ((permissionType === 'write' || permissionType === 'create') && !perm.read && !perm[permissionType]) {
            return { ...perm, [permissionType]: true, read: true }
          }
          
          return { ...perm, [permissionType]: !perm[permissionType] }
        }
        return perm
      })
    )
  }

  const handleSubmit = () => {
    setIsSubmitting(true)
    
    // In a real app, this would call an API to update permissions
    setTimeout(() => {
      if (onSave) {
        onSave(userId, permissions)
      }
      
      setIsSubmitting(false)
      toast({
        title: "Permissions updated",
        description: `Folder access updated for ${userName}`
      })
      
      onOpenChange(false)
    }, 500)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Folder Access for {userName}</DialogTitle>
        </DialogHeader>

        <div className="py-4">
          <div className="mb-4 text-sm text-muted-foreground">
            Select which folders this user can access and set appropriate permissions.
          </div>
          
          <ScrollArea className="h-[300px] pr-4">
            <div className="space-y-4">
              {permissions.map((permission) => (
                <div key={permission.folderId} className="border rounded-lg p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <Folder className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{permission.folderName}</span>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mt-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${permission.folderId}-read`}
                        checked={permission.read}
                        onCheckedChange={() => handleTogglePermission(permission.folderId, 'read')}
                      />
                      <Label htmlFor={`${permission.folderId}-read`} className="text-sm">Read</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${permission.folderId}-write`}
                        checked={permission.write}
                        disabled={!permission.read}
                        onCheckedChange={() => handleTogglePermission(permission.folderId, 'write')}
                      />
                      <Label htmlFor={`${permission.folderId}-write`} className="text-sm">Write</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id={`${permission.folderId}-create`}
                        checked={permission.create}
                        disabled={!permission.read}
                        onCheckedChange={() => handleTogglePermission(permission.folderId, 'create')}
                      />
                      <Label htmlFor={`${permission.folderId}-create`} className="text-sm">Create</Label>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Permissions"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
} 
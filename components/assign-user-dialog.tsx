"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import type { FileType } from "@/lib/types"
import { mockUsers } from "@/lib/mock-data"

interface AssignUserDialogProps {
  file: FileType
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function AssignUserDialog({ file, open, onOpenChange }: AssignUserDialogProps) {
  const initialAccessibility = file.accessibility || file.assignedTo.map(userId => ({ userId, permission: "write" as const }))
  const [selectedUsers, setSelectedUsers] = useState<string[]>(file.assignedTo || [])
  const [userPermissions, setUserPermissions] = useState<{ userId: string, permission: "read" | "write" }[]>(initialAccessibility)

  const handleUserToggle = (userId: string) => {
    setSelectedUsers((prev) => {
      if (prev.includes(userId)) {
        setUserPermissions(prev => prev.filter(p => p.userId !== userId))
        return prev.filter((id) => id !== userId)
      } else {
        setUserPermissions(prev => [...prev, { userId, permission: "read" }])
        return [...prev, userId]
      }
    })
  }

  const handlePermissionChange = (userId: string, permission: "read" | "write") => {
    setUserPermissions(prev => 
      prev.map(p => p.userId === userId ? { ...p, permission } : p)
    )
  }

  const handleSave = () => {
    // In a real app, this would call an API to update the file's assigned users and permissions
    console.log(`Assigning users to file ${file.id}:`, selectedUsers)
    console.log(`With permissions:`, userPermissions)
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Assign Users to {file.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 my-4 max-h-[300px] overflow-y-auto">
          {mockUsers.filter(user => user.role === "user").map((user) => (
            <div key={user.id} className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id={`user-${user.id}`}
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => handleUserToggle(user.id)}
                />
                <Label htmlFor={`user-${user.id}`} className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                    {user.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </Label>
              </div>

              {selectedUsers.includes(user.id) && (
                <div className="pl-10">
                  <RadioGroup 
                    defaultValue={userPermissions.find(p => p.userId === user.id)?.permission || "read"}
                    onValueChange={(value) => handlePermissionChange(user.id, value as "read" | "write")}
                    className="flex space-x-4"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="read" id={`read-${user.id}`} />
                      <Label htmlFor={`read-${user.id}`}>Read only</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="write" id={`write-${user.id}`} />
                      <Label htmlFor={`write-${user.id}`}>Read & write</Label>
                    </div>
                  </RadioGroup>
                </div>
              )}
            </div>
          ))}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

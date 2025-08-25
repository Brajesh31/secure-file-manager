export interface FileType {
  id: string
  name: string
  type: string
  size: string
  riskLevel: "low" | "medium" | "high"
  uploadDate: string
  uploadedBy: string
  assignedTo: string[]
  url?: string
  accessibility?: {
    userId: string
    permission: "read" | "write"
  }[]
  folderId?: string // Which folder this file belongs to
}

export interface UserType {
  id: string
  name: string
  email: string
  role: "admin" | "user"
}

export interface FolderType {
  id: string
  name: string
  parentId?: string
  path: string
  createdBy: string
  createdAt: string
}

export interface FolderPermissionType {
  folderId: string
  userId: string
  read: boolean
  write: boolean
  create: boolean
}

export type Permission = "read" | "write" | "create"

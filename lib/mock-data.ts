import type { FileType, UserType, FolderType, FolderPermissionType } from "./types"

export const mockFiles: FileType[] = [
  {
    id: "1",
    name: "Financial Report 2023.pdf",
    type: "pdf",
    size: "2.4 MB",
    riskLevel: "high",
    uploadDate: "2023-12-15",
    uploadedBy: "Admin",
    assignedTo: ["user1", "user2"],
    accessibility: [
      { userId: "user1", permission: "write" },
      { userId: "user2", permission: "read" }
    ],
    folderId: "folder3"
  },
  {
    id: "2",
    name: "Product Roadmap.docx",
    type: "doc",
    size: "1.2 MB",
    riskLevel: "medium",
    uploadDate: "2023-12-10",
    uploadedBy: "Admin",
    assignedTo: ["user1", "user3"],
    accessibility: [
      { userId: "user1", permission: "read" },
      { userId: "user3", permission: "read" }
    ],
    folderId: "folder1"
  },
  {
    id: "3",
    name: "Company Logo.png",
    type: "image",
    size: "0.5 MB",
    riskLevel: "low",
    uploadDate: "2023-12-05",
    uploadedBy: "Admin",
    assignedTo: ["user1", "user2", "user3"],
    accessibility: [
      { userId: "user1", permission: "write" },
      { userId: "user2", permission: "write" },
      { userId: "user3", permission: "write" }
    ]
  },
  {
    id: "4",
    name: "Employee Handbook.pdf",
    type: "pdf",
    size: "3.1 MB",
    riskLevel: "medium",
    uploadDate: "2023-11-28",
    uploadedBy: "Admin",
    assignedTo: ["user2"],
    accessibility: [
      { userId: "user2", permission: "read" }
    ]
  },
  {
    id: "5",
    name: "Project Presentation.pptx",
    type: "doc",
    size: "4.7 MB",
    riskLevel: "high",
    uploadDate: "2023-11-20",
    uploadedBy: "Admin",
    assignedTo: ["user1"],
    accessibility: [
      { userId: "user1", permission: "read" }
    ]
  },
  {
    id: "6",
    name: "Marketing Assets.zip",
    type: "zip",
    size: "15.2 MB",
    riskLevel: "low",
    uploadDate: "2023-11-15",
    uploadedBy: "Admin",
    assignedTo: ["user3"],
    accessibility: [
      { userId: "user3", permission: "write" }
    ]
  },
]

export const mockUsers: UserType[] = [
  {
    id: "user1",
    name: "John Doe",
    email: "john.doe@example.com",
    role: "user"
  },
  {
    id: "user2",
    name: "Jane Smith",
    email: "jane.smith@example.com",
    role: "user"
  },
  {
    id: "user3",
    name: "Robert Johnson",
    email: "robert.johnson@example.com",
    role: "user"
  },
  {
    id: "admin1",
    name: "Admin User",
    email: "admin@example.com",
    role: "admin"
  }
]

export const mockFolders: FolderType[] = [
  {
    id: "folder1",
    name: "Documents",
    path: "/Documents",
    createdBy: "admin1",
    createdAt: "2023-10-15"
  },
  {
    id: "folder2",
    name: "Images",
    path: "/Images",
    createdBy: "admin1",
    createdAt: "2023-10-15"
  },
  {
    id: "folder3",
    name: "Financial Reports",
    path: "/Financial Reports",
    createdBy: "admin1",
    createdAt: "2023-11-05"
  },
  {
    id: "folder4",
    name: "Marketing Materials",
    path: "/Marketing Materials",
    createdBy: "admin1", 
    createdAt: "2023-11-10"
  },
  {
    id: "folder5",
    name: "Client Data",
    path: "/Client Data",
    createdBy: "admin1",
    createdAt: "2023-12-01"
  },
  {
    id: "folder6",
    name: "Projects",
    path: "/Projects",
    createdBy: "admin1",
    createdAt: "2024-01-05"
  }
]

export const mockFolderPermissions: FolderPermissionType[] = [
  {
    folderId: "folder1",
    userId: "user1",
    read: true,
    write: true,
    create: true
  },
  {
    folderId: "folder1",
    userId: "user2",
    read: true,
    write: false,
    create: false
  },
  {
    folderId: "folder2",
    userId: "user1",
    read: true,
    write: true,
    create: false
  },
  {
    folderId: "folder3",
    userId: "user3",
    read: true,
    write: true,
    create: true
  }
]

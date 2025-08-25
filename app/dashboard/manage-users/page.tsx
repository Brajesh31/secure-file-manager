"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Edit, MoreVertical, Trash2, UserPlus, Mail, Shield, UserIcon, FolderKey } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { mockUsers } from "@/lib/mock-data"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { AddUserDialog } from "@/components/add-user-dialog"
import { FolderAccessDialog } from "@/components/folder-access-dialog"
import { useToast } from "@/components/ui/use-toast"
import type { UserType } from "@/lib/types"

export default function ManageUsersPage() {
  const router = useRouter()
  const { toast } = useToast()
  const [userRole, setUserRole] = useState<string | null>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [addUserOpen, setAddUserOpen] = useState(false)
  const [folderAccessOpen, setFolderAccessOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<UserType | null>(null)
  const [users, setUsers] = useState<UserType[]>([])

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    // Initialize users from mock data
    setUsers(mockUsers)

    // Redirect if not admin
    if (role !== "admin") {
      router.push("/dashboard")
    }
  }, [router])

  const handleAddUser = () => {
    setAddUserOpen(true)
  }

  const handleUserAdded = (newUser: UserType) => {
    setUsers(prevUsers => [...prevUsers, newUser])
    toast({
      title: "User created",
      description: `${newUser.name} has been added successfully`
    })
  }

  const handleEditUser = (userId: string) => {
    // In a real app, this would open a dialog to edit the user
    console.log(`Edit user with ID: ${userId}`)
  }

  const handleDeleteUser = (userId: string) => {
    // In a real app, this would call an API to delete the user
    setUsers(prevUsers => prevUsers.filter(user => user.id !== userId))
    toast({
      title: "User deleted",
      description: "User has been removed"
    })
  }

  const handleManageFolders = (userId: string) => {
    const user = users.find(u => u.id === userId)
    if (user) {
      setSelectedUser(user)
      setFolderAccessOpen(true)
    }
  }

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  if (userRole !== "admin") {
    return null
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold">Manage Users</h1>
        <div className="flex gap-2">
          <div className="relative w-full md:w-64">
            <Input
              type="search"
              placeholder="Search users..."
              className="pl-8 rounded-xl"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <Button onClick={handleAddUser} className="rounded-xl">
            <UserPlus className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all" className="mb-6">
        <TabsList className="grid w-full max-w-md grid-cols-3">
          <TabsTrigger value="all">All Users</TabsTrigger>
          <TabsTrigger value="admin">Admins</TabsTrigger>
          <TabsTrigger value="user">Regular Users</TabsTrigger>
        </TabsList>
        <TabsContent value="all">
          <UserTable 
            users={filteredUsers} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
            onManageFolders={handleManageFolders}
          />
        </TabsContent>
        <TabsContent value="admin">
          <UserTable
            users={filteredUsers.filter((user) => user.role === "admin")}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onManageFolders={handleManageFolders}
          />
        </TabsContent>
        <TabsContent value="user">
          <UserTable
            users={filteredUsers.filter((user) => user.role === "user")}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
            onManageFolders={handleManageFolders}
          />
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Total Users</CardTitle>
            <CardDescription>All registered users</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-primary" />
              </div>
              <div className="text-3xl font-bold">{users.length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Admins</CardTitle>
            <CardDescription>Users with admin privileges</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center">
                <Shield className="h-6 w-6 text-amber-600 dark:text-amber-400" />
              </div>
              <div className="text-3xl font-bold">{users.filter((user) => user.role === "admin").length}</div>
            </div>
          </CardContent>
        </Card>

        <Card className="card-3d">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Regular Users</CardTitle>
            <CardDescription>Users with standard access</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                <UserIcon className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-3xl font-bold">{users.filter((user) => user.role === "user").length}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <AddUserDialog 
        open={addUserOpen} 
        onOpenChange={setAddUserOpen} 
        onUserAdded={handleUserAdded}
      />
      
      {selectedUser && (
        <FolderAccessDialog
          open={folderAccessOpen}
          onOpenChange={setFolderAccessOpen}
          userId={selectedUser.id}
          userName={selectedUser.name}
          onSave={(userId, permissions) => {
            // In a real app, this would save the permissions to a database
            console.log('Saving permissions for user:', userId, permissions)
            toast({
              title: "Folder access updated",
              description: `Permissions saved for ${selectedUser.name}`
            })
          }}
        />
      )}
    </div>
  )
}

interface UserTableProps {
  users: typeof mockUsers
  onEdit: (userId: string) => void
  onDelete: (userId: string) => void
  onManageFolders: (userId: string) => void
}

function UserTable({ users, onEdit, onDelete, onManageFolders }: UserTableProps) {
  return (
    <Card className="card-3d overflow-hidden">
      <div className="rounded-md">
        <div className="grid grid-cols-12 gap-4 p-4 font-medium text-muted-foreground border-b">
          <div className="col-span-5">User</div>
          <div className="col-span-4">Email</div>
          <div className="col-span-2">Role</div>
          <div className="col-span-1"></div>
        </div>

        <div className="divide-y">
          {users.map((user) => (
            <div key={user.id} className="grid grid-cols-12 gap-4 p-4 items-center hover:bg-muted/50 transition-colors">
              <div className="col-span-5 flex items-center gap-3">
                <Avatar>
                  <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <span className="font-medium">{user.name}</span>
              </div>
              <div className="col-span-4 flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                {user.email}
              </div>
              <div className="col-span-2">
                <Badge variant={user.role === "admin" ? "default" : "secondary"} className="rounded-md capitalize">
                  {user.role}
                </Badge>
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
                    <DropdownMenuItem onClick={() => onManageFolders(user.id)}>
                      <FolderKey className="mr-2 h-4 w-4" />
                      Folder Access
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => onEdit(user.id)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => onDelete(user.id)}
                      className="text-destructive focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}

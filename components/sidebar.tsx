"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  BarChart3,
  ChevronLeft,
  ChevronRight,
  FileText,
  FolderOpen,
  Home,
  ImageIcon,
  LogOut,
  Moon,
  Plus,
  Settings,
  Shield,
  Sun,
  Users,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Progress } from "@/components/ui/progress"

interface SidebarProps {
  userRole: string | null
}

export function Sidebar({ userRole }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const { theme, setTheme } = useTheme()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [storageUsed, setStorageUsed] = useState(35)

  const handleLogout = () => {
    localStorage.removeItem("userRole")
    router.push("/")
  }

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const isActive = (path: string) => {
    return pathname === path
  }
  
  const getSidebarItemClasses = (path: string) => {
    const baseClasses = "sidebar-item transition-all duration-300 rounded-xl"
    const activeClasses = "sidebar-item-active glass-morphism depth-effect"
    return `${baseClasses} ${isActive(path) ? activeClasses : "hover:glass-morphism hover:depth-effect"}`
  }

  return (
    <div className={`border-r bg-card transition-all duration-300 relative ${isCollapsed ? "w-20" : "w-64"}`}>
      <div className="flex h-16 items-center border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
              <Shield className="h-5 w-5 text-primary-foreground" />
            </div>
            <span className="font-semibold">SecureFiles</span>
          </div>
        )}
        {isCollapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <Shield className="h-5 w-5 text-primary-foreground" />
          </div>
        )}
      </div>

      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute -right-3 top-16 h-6 w-6 rounded-full bg-background border shadow-sm depth-effect"
        onClick={toggleSidebar}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="px-3 py-4">
        {userRole === "admin" && (
          <Button
            variant="default"
            className={`w-full mb-6 rounded-xl card-3d-hover ${isCollapsed ? "px-0 justify-center" : ""}`}
            onClick={() => router.push("/dashboard/upload")}
          >
            <Plus className="h-4 w-4 mr-2" />
            {!isCollapsed && "Upload File"}
          </Button>
        )}

        <div className="space-y-2 mb-6">
          <Link href="/dashboard" className={getSidebarItemClasses("/dashboard")}>
            <Home className="h-5 w-5" />
            {!isCollapsed && <span>Dashboard</span>}
          </Link>

          <Link
            href="/dashboard/documents"
            className={getSidebarItemClasses("/dashboard/documents")}
          >
            <FileText className="h-5 w-5" />
            {!isCollapsed && <span>Documents</span>}
          </Link>

          <Link
            href="/dashboard/images"
            className={getSidebarItemClasses("/dashboard/images")}
          >
            <ImageIcon className="h-5 w-5" />
            {!isCollapsed && <span>Images</span>}
          </Link>

          <Link
            href="/dashboard/shared"
            className={getSidebarItemClasses("/dashboard/shared")}
          >
            <FolderOpen className="h-5 w-5" />
            {!isCollapsed && <span>Shared Files</span>}
          </Link>

          {userRole === "admin" && (
            <>
              <Link
                href="/dashboard/manage-users"
                className={getSidebarItemClasses("/dashboard/manage-users")}
              >
                <Users className="h-5 w-5" />
                {!isCollapsed && <span>Manage Users</span>}
              </Link>

              <Link
                href="/dashboard/analytics"
                className={getSidebarItemClasses("/dashboard/analytics")}
              >
                <BarChart3 className="h-5 w-5" />
                {!isCollapsed && <span>Analytics</span>}
              </Link>
            </>
          )}

          <Link
            href="/dashboard/settings"
            className={getSidebarItemClasses("/dashboard/settings")}
          >
            <Settings className="h-5 w-5" />
            {!isCollapsed && <span>Settings</span>}
          </Link>
        </div>

        {!isCollapsed && (
          <div className="mt-auto pt-6">
            <div className="rounded-xl border glass-morphism p-4 shadow-sm card-3d">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium">Storage</span>
                <span className="text-xs text-muted-foreground">{storageUsed}% used</span>
              </div>
              <Progress value={storageUsed} className="h-2" />
              <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                <div>
                  <div className="font-medium text-foreground">35.8 GB</div>
                  <div>Used</div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-foreground">100 GB</div>
                  <div>Total</div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="absolute bottom-0 w-full border-t p-3">
        {isCollapsed ? (
          <div className="flex flex-col gap-2 items-center">
            <Button 
              variant="ghost" 
              size="icon" 
              className="depth-effect glass-morphism rounded-xl"
              onClick={toggleTheme}
            >
              {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="text-destructive hover:text-destructive depth-effect glass-morphism rounded-xl"
              onClick={handleLogout}
            >
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex justify-between gap-2">
            <Button 
              variant="ghost" 
              size="sm" 
              className="depth-effect glass-morphism px-3 py-2 rounded-xl"
              onClick={toggleTheme}
            >
              <div className="flex items-center gap-2">
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                <span className="text-sm">Dark Mode</span>
              </div>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="text-destructive hover:text-destructive depth-effect glass-morphism px-3 py-2 rounded-xl"
              onClick={handleLogout}
            >
              <div className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                <span className="text-sm">Logout</span>
              </div>
            </Button>
          </div>
        )}
      </div>
    </div>
  )
}

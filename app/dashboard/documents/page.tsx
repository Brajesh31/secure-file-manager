"use client"

import { useState, useEffect } from "react"
import { FileGrid } from "@/components/file-grid"
import { mockFiles } from "@/lib/mock-data"
import type { FileType } from "@/lib/types"
import { FileText, Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"

export default function DocumentsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)
  const [files, setFiles] = useState<FileType[]>([])
  const [searchQuery, setSearchQuery] = useState("")

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    // Filter for document files only (pdf, doc, docx)
    const documentFiles = mockFiles.filter(
      file => file.type === "pdf" || file.type === "doc" || file.type === "docx"
    )
    
    if (role === "admin") {
      setFiles(documentFiles)
    } else {
      // For regular users, only show files assigned to them
      setFiles(documentFiles.filter(file => file.assignedTo.includes("user")))
    }
  }, [])

  const filteredFiles = files.filter((file) => 
    file.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-3xl font-bold">Documents</h1>
            <p className="text-muted-foreground">Manage your document files</p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search documents..."
                className="pl-8 rounded-xl glass-morphism"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>

        <Card className="card-3d card-3d-hover glass-morphism p-6 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-12 w-12 rounded-full glass-effect flex items-center justify-center">
              <FileText className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold">Documents</h2>
              <p className="text-muted-foreground">PDF, DOC, DOCX files</p>
            </div>
          </div>
        </Card>

        <FileGrid files={filteredFiles} userRole={userRole} />
      </div>
    </div>
  )
} 
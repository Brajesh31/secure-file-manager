"use client"

import { useState, useEffect } from "react"
import { BarChart3, PieChart } from "lucide-react"
import { Card } from "@/components/ui/card"
import { mockFiles } from "@/lib/mock-data"
import {
  PieChart as RechartPieChart,
  Pie,
  BarChart as RechartBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from "recharts"

export default function AnalyticsPage() {
  const [userRole, setUserRole] = useState<string | null>(null)

  useEffect(() => {
    const role = localStorage.getItem("userRole")
    setUserRole(role)

    if (role !== "admin") {
      // Redirect to dashboard if not admin
      window.location.href = "/dashboard"
    }
  }, [])

  // File type distribution data for pie chart
  const fileTypeData = [
    { name: "PDF", value: mockFiles.filter(file => file.type === "pdf").length, color: "#ef4444" },  // red
    { name: "DOC", value: mockFiles.filter(file => file.type === "doc").length, color: "#3b82f6" },  // blue
    { name: "Image", value: mockFiles.filter(file => file.type === "image").length, color: "#06b6d4" }, // cyan
    { name: "Other", value: mockFiles.filter(file => !["pdf", "doc", "image"].includes(file.type)).length, color: "#94a3b8" }, // slate
  ]

  // Risk level distribution data for bar chart
  const riskLevelData = [
    { name: "Low", count: mockFiles.filter(file => file.riskLevel === "low").length, color: "#22c55e" },
    { name: "Medium", count: mockFiles.filter(file => file.riskLevel === "medium").length, color: "#eab308" },
    { name: "High", count: mockFiles.filter(file => file.riskLevel === "high").length, color: "#ef4444" },
  ]

  // Monthly file uploads data
  const monthlyUploadsData = [
    { month: "Jan", count: 12 },
    { month: "Feb", count: 19 },
    { month: "Mar", count: 15 },
    { month: "Apr", count: 7 },
    { month: "May", count: 22 },
    { month: "Jun", count: 14 },
    { month: "Jul", count: 8 },
    { month: "Aug", count: 17 },
    { month: "Sep", count: 24 },
    { month: "Oct", count: 31 },
    { month: "Nov", count: 25 },
    { month: "Dec", count: 18 },
  ]

  if (userRole !== "admin") {
    return null
  }

  return (
    <div className="p-6">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Analytics</h1>
          <p className="text-muted-foreground">Insights into your file management system</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <Card className="card-3d card-3d-hover glass-morphism p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full glass-effect flex items-center justify-center">
                <PieChart className="h-6 w-6 text-purple-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">File Type Distribution</h2>
                <p className="text-muted-foreground">Breakdown of file types</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartPieChart>
                  <Pie
                    data={fileTypeData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {fileTypeData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </RechartPieChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="card-3d card-3d-hover glass-morphism p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-12 w-12 rounded-full glass-effect flex items-center justify-center">
                <BarChart3 className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Risk Level Assessment</h2>
                <p className="text-muted-foreground">Security levels of your files</p>
              </div>
            </div>
            
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RechartBarChart data={riskLevelData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="count" name="Number of Files">
                    {riskLevelData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </RechartBarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </div>

        <Card className="card-3d card-3d-hover glass-morphism p-6 mb-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="h-12 w-12 rounded-full glass-effect flex items-center justify-center">
              <BarChart3 className="h-6 w-6 text-green-500" />
            </div>
            <div>
              <h2 className="text-xl font-semibold">Monthly File Uploads</h2>
              <p className="text-muted-foreground">Tracking upload activity over time</p>
            </div>
          </div>
          
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RechartBarChart data={monthlyUploadsData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" name="Files Uploaded" fill="#06b6d4" />
              </RechartBarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="card-3d card-3d-hover glass-morphism p-6">
            <h3 className="text-lg font-semibold mb-2">Total Files</h3>
            <p className="text-3xl font-bold">{mockFiles.length}</p>
          </Card>
          <Card className="card-3d card-3d-hover glass-morphism p-6">
            <h3 className="text-lg font-semibold mb-2">High Risk Files</h3>
            <p className="text-3xl font-bold text-red-500">
              {mockFiles.filter(file => file.riskLevel === "high").length}
            </p>
          </Card>
          <Card className="card-3d card-3d-hover glass-morphism p-6">
            <h3 className="text-lg font-semibold mb-2">Active Users</h3>
            <p className="text-3xl font-bold text-green-500">8</p>
          </Card>
        </div>
      </div>
    </div>
  )
} 
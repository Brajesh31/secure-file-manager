import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Upload, UserPlus, Download, Share2 } from "lucide-react"

export function RecentActivity() {
  const activities = [
    {
      id: 1,
      user: "John D.",
      action: "uploaded",
      item: "Financial Report 2023.pdf",
      time: "2 hours ago",
      icon: <Upload className="h-4 w-4" />,
      color: "text-green-500",
    },
    {
      id: 2,
      user: "Jane S.",
      action: "shared",
      item: "Product Roadmap.docx",
      time: "Yesterday",
      icon: <Share2 className="h-4 w-4" />,
      color: "text-blue-500",
    },
    {
      id: 3,
      user: "Admin",
      action: "assigned",
      item: "Company Logo.png",
      time: "2 days ago",
      icon: <UserPlus className="h-4 w-4" />,
      color: "text-purple-500",
    },
    {
      id: 4,
      user: "Robert J.",
      action: "downloaded",
      item: "Employee Handbook.pdf",
      time: "3 days ago",
      icon: <Download className="h-4 w-4" />,
      color: "text-amber-500",
    },
    {
      id: 5,
      user: "Admin",
      action: "uploaded",
      item: "Project Presentation.pptx",
      time: "1 week ago",
      icon: <Upload className="h-4 w-4" />,
      color: "text-green-500",
    },
  ]

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <Card key={activity.id} className="p-4 shadow-sm">
          <div className="flex gap-3">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="text-xs">{activity.user.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="text-sm">
                <span className="font-medium">{activity.user}</span>{" "}
                <span className={activity.color}>{activity.action}</span>{" "}
                <span className="font-medium">{activity.item}</span>
              </p>
              <p className="text-xs text-muted-foreground">{activity.time}</p>
            </div>
            <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-muted ${activity.color}`}>
              {activity.icon}
            </div>
          </div>
        </Card>
      ))}

      <div className="pt-2 text-center">
        <button className="text-sm text-primary hover:underline">View all activity</button>
      </div>
    </div>
  )
}

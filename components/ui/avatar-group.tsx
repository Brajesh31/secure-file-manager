import * as React from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface AvatarGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  limit?: number
}

export function AvatarGroup({ limit = 3, className, children, ...props }: AvatarGroupProps) {
  const childrenArray = React.Children.toArray(children)
  const limitedChildren = childrenArray.slice(0, limit)
  const excess = childrenArray.length - limit

  return (
    <div className="flex -space-x-2" {...props}>
      {limitedChildren}
      {excess > 0 && (
        <Avatar className="h-6 w-6 border-2 border-background">
          <AvatarFallback className="bg-muted text-xs">+{excess}</AvatarFallback>
        </Avatar>
      )}
    </div>
  )
}

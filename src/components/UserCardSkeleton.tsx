import { Card, CardContent } from './ui/card'
import { Skeleton } from './ui/skeleton'

export function UserCardSkeleton() {
  return (
    <Card className="shadow-none">
      <CardContent className="p-4 flex items-center gap-4">
        <Skeleton className="w-10 h-10 rounded-lg shrink-0" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-3.5 w-1/2" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </CardContent>
    </Card>
  )
}
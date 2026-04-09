import { Card, CardContent } from './ui/card'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
  onClick: (user: User) => void
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card
      className="cursor-pointer transition-all duration-200 hover:shadow-md hover:-translate-y-0.5 hover:border-primary/40"
      onClick={() => onClick(user)}
    >
      <CardContent className="p-4 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-sm shrink-0">
          {user.name.charAt(0)}
        </div>
        <div className="min-w-0">
          <p className="font-medium text-sm truncate">{user.name}</p>
          <p className="text-muted-foreground text-xs truncate">{user.email}</p>
        </div>
      </CardContent>
    </Card>
  )
}
import { ChevronRight } from 'lucide-react'
import { Card, CardContent } from './ui/card'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
  onClick: (user: User) => void
}

function getAvatarClass(id: number) {
  return id % 2 === 0
    ? 'bg-teal-50 text-teal-700'
    : 'bg-slate-100 text-slate-700'
}

export function UserCard({ user, onClick }: UserCardProps) {
  return (
    <Card
      onClick={() => onClick(user)}
      className="cursor-pointer transition-all duration-150 hover:border-slate-700 hover:shadow-none shadow-none"
    >
      <CardContent className="p-2 flex items-center gap-2">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-sm font-medium shrink-0 ${getAvatarClass(user.id)}`}>
          {user.name.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-slate-800 truncate">{user.name}</p>
          <p className="text-xs text-slate-500 truncate">{user.email}</p>
        </div>

        <ChevronRight className="w-4 h-4 text-slate-300 shrink-0" />
      </CardContent>
    </Card>
  )
}
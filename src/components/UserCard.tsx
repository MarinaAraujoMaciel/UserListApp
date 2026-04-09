import { ChevronRight } from 'lucide-react'
import type { User } from '../types/user'

interface UserCardProps {
  user: User
  onClick: (user: User) => void
}

const AVATAR_COLORS = [
  { bg: '#EEEDFE', color: '#534AB7' },
  { bg: '#E1F5EE', color: '#0F6E56' },
  { bg: '#FAECE7', color: '#993C1D' },
  { bg: '#FBEAF0', color: '#993556' },
  { bg: '#EAF3DE', color: '#3B6D11' },
]

function getAvatarColor(id: number) {
  return AVATAR_COLORS[id % AVATAR_COLORS.length]
}

export function UserCard({ user, onClick }: UserCardProps) {
  const avatarColor = getAvatarColor(user.id)

  return (
    <div
      onClick={() => onClick(user)}
      className="flex items-center gap-4 rounded-2xl cursor-pointer transition-all duration-200"
      style={{
        background: '#fff',
        border: '0.5px solid #ebe9fb',
        padding: '14px 16px',
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#AFA9EC'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = '0 4px 16px rgba(127,119,221,0.12)'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(-1px)'
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLDivElement).style.borderColor = '#ebe9fb'
        ;(e.currentTarget as HTMLDivElement).style.boxShadow = 'none'
        ;(e.currentTarget as HTMLDivElement).style.transform = 'translateY(0)'
      }}
    >
      <div
        className="flex items-center justify-center rounded-xl text-sm font-medium shrink-0"
        style={{ width: 42, height: 42, background: avatarColor.bg, color: avatarColor.color }}
      >
        {user.name.charAt(0)}
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium truncate" style={{ color: '#2C2C2A' }}>
          {user.name}
        </p>
        <p className="text-xs truncate" style={{ color: '#888780' }}>
          {user.email}
        </p>
      </div>

      <ChevronRight className="w-4 h-4 shrink-0" style={{ color: '#D3D1C7' }} />
    </div>
  )
}
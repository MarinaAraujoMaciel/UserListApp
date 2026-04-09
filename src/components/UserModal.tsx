import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog'
import type { User } from '../types/user'

interface UserModalProps {
  user: User | null
  open: boolean
  onClose: () => void
}

interface InfoRowProps {
  label: string
  value: string
}

function InfoRow({ label, value }: InfoRowProps) {
  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-xs text-muted-foreground uppercase tracking-wide">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  )
}

export function UserModal({ user, open, onClose }: UserModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">
              {user.name.charAt(0)}
            </div>
            <DialogTitle className="text-lg">{user.name}</DialogTitle>
          </div>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Telefone" value={user.phone} />
          <InfoRow label="Empresa" value={user.company.name} />
          <InfoRow label="Cidade" value={user.address.city} />
        </div>
      </DialogContent>
    </Dialog>
  )
}
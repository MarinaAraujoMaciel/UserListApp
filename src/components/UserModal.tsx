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
  accent?: boolean
}

function InfoRow({ label, value, accent = false }: InfoRowProps) {
  return (
    <div className={`flex flex-col gap-1 rounded-lg p-3 ${accent ? 'bg-teal-50' : 'bg-slate-50'}`}>
      <span className={`text-xs uppercase tracking-wide font-medium ${accent ? 'text-teal-700' : 'text-slate-400'}`}>
        {label}
      </span>
      <span className={`text-sm font-medium ${accent ? 'text-teal-900' : 'text-slate-800'}`}>
        {value}
      </span>
    </div>
  )
}

export function UserModal({ user, open, onClose }: UserModalProps) {
  if (!user) return null

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md bg-white border-slate-200! outline-none! shadow-sm">

        <DialogHeader className="pb-4 border-b border-slate-100">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-lg font-medium shrink-0 ${
              user.id % 2 === 0 ? 'bg-teal-50 text-teal-700' : 'bg-slate-100 text-slate-700'
            }`}>
              {user.name.charAt(0)}
            </div>
            <div>
              <DialogTitle className="text-slate-800 text-base font-semibold">
                {user.name}
              </DialogTitle>
              <p className="text-xs text-slate-500 mt-0.5">
                {user.company.name}
              </p>
            </div>
          </div>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-3 pt-2">
          <InfoRow label="Email"    value={user.email}        accent />
          <InfoRow label="Telefone" value={user.phone}               />
          <InfoRow label="Empresa"  value={user.company.name} accent />
          <InfoRow label="Cidade"   value={user.address.city}        />
        </div>

      </DialogContent>
    </Dialog>
  )
}
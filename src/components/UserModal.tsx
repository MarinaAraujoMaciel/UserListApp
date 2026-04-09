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
    <div
      className="flex flex-col gap-1 rounded-xl p-3"
      style={{ background: accent ? '#EEEDFE' : '#f8f7ff' }}
    >
      <span
        className="text-xs uppercase tracking-wide font-medium"
        style={{ color: accent ? '#7F77DD' : '#888780' }}
      >
        {label}
      </span>
      <span
        className="text-sm font-medium"
        style={{ color: accent ? '#3C3489' : '#2C2C2A' }}
      >
        {value}
      </span>
    </div>
  )
}

export function UserModal({ user, open, onClose }: UserModalProps) {
  if (!user) return null

  const initial = user.name.charAt(0)

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md rounded-3xl overflow-hidden p-0"
        
      >
      
        <div
          className="relative px-6 pt-6 pb-10 overflow-hidden"
          style={{ background: '#7F77DD' }}
        >
          <DialogHeader className="relative z-10">
            <div className="flex items-center gap-4">
              <div
                className="flex items-center justify-center rounded-2xl text-xl font-medium shrink-0"
                style={{ width: 52, height: 52, background: 'rgba(255,255,255,0.25)', color: '#fff', border: '0.5px solid rgba(255,255,255,0.3)' }}
              >
                {initial}
              </div>
              <div>
                <DialogTitle className="text-white text-base font-medium leading-tight">
                  {user.name}
                </DialogTitle>
                <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {user.company.name}
                </p>
              </div>
            </div>
          </DialogHeader>
        </div>

        {/* conteudo */}
        <div className="px-5 pb-6 -mt-4 relative z-10">
          <div
            className="rounded-2xl p-4 grid grid-cols-2 gap-3"
            style={{ background: '#fff', border: '0.5px solid #ebe9fb', boxShadow: '0 4px 20px rgba(255, 255, 255, 0.08)' }}
          >
            <InfoRow label="Email"    value={user.email}        accent />
            <InfoRow label="Telefone" value={user.phone}               />
            <InfoRow label="Empresa"  value={user.company.name} accent />
            <InfoRow label="Cidade"   value={user.address.city}        />
          </div>
        </div>

      </DialogContent>
    </Dialog>
  )
}
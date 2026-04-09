import { SearchX } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: '#EEEDFE' }}
      >
        <SearchX className="w-6 h-6" style={{ color: '#7F77DD' }} />
      </div>
      <p className="font-medium text-sm" style={{ color: '#2C2C2A' }}>Nenhum usuário encontrado</p>
      <p className="text-xs mt-1" style={{ color: '#888780' }}>Tente buscar por outro nome</p>
    </div>
  )
}
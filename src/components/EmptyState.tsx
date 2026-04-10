import { SearchX } from 'lucide-react'

export function EmptyState() {
  return (
    <div className="text-center py-16">
      <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center mx-auto mb-4">
        <SearchX className="w-5 h-5 text-slate-600" />
      </div>
      <p className="text-sm font-medium text-slate-800">Nenhum usuário encontrado</p>
      <p className="text-xs text-slate-500 mt-1">Tente buscar por outro nome</p>
    </div>
  )
}
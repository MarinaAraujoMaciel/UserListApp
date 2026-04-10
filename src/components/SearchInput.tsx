import { Search } from 'lucide-react'
import { Input } from './ui/input'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
      <Input
        placeholder="Buscar por nome..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-9 bg-slate-50 border-slate-200 focus:border-slate-700 focus:bg-white transition-colors"
      />
    </div>
  )
}
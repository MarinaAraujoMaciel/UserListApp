import { Input } from './ui/input'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative">
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4"
        fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
      >
        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
      </svg>
      <Input
        placeholder="Buscar por nome..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="pl-9"
      />
    </div>
  )
}
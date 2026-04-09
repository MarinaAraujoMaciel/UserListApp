import { Search } from 'lucide-react'

interface SearchInputProps {
  value: string
  onChange: (value: string) => void
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <div className="relative -mt-5 mx-6 z-10">
      <Search
        className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4"
        style={{ color: '#AFA9EC' }}
      />
      <input
        type="text"
        placeholder="Buscar por nome..."
        value={value}
        onChange={e => onChange(e.target.value)}
        className="w-full rounded-2xl text-sm outline-none"
        style={{
          background: 'rgba(255,255,255,0.55)',
          backdropFilter: 'blur(8px)',
          border: '0.5px solid rgba(175,169,236,0.4)',
          padding: '12px 16px 12px 44px',
          color: '#3C3489',
          boxShadow: '0 2px 12px rgba(127,119,221,0.10)',
        }}
      />
    </div>
  )
}
import { AlertTriangle } from 'lucide-react'
import { Button } from './ui/button'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div className="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-4">
        <AlertTriangle className="w-5 h-5 text-red-700" />
      </div>
      <p className="text-sm font-medium text-slate-800 mb-4">{message}</p>
      <Button variant="outline" size="sm" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
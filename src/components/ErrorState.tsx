import { Button } from './ui/button'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16 space-y-3">
      <p className="text-4xl">⚠️</p>
      <p className="font-medium text-destructive">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        Tentar novamente
      </Button>
    </div>
  )
}
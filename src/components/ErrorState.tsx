import { AlertTriangle } from 'lucide-react'

interface ErrorStateProps {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="text-center py-16">
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4"
        style={{ background: '#FAECE7' }}
      >
        <AlertTriangle className="w-6 h-6" style={{ color: '#993C1D' }} />
      </div>
      <p className="font-medium text-sm mb-4" style={{ color: '#2C2C2A' }}>{message}</p>
      <button
        onClick={onRetry}
        className="text-sm rounded-xl px-5 py-2 transition-all duration-200"
        style={{ background: '#EEEDFE', color: '#534AB7', border: '0.5px solid #AFA9EC' }}
      >
        Tentar novamente
      </button>
    </div>
  )
}
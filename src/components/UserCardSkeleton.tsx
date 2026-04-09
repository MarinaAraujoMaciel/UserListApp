export function UserCardSkeleton() {
  return (
    <div
      className="flex items-center gap-4 rounded-2xl"
      style={{ background: '#fff', border: '0.5px solid #ebe9fb', padding: '14px 16px' }}
    >
      <div className="rounded-xl shrink-0 animate-pulse" style={{ width: 42, height: 42, background: '#EEEDFE' }} />
      <div className="flex-1 space-y-2">
        <div className="h-3.5 rounded-full animate-pulse" style={{ background: '#f0eff9', width: '55%' }} />
        <div className="h-3 rounded-full animate-pulse" style={{ background: '#f0eff9', width: '40%' }} />
      </div>
    </div>
  )
}
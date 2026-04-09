interface PageHeaderProps {
  totalUsers: number
}

export function PageHeader({ totalUsers }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #7F77DD 0%, #5DCAA5 100%)', padding: '32px 32px 52px' }}>
      <div className="relative z-10">
        <h1 className="text-white text-2xl font-medium mb-1">Usuários</h1>
        <p style={{ color: 'rgba(255,255,255,0.75)' }} className="text-sm mb-3">
          Gerencie e visualize os usuários cadastrados
        </p>
        <div
          className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs text-white"
          style={{ background: 'rgba(255,255,255,0.18)', border: '0.5px solid rgba(255,255,255,0.3)' }}
        >
          <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#9FE1CB' }} />
          {totalUsers} usuários ativos
        </div>
      </div>
    </div>
  )
}





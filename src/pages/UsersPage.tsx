import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { PageHeader } from '../components/PageHeader'
import { SearchInput } from '../components/SearchInput'
import { UserCard } from '../components/UserCard'
import { UserCardSkeleton } from '../components/UserCardSkeleton'
import { UserModal } from '../components/UserModal'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import type { User } from '../types/user'

export function UsersPage() {
  const { users, filteredUsers, isLoading, error, search, setSearch, retry } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

return (
  <main className="min-h-screen" style={{ background: '#f8f7ff' }}>
    <PageHeader totalUsers={users.length} />

    <div className="max-w-2xl mx-auto">
      <SearchInput value={search} onChange={setSearch} />

      <div className="px-6 pt-4 pb-2 flex items-center gap-2">
        {!isLoading && !error && (
          <>
            <span
              className="text-xs rounded-full px-3 py-1 font-medium"
              style={{ background: '#EEEDFE', color: '#534AB7' }}
            >
              {filteredUsers.length} encontrado{filteredUsers.length !== 1 ? 's' : ''}
            </span>
            <span
              className="text-xs rounded-full px-3 py-1 font-medium"
              style={{ background: '#E1F5EE', color: '#0F6E56' }}
            >
              API conectada
            </span>
          </>
        )}
      </div>

      <div className="px-6 pb-8 flex flex-col gap-2.5 mt-2">
        {error && <ErrorState message={error} onRetry={retry} />}

        {isLoading && Array.from({ length: 6 }).map((_, i) => (
          <UserCardSkeleton key={i} />
        ))}

        {!isLoading && !error && filteredUsers.length === 0 && <EmptyState />}

        {!isLoading && !error && filteredUsers.map(user => (
          <UserCard key={user.id} user={user} onClick={setSelectedUser} />
        ))}
      </div>
    </div>

    <UserModal
      user={selectedUser}
      open={!!selectedUser}
      onClose={() => setSelectedUser(null)}
    />
  </main>
)
}
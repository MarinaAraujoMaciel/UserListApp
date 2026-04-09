import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { UserCard } from '../components/UserCard'
import { UserCardSkeleton } from '../components/UserCardSkeleton'
import { UserModal } from '../components/UserModal'
import { SearchInput } from '../components/SearchInput'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import type { User } from '../types/user'

export function UsersPage() {
  const { filteredUsers, isLoading, error, search, setSearch, retry } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <header className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight">Usuários</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie e visualize os usuários cadastrados
          </p>
        </header>

        <div className="mb-6">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        {error && <ErrorState message={error} onRetry={retry} />}

        {isLoading && (
          <div className="grid gap-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <UserCardSkeleton key={i} />
            ))}
          </div>
        )}

        {!isLoading && !error && filteredUsers.length === 0 && <EmptyState />}

        {!isLoading && !error && filteredUsers.length > 0 && (
          <div className="grid gap-3">
            {filteredUsers.map(user => (
              <UserCard key={user.id} user={user} onClick={setSelectedUser} />
            ))}
          </div>
        )}
      </div>

      <UserModal
        user={selectedUser}
        open={!!selectedUser}
        onClose={() => setSelectedUser(null)}
      />
    </main>
  )
}
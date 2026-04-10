import { useState } from 'react'
import { useUsers } from '../hooks/useUsers'
import { usePagination } from '../hooks/usePagination'
import { SearchInput } from '../components/SearchInput'
import { UserCard } from '../components/UserCard'
import { UserCardSkeleton } from '../components/UserCardSkeleton'
import { UserModal } from '../components/UserModal'
import { EmptyState } from '../components/EmptyState'
import { ErrorState } from '../components/ErrorState'
import { Pagination } from '../components/Pagination'
import type { User } from '../types/user'

export function UsersPage() {
  const { users, filteredUsers, isLoading, error, search, setSearch, retry } = useUsers()
  const [selectedUser, setSelectedUser] = useState<User | null>(null)
  const [itemsPerPage, setItemsPerPage] = useState(5)

  const {
    paginatedData,
    currentPage,
    totalPages,
    pageSize,
    hasNextPage,
    hasPrevPage,
    goToNextPage,
    goToPrevPage,
    setPage,
    setPageSize,
  } = usePagination({ data: filteredUsers, pageSize: itemsPerPage })

  return (
    <main className="min-h-screen bg-white">
      <div className="max-w-2xl mx-auto px-4 py-12">

        <header className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight text-slate-800">Usuários</h1>
          <p className="text-slate-500 mt-1 text-sm">
            Gerencie e visualize os usuários cadastrados
          </p>
          {!isLoading && !error && (
            <div className="flex gap-2 mt-3">
              <span className="text-xs font-medium bg-slate-100 text-slate-700 px-3 py-1 rounded-full">
                {users.length} ativos
              </span>
              <span className="text-xs font-medium bg-teal-50 text-teal-700 px-3 py-1 rounded-full">
                ● API conectada
              </span>
            </div>
          )}
        </header>

        <div className="mb-4">
          <SearchInput value={search} onChange={setSearch} />
        </div>

        <div className="border-t border-slate-100 pt-4">
          {error && <ErrorState message={error} onRetry={retry} />}

          {isLoading && (
            <div className="flex flex-col gap-3">
              {Array.from({ length: 5 }).map((_, i) => (
                <UserCardSkeleton key={i} />
              ))}
            </div>
          )}

          {!isLoading && !error && filteredUsers.length === 0 && <EmptyState />}

          {!isLoading && !error && filteredUsers.length > 0 && (
            <>
              <div className="flex flex-col gap-2">
                {paginatedData.map(user => (
                  <UserCard key={user.id} user={user} onClick={setSelectedUser} />
                ))}
              </div>

              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                totalItems={users.length}
                pageSize={pageSize}
                filteredCount={filteredUsers.length}
                hasNextPage={hasNextPage}
                hasPrevPage={hasPrevPage}
                onNext={goToNextPage}
                onPrev={goToPrevPage}
                onPageChange={setPage}
                onPageSizeChange={(size) => {
                  setItemsPerPage(size)
                  
                }}
              />
            </>
          )}
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
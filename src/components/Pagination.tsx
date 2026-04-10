import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Button } from './ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select'

interface PaginationProps {
  currentPage: number
  totalPages: number
  totalItems: number
  pageSize: number
  filteredCount: number
  hasNextPage: boolean
  hasPrevPage: boolean
  onNext: () => void
  onPrev: () => void
  onPageSizeChange: (size: number) => void
}

export function Pagination({
  currentPage,
  totalPages,
  totalItems,
  pageSize,
  filteredCount,
  hasNextPage,
  hasPrevPage,
  onNext,
  onPrev,
  onPageSizeChange,
}: PaginationProps) {
  return (
    <div className="flex flex-col gap-3 mt-4">

      {/* info de resultados */}
      <div className="flex items-center justify-between px-1">
        <p className="text-sm text-muted-foreground">
            
          {filteredCount < totalItems ? ( // mostrando resultado filtrado) : ( // mostrando resultado total) }
            <>
              <span className="font-medium text-foreground">{filteredCount}</span> de{' '}
              <span className="font-medium text-foreground">{totalItems}</span> usuários encontrados
            </>
          ) : (
            <>
              <span className="font-medium text-foreground">{totalItems}</span> usuários no total
            </>
          )}
        </p>

        {/* tamanho da página, itens por página */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Por página</span>
          <Select
            value={String(pageSize)}
            onValueChange={val => onPageSizeChange(Number(val))}
          >
            
            <SelectTrigger className="w-16 h-8 text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="3">3</SelectItem>
              <SelectItem value="5">5</SelectItem>
              <SelectItem value="10">10</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* navegação */}
      <div className="flex items-center justify-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={onPrev}
          disabled={!hasPrevPage}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="w-4 h-4" />
        </Button>

        {/* números das páginas, o que for as vizinhas entram com reticencias 1...4 */}
        <div className="flex items-center gap-1">
          {Array.from({ length: totalPages }).map((_, i) => {
            const page = i + 1
            const isActive = page === currentPage
            const isNearCurrent = Math.abs(page - currentPage) <= 1
            const isEdge = page === 1 || page === totalPages

            if (!isNearCurrent && !isEdge) {
              if (page === 2 || page === totalPages - 1) {
                return <span key={page} className="text-muted-foreground text-sm px-1">…</span>
              }
              return null
            }

            return (
              <button
                key={page}
                className={`h-8 w-8 rounded-md text-sm transition-colors ${
                  isActive
                    ? 'bg-primary text-primary-foreground font-medium'
                    : 'text-muted-foreground hover:bg-muted'
                }`}
              >
                {page}
              </button>
            )
          })}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={onNext}
          disabled={!hasNextPage}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="w-4 h-4" />
        </Button>
      </div>

    </div>
  )
}
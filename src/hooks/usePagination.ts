import { useState, useMemo } from 'react'

interface UsePaginationProps<T> {
  data: T[] // array de dados a ser paginado
  pageSize: number // número de itens por página
}

interface UsePaginationReturn<T> {
  currentPage: number
  pageSize: number
  totalPages: number
  totalItems: number
  paginatedData: T[]
  setPage: (page: number) => void
  setPageSize: (size: number) => void
  goToNextPage: () => void
  goToPrevPage: () => void
  hasNextPage: boolean
  hasPrevPage: boolean
}

// hook de paginação, recebe um array de dados e o tamanho da página, retorna os dados paginados e funções para navegar entre as páginas

export function usePagination<T>({ data, pageSize }: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1)

  // removido: const [pageSize, setPageSizeState] = useState(initialPageSize)
  // pageSize agora vem direto da prop

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize))

  const safePage = Math.min(currentPage, totalPages)

  const paginatedData = useMemo(() => {
    const start = (safePage - 1) * pageSize
    return data.slice(start, start + pageSize)
  }, [data, safePage, pageSize])

  function setPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  // removido: function setPageSize — agora é controlado pelo UsersPage via itemsPerPage
  function setPageSize(size: number) {
    setCurrentPage(1)
  }

  return {
    currentPage: safePage,
    pageSize,
    totalPages,
    totalItems: data.length,
    paginatedData,
    setPage,
    setPageSize,
    goToNextPage: () => setPage(safePage + 1),
    goToPrevPage: () => setPage(safePage - 1),
    hasNextPage: safePage < totalPages,
    hasPrevPage: safePage > 1,
  }
}
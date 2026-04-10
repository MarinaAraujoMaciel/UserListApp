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

export function usePagination<T>({ data, pageSize: initialPageSize }: UsePaginationProps<T>): UsePaginationReturn<T> {
  const [currentPage, setCurrentPage] = useState(1) // página atual, começa em 1
  const [pageSize, setPageSizeState] = useState(initialPageSize) // tamanho da página, pode ser alterado

  const totalPages = Math.max(1, Math.ceil(data.length / pageSize)) // total de páginas, calculado a partir do tamanho dos dados e do tamanho da página, mínimo 1

  const safePage = Math.min(currentPage, totalPages)

  // calcula os dados paginados usando useMemo para evitar cálculos desnecessários, depende dos dados, da página atual e do tamanho da página
  const paginatedData = useMemo(() => { // calcula o índice inicial do slice a partir da página atual e do tamanho da página
    const start = (safePage - 1) * pageSize // retorna o slice dos dados correspondente à página atual
    return data.slice(start, start + pageSize) // slice do array de dados, do índice inicial até o índice inicial + tamanho da página
  }, [data, safePage, pageSize]) // recalcula os dados paginados sempre que os dados, a página atual ou o tamanho da página mudarem

  function setPage(page: number) {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)))
  }

  function setPageSize(size: number) {
    setPageSizeState(size)
    setCurrentPage(1) // resetar para a primeira página quando o tamanho da página mudar
  }

  // retorna o estado e as funções para navegação
  return {
    currentPage: safePage,
    pageSize,
    totalPages,
    totalItems: data.length,
    paginatedData,
    setPage,
    setPageSize,
    goToNextPage: () => setPage(safePage + 1), // navega para a próxima página
    goToPrevPage: () => setPage(safePage - 1), // navega para a próxima ou anterior página
    hasNextPage: safePage < totalPages, // tem próxima página se a página atual for menor que o total de páginas    
    hasPrevPage: safePage > 1, // tem página anterior se a página atual for maior que 1
  }
}
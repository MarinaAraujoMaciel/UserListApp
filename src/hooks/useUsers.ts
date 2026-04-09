import { useState, useEffect, useMemo } from 'react'
import { useDebounce } from 'use-debounce'
import { fetchUsers } from '../api/users'
import type { User } from '../types/user'

// Define o "contrato" do hook — tudo que ele vai entregar para quem o usar
interface UseUsersReturn {
  users: User[]                        // lista completa de usuários da API
  filteredUsers: User[]                // lista filtrada pelo texto de busca
  isLoading: boolean                   // true enquanto a API ainda não respondeu
  error: string | null                 // mensagem de erro, ou null se estiver tudo bem
  search: string                       // texto atual do campo de busca
  setSearch: (value: string) => void   // função para atualizar o texto de busca
  retry: () => void                    // função para tentar buscar na API de novo
}

export function useUsers(): UseUsersReturn {

  // Lista completa de usuários vindos da API
  const [users, setUsers] = useState<User[]>([])
  // Controla se a aplicação está carregando os dados da API (true = carregando, false = carregou ou deu erro)
  const [isLoading, setIsLoading] = useState(true)
  // Guarda a mensagem de erro caso a API falhe (null = sem erro, string = mensagem de erro)
  const [error, setError] = useState<string | null>(null)
  // Texto que o usuário está digitando no campo de busca
  const [search, setSearch] = useState('')
  // Número que incrementa para forçar o useEffect a rodar de novo e refazer a busca na API (usado para retry)
  const [fetchKey, setFetchKey] = useState(0)
  // Versão "atrasada" do search — só atualiza 300ms depois que o usuário parar de digitar
  // Evita filtrar a lista a cada letra digitada
  const [debouncedSearch] = useDebounce(search, 300)
  // Roda quando o componente monta na tela, e novamente toda vez que fetchKey mudar
  useEffect(() => {
    // Variável para controlar se o componente foi desmontado enquanto a API estava carregando
    let cancelled = false

    async function loadUsers() {
      setIsLoading(true)   // ativa o loading antes de começar a busca
      setError(null)       // limpa qualquer erro anterior

      try {
        const data = await fetchUsers() // chama a API para buscar os usuários
        if (!cancelled) setUsers(data) // se o componente ainda estiver montado, guarda os usuários no estado
      } catch (err) {
        // Se a API falhar, guarda a mensagem de erro no estado
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Erro desconhecido')
        }
      } finally {
        // Desativa o loading independente de ter dado certo ou errado
        if (!cancelled) setIsLoading(false)
      }
    }

    loadUsers()

    return () => { cancelled = true }

  }, [fetchKey]) // O useEffect depende de fetchKey, então toda vez que ele mudar, a função loadUsers vai rodar de novo

  // useMemo para calcular a lista de usuários filtrada com base no texto de busca e na lista completa de usuários
  const filteredUsers = useMemo(() => {

    // Se a busca estiver vazia, retorna todos os usuários sem filtrar
    if (!debouncedSearch.trim()) return users

    // Filtra pelo nome, ignorando maiúsculas e minúsculas
    return users.filter(user =>
      user.name.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

  }, [users, debouncedSearch])


  // Retorna tudo que os componentes precisam para funcionar
  return {
    users,
    filteredUsers,
    isLoading,
    error,
    search,
    setSearch,
    // Incrementa o fetchKey para disparar o useEffect novamente (retry)
    retry: () => setFetchKey(k => k + 1),
  }
}
# 👥 UserListApp

Aplicação frontend desenvolvida como projeto de portfólio e teste técnico, consumindo a API pública [JSONPlaceholder](https://jsonplaceholder.typicode.com/users) para listagem, busca e visualização de usuários com paginação.

---

## 🚀 Tecnologias

- **React** com **Vite**
- **TypeScript**
- **TailwindCSS v4**
- **shadcn/ui** (Radix UI)
- **Lucide React** (ícones)
- **use-debounce**

---

## ▶️ Como rodar

```bash
# Clone o repositório
git clone https://github.com/MarinaAraujoMaciel/UserListApp.git

# Entre na pasta
cd UserListApp

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse em `http://localhost:5173`

---

## 📁 Estrutura de pastas

```
src/
├── api/
│   └── users.ts                # Camada de comunicação com a API
├── components/
│   ├── ui/                     # Componentes do shadcn/ui
│   ├── EmptyState.tsx          # Estado vazio na busca
│   ├── ErrorState.tsx          # Estado de erro com retry
│   ├── Pagination.tsx          # Componente de paginação
│   ├── SearchInput.tsx         # Campo de busca
│   ├── UserCard.tsx            # Card de usuário
│   ├── UserCardSkeleton.tsx    # Skeleton de loading
│   └── UserModal.tsx           # Modal com detalhes do usuário
├── hooks/
│   ├── usePagination.ts        # Hook de paginação
│   └── useUsers.ts             # Hook de busca e estado dos usuários
├── types/
│   └── user.ts                 # Tipagem completa dos usuários
└── pages/
    └── UsersPage.tsx           # Página principal
```

---

## ✅ Funcionalidades

- Listagem de usuários consumindo API pública
- Exibição de nome e email em cards
- Busca por nome em tempo real com debounce de 300ms
- Contador de resultados — exibe quantos usuários foram encontrados no filtro
- Paginação com seletor de itens por página (3, 5 ou 10)
- Navegação entre páginas por botões numéricos ou setas
- Modal ao clicar no usuário exibindo nome, email, telefone, empresa e cidade
- Estado de loading com skeleton animado
- Estado de erro com botão de retry
- Empty state quando nenhum usuário é encontrado na busca
- Avatares com cores alternadas baseadas no ID do usuário
- Badges de status (usuários ativos e API conectada)
- Layout centralizado e responsivo

---

## 🎨 Design

Interface desenvolvida com paleta institucional **Grafite & Petróleo**:

- Fundo branco com acentos em `slate` e `teal`
- Cards com borda sutil e hover destacando a borda em grafite
- Avatares quadrados arredondados alternando entre `slate-100` e `teal-50`
- Badges de status em tons neutros
- Modal com informações organizadas em grid, alternando cores de destaque
- Paginação limpa com navegação centralizada e seletor de itens à direita

---

## 🧠 Arquitetura

### Separação de responsabilidades

| Camada | Responsabilidade |
|--------|-----------------|
| `src/api` | Fetch e tratamento de resposta da API |
| `src/hooks/useUsers` | Estado, filtro, loading, erro e retry |
| `src/hooks/usePagination` | Fatiamento de dados, navegação entre páginas |
| `src/components` | Renderização visual sem lógica de negócio |
| `src/types` | Contratos de tipagem TypeScript |
| `src/pages` | Composição dos componentes na tela |

---

### Hook `useUsers`

Centraliza toda a lógica de dados:

- Busca os dados na API ao montar o componente
- Controla os estados de `loading`, `error` e `data`
- Aplica debounce de 300ms na busca por nome
- Filtra a lista com `useMemo` para evitar recálculos desnecessários
- Expõe a função `retry` para recarregar os dados em caso de erro
- Utiliza flag `cancelled` para evitar memory leak em unmount

---

### Hook `usePagination`

Recebe a lista filtrada e gerencia a paginação:

- Fatia os dados com base na página atual e no tamanho da página
- Calcula total de páginas dinamicamente
- Usa `safePage` para evitar páginas inexistentes ao filtrar
- Expõe `setPage`, `goToNextPage`, `goToPrevPage`, `setPageSize`
- Reseta para a página 1 ao mudar o tamanho da página

---

## 🌿 GitFlow

O projeto seguiu o fluxo GitFlow com as seguintes branches:

```
main
└── dev
    ├── feature/estrutura         # Setup inicial, dependências e pastas
    ├── feature/types             # Tipagem TypeScript dos usuários
    ├── feature/api-users         # Camada de API
    ├── feature/hooks             # Hook useUsers
    ├── feature/components        # Componentes visuais
    ├── feature/pages             # Página principal e App.tsx
    ├── feature/ui-redesign       # Redesign visual
    ├── feature/pagination        # Paginação com seletor de itens por página
    └── style/institutional-theme # Paleta grafite & petróleo
```

Cada feature branch foi mergeada via **Pull Request** para a `dev`. Ao final, `dev` foi mergeada na `main` com tag de versão `v1.0.0`.



## 👩‍💻 Desenvolvido por

**Marina Araujo Maciel**  
[github.com/MarinaAraujoMaciel](https://github.com/MarinaAraujoMaciel)

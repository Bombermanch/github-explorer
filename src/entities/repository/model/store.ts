import { create } from 'zustand'
import { Repository } from './types'

interface PageInfo {
  endCursor: string
  hasNextPage: boolean
}

interface RepositoryStore {
  repositories: Repository[]
  currentPage: number
  searchQuery: string
  totalCount: number
  isLoading: boolean
  error: string | null
  pageInfo: PageInfo | null
  cursors: Record<number, string>
  
  setRepositories: (repos: Repository[]) => void
  setCurrentPage: (page: number) => void
  setSearchQuery: (query: string) => void
  setTotalCount: (count: number) => void
  setLoading: (loading: boolean) => void
  setError: (error: string | null) => void
  setPageInfo: (pageInfo: PageInfo) => void
  setCursor: (page: number, cursor: string) => void
}

const getInitialState = () => {
  const params = new URLSearchParams(window.location.search)
  return {
    currentPage: parseInt(params.get('page') || '1'),
    searchQuery: params.get('query') || ''
  }
}

const { currentPage: initialPage, searchQuery: initialQuery } = getInitialState()

export const useRepositoryStore = create<RepositoryStore>((set) => ({
  repositories: [],
  currentPage: initialPage,
  searchQuery: initialQuery,
  totalCount: 0,
  isLoading: false,
  error: null,
  pageInfo: null,
  cursors: {},

  setRepositories: (repos) => set({ repositories: repos }),
  setCurrentPage: (page) => {
    set({ currentPage: page })
    const params = new URLSearchParams(window.location.search)
    params.set('page', page.toString())
    window.history.pushState({}, '', `?${params.toString()}`)
  },
  setSearchQuery: (query) => {
    set({ searchQuery: query, currentPage: 1, cursors: {} })
    const params = new URLSearchParams(window.location.search)
    params.set('query', query)
    params.set('page', '1')
    window.history.pushState({}, '', `?${params.toString()}`)
  },
  setTotalCount: (count) => set({ totalCount: count }),
  setLoading: (loading) => set({ isLoading: loading }),
  setError: (error) => set({ error }),
  setPageInfo: (pageInfo) => set({ pageInfo }),
  setCursor: (page, cursor) => 
    set((state) => ({ 
      cursors: { ...state.cursors, [page]: cursor } 
    }))
})) 
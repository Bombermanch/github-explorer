import { useEffect } from 'react'
import { useRepositoryStore } from '@/entities/repository/model/store'
import { searchRepositories } from '@/entities/repository/api/repositoryApi'

export const useRepositoryPagination = () => {
  const { 
    currentPage,
    searchQuery,
    cursors,
    setRepositories,
    setTotalCount,
    setLoading,
    setError,
    setPageInfo,
    setCursor
  } = useRepositoryStore()

  useEffect(() => {
    const loadPage = async () => {
      if (currentPage === 1) return // Пропускаем первую страницу, она загружается через SearchBar

      try {
        setLoading(true)
        setError(null)

        const cursor = cursors[currentPage - 1]
        const data = await searchRepositories(searchQuery, currentPage, cursor)

        setRepositories(data.search.edges.map(edge => edge.node))
        setTotalCount(Math.min(data.search.repositoryCount, 100))
        setPageInfo(data.search.pageInfo)

        if (data.search.pageInfo.endCursor) {
          setCursor(currentPage, data.search.pageInfo.endCursor)
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Произошла ошибка при загрузке страницы')
      } finally {
        setLoading(false)
      }
    }

    if (currentPage > 1) {
      loadPage()
    }
  }, [currentPage, searchQuery])

  return null
} 
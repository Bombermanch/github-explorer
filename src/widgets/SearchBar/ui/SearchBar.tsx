import { useState, useEffect } from 'react'
import { useRepositoryStore } from '@/entities/repository/model/store'
import { searchRepositories } from '@/entities/repository/api/repositoryApi'

export const SearchBar = () => {
  const { 
    setRepositories, 
    setTotalCount, 
    setLoading, 
    setError,
    searchQuery,
    setSearchQuery,
    currentPage,
    pageInfo,
    setPageInfo,
    cursors,
    setCursor
  } = useRepositoryStore()
  const [value, setValue] = useState(searchQuery)

  const handleSearch = async (query: string, page: number) => {
    try {
      setLoading(true)
      setError(null)

      const cursor = page === 1 ? undefined : cursors[page - 1]

      const data = await searchRepositories(query, page, cursor)

      setRepositories(data.search.edges.map(edge => edge.node))
      setTotalCount(Math.min(data.search.repositoryCount, 100))
      setPageInfo(data.search.pageInfo)

      if (data.search.pageInfo.endCursor) {
        setCursor(page, data.search.pageInfo.endCursor)
      }
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Произошла ошибка при поиске')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearchQuery(value)
      handleSearch(value, currentPage)
    }, 500)

    return () => clearTimeout(timer)
  }, [value, currentPage])

  return (
    <div className="search-bar">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Поиск репозиториев..."
        className="search-input"
      />
    </div>
  )
} 
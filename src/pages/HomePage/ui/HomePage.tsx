import { SearchBar } from '@/widgets/SearchBar'
import { RepositoryList } from '@/widgets/RepositoryList'
import { Pagination } from '@/widgets/Pagination'
import { useRepositoryPagination } from '@/features/searchRepository/hooks/useRepositoryPagination'

export const HomePage = () => {
  useRepositoryPagination()

  return (
    <div className="home-page">
      <h1>GitHub Repositories</h1>
      <SearchBar />
      <RepositoryList />
      <Pagination />
    </div>
  )
} 
import { SearchBar } from '@/widgets/SearchBar'
import { RepositoryList } from '@/widgets/RepositoryList'
import { Pagination } from '@/widgets/Pagination'

export const HomePage = () => {
  return (
    <div className="home-page">
      <h1>GitHub Repositories</h1>
      <SearchBar />
      <RepositoryList />
      <Pagination />
    </div>
  )
} 
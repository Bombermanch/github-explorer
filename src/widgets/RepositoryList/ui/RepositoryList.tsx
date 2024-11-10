import { useRepositoryStore } from '@/entities/repository/model/store'
import { RepositoryItem } from './RepositoryItem'

export const RepositoryList = () => {
  const { repositories, isLoading, error } = useRepositoryStore()

  if (isLoading) {
    return <div className="repository-list-loading">Загрузка...</div>
  }

  if (error) {
    return <div className="repository-list-error">Ошибка: {error}</div>
  }

  if (repositories.length === 0) {
    return <div className="repository-list-empty">Репозитории не найдены</div>
  }

  return (
    <div className="repository-list">
      {repositories.map((repo) => (
        <RepositoryItem key={repo.id} repository={repo} />
      ))}
    </div>
  )
} 
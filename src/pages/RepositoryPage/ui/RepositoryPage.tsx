import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { githubClient } from '@/shared/api/github'
import { GET_REPOSITORY } from '@/entities/repository/api/queries'
import { Repository } from '@/entities/repository/model/types'

export const RepositoryPage = () => {
  const { owner, name } = useParams()
  const [repository, setRepository] = useState<Repository | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchRepository = async () => {
      if (!owner || !name) return

      try {
        setIsLoading(true)
        setError(null)

        const data = await githubClient.request<{ repository: Repository }>(
          GET_REPOSITORY,
          { owner, name }
        )

        setRepository(data.repository)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ошибка при загрузке репозитория')
      } finally {
        setIsLoading(false)
      }
    }

    fetchRepository()
  }, [owner, name])

  if (isLoading) {
    return <div>Загрузка...</div>
  }

  if (error) {
    return <div>Ошибка: {error}</div>
  }

  if (!repository) {
    return <div>Репозиторий не найден</div>
  }

  return (
    <div className="repository-page">
      <div className="repository-header">
        <h1>{repository.name}</h1>
        <div className="repository-stats">
          <span>⭐ {repository.stargazerCount}</span>
          <span>
            Последнее обновление: {new Date(repository.updatedAt).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="repository-owner">
        <img 
          src={repository.owner.avatarUrl} 
          alt={repository.owner.login}
          className="owner-avatar"
        />
        <a 
          href={`https://github.com/${repository.owner.login}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          {repository.owner.login}
        </a>
      </div>

      {repository.description && (
        <div className="repository-description">
          <h2>Описание</h2>
          <p>{repository.description}</p>
        </div>
      )}

      <div className="repository-languages">
        <h2>Используемые языки</h2>
        <div className="language-list">
          {repository.languages.nodes.map((lang, index) => (
            <span key={index} className="language-tag">
              {lang.name}
            </span>
          ))}
        </div>
      </div>

      <a 
        href={repository.url}
        target="_blank"
        rel="noopener noreferrer"
        className="github-link"
      >
        Открыть на GitHub
      </a>
    </div>
  )
} 
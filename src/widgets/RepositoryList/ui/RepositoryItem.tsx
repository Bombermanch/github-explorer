import { Link } from 'react-router-dom'
import { Repository } from '@/entities/repository/model/types'

interface RepositoryItemProps {
  repository: Repository
}

export const RepositoryItem = ({ repository }: RepositoryItemProps) => {
  const formattedDate = new Date(repository.updatedAt).toLocaleDateString()

  return (
    <div className="repository-item">
      <Link 
        to={`/repository/${repository.owner.login}/${repository.name}`}
        className="repository-name"
      >
        {repository.name}
      </Link>
      
      <div className="repository-info">
        <span className="stars">⭐ {repository.stargazerCount}</span>
        <span className="update-date">
          Последний коммит: {formattedDate}
        </span>
        <a 
          href={repository.url}
          target="_blank"
          rel="noopener noreferrer"
          className="github-link"
        >
          GitHub ↗
        </a>
      </div>
    </div>
  )
} 
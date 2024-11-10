import { useRepositoryStore } from '@/entities/repository/model/store'

const ITEMS_PER_PAGE = 10
const MAX_PAGES_SHOWN = 10

export const Pagination = () => {
  const { totalCount, currentPage, setCurrentPage } = useRepositoryStore()
  
  const totalPages = Math.min(
    Math.ceil(totalCount / ITEMS_PER_PAGE),
    MAX_PAGES_SHOWN
  )

  if (totalPages <= 1) return null

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1)

  return (
    <div className="pagination">
      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ←
      </button>

      {pages.map((page) => (
        <button
          key={page}
          className={`pagination-button ${currentPage === page ? 'active' : ''}`}
          onClick={() => setCurrentPage(page)}
        >
          {page}
        </button>
      ))}

      <button
        className="pagination-button"
        onClick={() => setCurrentPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        →
      </button>
    </div>
  )
} 
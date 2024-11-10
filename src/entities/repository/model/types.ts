export interface Repository {
  id: string
  name: string
  url: string
  stargazerCount: number
  updatedAt: string
  owner: {
    login: string
    avatarUrl: string
  }
  description: string
  languages: {
    nodes: Array<{
      name: string
    }>
  }
}

export interface RepositorySearchResponse {
  search: {
    repositoryCount: number
    edges: Array<{
      cursor: string
      node: Repository
    }>
    pageInfo: {
      endCursor: string
      hasNextPage: boolean
    }
  }
} 
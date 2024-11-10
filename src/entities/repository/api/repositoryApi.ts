import { githubClient } from '@/shared/api/github'
import { SEARCH_REPOSITORIES } from './queries'
import { RepositorySearchResponse } from '../model/types'

const ITEMS_PER_PAGE = 10

export const searchRepositories = async (
  query: string,
  page: number,
  cursor?: string
) => {
  const variables = {
    query: query || 'is:public',
    first: ITEMS_PER_PAGE,
    after: cursor
  }

  return await githubClient.request<RepositorySearchResponse>(
    SEARCH_REPOSITORIES,
    variables
  )
} 
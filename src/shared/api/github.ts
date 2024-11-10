import { GraphQLClient } from 'graphql-request'

if (!import.meta.env.VITE_GITHUB_TOKEN) {
  throw new Error('GitHub token is required')
}

export const githubClient = new GraphQLClient('https://api.github.com/graphql', {
  headers: {
    authorization: `Bearer ${import.meta.env.VITE_GITHUB_TOKEN}`,
  },
}) 
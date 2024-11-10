export const SEARCH_REPOSITORIES = `
  query SearchRepositories($query: String!, $first: Int!, $after: String) {
    search(query: $query, type: REPOSITORY, first: $first, after: $after) {
      repositoryCount
      edges {
        cursor
        node {
          ... on Repository {
            id
            name
            url
            stargazerCount
            updatedAt
            owner {
              login
              avatarUrl
            }
            description
            languages(first: 10) {
              nodes {
                name
              }
            }
          }
        }
      }
      pageInfo {
        endCursor
        hasNextPage
      }
    }
  }
`

export const GET_REPOSITORY = `
  query GetRepository($owner: String!, $name: String!) {
    repository(owner: $owner, name: $name) {
      id
      name
      url
      stargazerCount
      updatedAt
      owner {
        login
        avatarUrl
      }
      description
      languages(first: 10) {
        nodes {
          name
        }
      }
    }
  }
` 
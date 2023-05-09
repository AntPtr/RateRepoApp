import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query Query($searchKeyword: String, $orderDirection: OrderDirection, $orderBy: AllRepositoriesOrderBy){
    repositories(searchKeyword: $searchKeyword, orderDirection: $orderDirection, orderBy: $orderBy) {
      edges {
        node {
          fullName
          description
          language
          stargazersCount
          forksCount
          reviewCount
          ratingAverage
          ownerAvatarUrl
          id
        }
      }
    }
  }
`;

export const GET_ME = gql `
query getCurrentUser($includeReviews: Boolean = false) {
  me {
    id
    username
    reviews @include(if: $includeReviews) {
      edges {
        node {
          id
          repositoryId
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
      }
    }
  }
}
`

export const SINGLE_REP = gql `
query repository($repositoryId: ID!, $first: Int, $after: String){
  repository(id: $repositoryId) {
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    ownerAvatarUrl
    url
    reviews(first: $first, after: $after) {
      edges {
        node {
          id
          text
          rating
          createdAt
          user {
            id
            username
          }
        }
        cursor
      }
      pageInfo {
        endCursor
        startCursor
        hasNextPage
      }
    }
  }
}`

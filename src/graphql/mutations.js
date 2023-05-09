import { gql } from '@apollo/client';

export const LOGIN = gql`
mutation authenticate($input: AuthenticateInput) {
    authenticate(credentials: $input){
        accessToken
    }
}
`;

export const CREATE_REWIEV = gql`
mutation createReview($input: CreateReviewInput) {
    createReview(review: $input){
        id
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($input: CreateUserInput) {
    createUser(user: $input) {
      username
    }
}
`;

export const DELETE_REVIEW = gql`
mutation Mutation($deleteReviewId: ID!) {
    deleteReview(id: $deleteReviewId)
  }
`;



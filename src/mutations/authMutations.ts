import { gql } from '@apollo/client';

export const LOGIN = gql`
    mutation login($loginInput: LoginInput!) {
        login(loginInput: $loginInput){
            accessToken
        }
    }
`;

export const SIGN_UP = gql`
    mutation createUser($createUserInput: CreateUserInput!) {
        createUser(createUserInput: $createUserInput){
          id
          name
          email
        }
    }
`;

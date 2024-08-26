import { gql } from '@apollo/client';

export const GET_QUESTIONS = gql`
  query getQuestionsByUser($userId: Int!) {
    getQuestionsByUser(userId: $userId) {
      id
      question
      answerFormat
    }
  }
`;


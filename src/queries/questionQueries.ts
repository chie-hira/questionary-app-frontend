import { gql } from "@apollo/client";

export const GET_QUESTIONS = gql`
    query getQuestionsByUser($userId: Int!) {
        getQuestionsByUser(userId: $userId) {
            id
            question
            answerFormat
        }
    }
`;

export const GET_DESCRIPTION_ANSWERS = gql`
    query getDescriptionAnswersByQuestionId($questionId: Int!) {
        getDescriptionAnswersByQuestionId(questionId: $questionId) {
            id
            description
            question {
                question
            }
        }
    }
`;

export const GET_QUESTION = gql`
    query getQuestionById($id: Int!) {
        getQuestionById(id: $id) {
            id
            question
            answerFormat
            answerChoices {
                id
                answerChoice
            }
        }
    }
`;

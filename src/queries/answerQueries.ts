import { gql } from '@apollo/client';

export const GET_ANSWER_DETAILS = gql`
    query getAnswerDetailsByQuestionId($questionId: Int!) {
        getAnswerDetailsByQuestionId(questionId: $questionId) {
            id
            question {
              question
            }
            answerChoice{
              answerChoice
            }
        }
    }
`;

export const GET_AGGREGATE_ANSWER = gql`
    query getAggregatedAnswerByQuestionId($questionId: Int!) {
        getAggregatedAnswerByQuestionId(questionId: $questionId) {
            questionId
            question
            choiceId
            choice
            count
        }
    }
`;

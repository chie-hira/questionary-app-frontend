import { gql } from '@apollo/client';

export const GET_COUNT_ANSWER_RESPONDENTS = gql`
    query countAnswerRespondentsByQuestionId($questionId: Int!) {
        countAnswerRespondentsByQuestionId(questionId: $questionId)
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

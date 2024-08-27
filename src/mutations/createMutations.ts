import { gql } from "@apollo/client";

export const CREATE_QUESTION = gql`
    mutation createQuestionWithAnswerChoices(
        $createQuestionInput: CreateQuestionInput!
        $createAnswerChoicesInput: [CreateAnswerChoiceInput!]!
    ) {
        createQuestionWithAnswerChoices(
            createQuestionInput: $createQuestionInput
            createAnswerChoicesInput: $createAnswerChoicesInput
        ) {
            id
            question
            answerChoices {
                id
                answerChoice
            }
        }
    }
`;

export const CREATE_ANSWER = gql`
    mutation createAnswerWithRespondent(
        $createAnswerResultInput: CreateAnswerResultInput!
        $createAnswerDetailsInput: [CreateAnswerDetailInput!]!
        $createRespondentInput: CreateRespondentInput!
    ) {
        createAnswerWithRespondent(
            createAnswerResultInput: $createAnswerResultInput
            createAnswerDetailsInput: $createAnswerDetailsInput
            createRespondentInput: $createRespondentInput
        ) {
            id
            description
            answerDetails {
                id
                answerChoice {
                    id
                    answerChoice
                }
            }
        }
    }
`;

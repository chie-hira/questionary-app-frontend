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

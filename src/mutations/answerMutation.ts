import { gql } from "@apollo/client";

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

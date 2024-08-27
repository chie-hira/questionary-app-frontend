import { AnswerChoice, AnswerFormat } from "./answer";

export type Question = {
    id: string;
    question: string;
    answerFormat: AnswerFormat;
    answerChoices?: AnswerChoice[];
};

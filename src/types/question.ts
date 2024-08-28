import { AnswerChoice, AnswerFormat } from "./answer";

export type Question = {
    id: number;
    question: string;
    answerFormat: AnswerFormat;
    answerChoices?: AnswerChoice[];
};

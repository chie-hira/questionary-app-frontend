import { AnswerFormat } from "./answerFormat.enum";

export type Question = {
    id: string;
    question: string;
    answerFormat: AnswerFormat;
};

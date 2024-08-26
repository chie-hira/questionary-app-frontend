import {AnswerFormat} from "./AnswerFormat.enum";

export type Question = {
  id: string;
  question: string;
  answerFormat: AnswerFormat;
};

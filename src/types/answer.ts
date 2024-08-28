import {Question} from "./question";
import {Respondent} from "./respondent";

export type AnswerResult = {
    id: number;
    question: Question;
    respondent: Respondent;
    answerDetails: AnswerDetail[];
};

export type AnswerChoice = {
    id: string;
    answerChoice: string;
};

export type AnswerDetail = {
    id: number;
    question?: Question;
    answerChoice: AnswerChoice;
};

export type AggregatedAnswer = {
    questionId: number;
    question: string;
    choiceId: number;
    choice: string;
    count: number;
};

export enum AnswerFormat {
  ONE_CHOICE = "ONE_CHOICE",
  MULTIPLE_CHOICE = "MULTIPLE_CHOICE",
  DESCRIPTION = "DESCRIPTION",
}

export function getAnswerFormatDisplay(format: AnswerFormat): string {
  switch (format) {
    case AnswerFormat.ONE_CHOICE:
      return "選択式(一択)";
    case AnswerFormat.MULTIPLE_CHOICE:
      return "選択式(複数可)";
    case AnswerFormat.DESCRIPTION:
      return "記述式";
    default:
      return "不明な形式";
  }
}

export function getAnswerFormatSentence(format: AnswerFormat): string {
  switch (format) {
    case AnswerFormat.ONE_CHOICE:
      return "次の中から1つ選択してください";
    case AnswerFormat.MULTIPLE_CHOICE:
      return "次の中から該当するものをすべて選択してください";
    case AnswerFormat.DESCRIPTION:
      return "200文字以内で記述してください";
    default:
      return "不明な形式";
  }
}

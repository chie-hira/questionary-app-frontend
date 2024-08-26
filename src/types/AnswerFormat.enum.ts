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

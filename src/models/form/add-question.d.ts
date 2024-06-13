import { EQuestionType } from "@/enums/question";

export interface IAddQuestionForm {
  type: EQuestionType;
  question: string;
  paragraph?: string;
}
const dasd = [
  {
    content: "Terst 1",
    answers: [
      {
        content: "1",
        isCorrect: false,
      },
      {
        content: "2",
        isCorrect: true,
      },
    ],
  },
];

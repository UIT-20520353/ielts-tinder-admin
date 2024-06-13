import { EQuestionType } from "@/enums/question";

export interface IAnswer {
  content: string;
  isCorrect: boolean;
}

export interface IQuestionDetail {
  content: string;
  answers: IAnswer[];
}

export interface IAddQuestionForm {
  type: EQuestionType;
  paragraph?: string;
  questionDetails: IQuestionDetail[];
  description?: string;
}

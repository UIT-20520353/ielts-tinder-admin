import { EQuestionType } from "@/enums/question";
import { IAnswer } from "./answer";

export interface IQuestionDetail {
  id: number;
  text: string;
  explain: string;
  answers: IAnswer[];
}

export interface IQuestion {
  id: number;
  paragraph: string;
  audioUrl: string;
  type: EQuestionType;
  description: string;
  questionDetails: IQuestionDetail[];
}

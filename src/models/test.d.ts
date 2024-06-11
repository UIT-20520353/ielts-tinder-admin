import { ETestLevel } from "@/enums/test";
import { IQuestion } from "./question";

export interface ITest {
  key?: string;
  id: number;
  name: string;
  level: ETestLevel;
  createdAt: string;
}

export interface ITestDetail {
  id: number;
  title: string;
  difficultyLevel: ETestLevel;
  createdAt: string;
  questions: IQuestion[];
}

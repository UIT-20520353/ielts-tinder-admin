import { QuestionTypeMapper } from "@/mappers";
import { IQuestion } from "@/models/question";
import { Tag, Typography } from "antd";
import React from "react";

interface SingleQuestionProps {
  question: IQuestion;
}

const SingleQuestion: React.FunctionComponent<SingleQuestionProps> = ({
  question,
}) => {
  const indexes: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <div className="w-full p-5 mt-3 bg-white rounded-md shadow-sm">
      <div className="flex items-center justify-center w-full gap-3 mb-3">
        <Typography.Text className="text-base font-semibold">
          Question type:
        </Typography.Text>
        <Typography.Text className="text-base">
          {QuestionTypeMapper[question.type]}
        </Typography.Text>
      </div>
      {!!question.questionDetails.length && (
        <div className="flex flex-col items-start w-full gap-2">
          <Typography.Text className="text-base">
            <span className="font-semibold">Question: </span>
            {question.questionDetails[0].text}
          </Typography.Text>
          <div className="flex flex-col items-start w-full gap-2">
            {question.questionDetails[0].answers.map((answer, i) => (
              <Tag
                key={`question-${question.id}-answer-${answer.id}`}
                bordered={false}
                color={answer.isCorrect ? "green" : "red"}
                className="text-base"
              >
                {`${indexes[i]}. ${answer.content}`}
              </Tag>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SingleQuestion;

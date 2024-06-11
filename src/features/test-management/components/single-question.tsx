import { QuestionTypeMapper } from "@/mappers";
import { IQuestion } from "@/models/question";
import { Typography } from "antd";
import React from "react";

interface SingleQuestionProps {
  question: IQuestion;
}

const SingleQuestion: React.FunctionComponent<SingleQuestionProps> = ({
  question,
}) => {
  return (
    <div className="w-full p-5 mt-3 bg-white rounded-md shadow-sm">
      <div className="flex items-center w-full gap-3 mb-3">
        <Typography.Text className="text-base font-semibold">
          Question type:
        </Typography.Text>
        <Typography.Text className="text-base underline" code>
          {QuestionTypeMapper[question.type]}
        </Typography.Text>
      </div>
      {question.questionDetails[0].text}
    </div>
  );
};

export default SingleQuestion;

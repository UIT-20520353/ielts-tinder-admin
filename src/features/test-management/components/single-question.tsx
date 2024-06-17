import { QuestionTypeMapper } from "@/mappers";
import { IQuestion } from "@/models/question";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Card, Tag, Typography } from "antd";
import React from "react";

interface SingleQuestionProps {
  question: IQuestion;
}

const SingleQuestion: React.FunctionComponent<SingleQuestionProps> = ({
  question,
}) => {
  const indexes: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <Card
      title={
        <div className="flex items-center w-full gap-3">
          <Typography.Text className="text-base">
            Question type:
          </Typography.Text>
          <Typography.Text className="text-base">
            {QuestionTypeMapper[question.type]}
          </Typography.Text>
        </div>
      }
      className="mt-3"
      extra={
        <div className="flex items-center gap-2">
          <Button
            className="min-w-[36px] min-h-[36px]"
            type="primary"
            icon={<EditOutlined style={{ fontSize: "16px" }} />}
          />
          <Button
            className="min-w-[36px] min-h-[36px]"
            type="primary"
            danger
            icon={<DeleteOutlined style={{ fontSize: "16px" }} />}
          />
        </div>
      }
    >
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
    </Card>
  );
};

export default SingleQuestion;

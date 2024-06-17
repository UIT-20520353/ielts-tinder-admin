import { QuestionTypeMapper } from "@/mappers";
import { IQuestion } from "@/models/question";
import { Card, Tag, Typography } from "antd";
import React from "react";

interface MultipleQuestionProps {
  question: IQuestion;
}

const MultipleQuestion: React.FunctionComponent<MultipleQuestionProps> = ({
  question,
}) => {
  const indexes: string[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];

  return (
    <Card
      className="mt-3"
      title={
        <div className="flex items-center w-full gap-3 ">
          <Typography.Text className="text-base ">
            Question type:
          </Typography.Text>
          <Typography.Text className="text-base">
            {QuestionTypeMapper[question.type]}
          </Typography.Text>
        </div>
      }
    >
      {Boolean(question.description) && (
        <Card type="inner" title="Description" className="mb-3">
          <div
            dangerouslySetInnerHTML={{ __html: question.description }}
            className="dangerous-html"
          />
        </Card>
      )}
      {Boolean(question.paragraph) && (
        <Card type="inner" title="Paragraph" className="mb-3">
          <div
            dangerouslySetInnerHTML={{ __html: question.paragraph }}
            className="dangerous-html"
          />
        </Card>
      )}

      {!!question.questionDetails.length &&
        question.questionDetails.map((questionDetail, i) => (
          <Card type="inner" title={`Question ${i + 1}`} className="mb-3">
            <div
              dangerouslySetInnerHTML={{ __html: questionDetail.text }}
              className="mb-2 dangerous-html"
            />
            <div className="flex flex-col items-start w-full gap-2">
              {questionDetail.answers.map((answer, answerIndex) => (
                <Tag
                  key={`question-${question.id}-answer-${answer.id}`}
                  bordered={false}
                  color={answer.isCorrect ? "green" : "red"}
                  className="text-base"
                >
                  {`${indexes[answerIndex]}. ${answer.content}`}
                </Tag>
              ))}
            </div>
          </Card>
        ))}
    </Card>
  );
};

export default MultipleQuestion;

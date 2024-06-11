import { EAppContrants } from "@/app/constrants";
import { TestLevelColorMapper, TestLevelMapper } from "@/mappers";
import { ITestDetail } from "@/models/test";
import { Tag, Typography } from "antd";
import dateFormat from "dateformat";
import React from "react";

interface TestOverviewProps {
  test: ITestDetail;
}

const TestOverview: React.FunctionComponent<TestOverviewProps> = ({ test }) => {
  return (
    <div className="grid w-full grid-cols-4 gap-3 p-5 mt-3 bg-white rounded-md shadow-sm">
      <div className="flex flex-col items-start col-span-1">
        <Typography.Title level={5} className="m-0">
          Id
        </Typography.Title>
        <Typography.Text className="m-0">{test.id}</Typography.Text>
      </div>
      <div className="flex flex-col items-start col-span-1">
        <Typography.Title level={5} className="m-0">
          Name
        </Typography.Title>
        <Typography.Text className="m-0">{test.title}</Typography.Text>
      </div>
      <div className="flex flex-col items-start col-span-1">
        <Typography.Title level={5} className="m-0">
          Level
        </Typography.Title>
        <Typography.Text className="m-0">
          <Tag color={TestLevelColorMapper[test.difficultyLevel]}>
            {TestLevelMapper[test.difficultyLevel]}
          </Tag>
        </Typography.Text>
      </div>
      <div className="flex flex-col items-start col-span-1">
        <Typography.Title level={5} className="m-0">
          Created at
        </Typography.Title>
        <Typography.Text className="m-0">
          {dateFormat(test.createdAt, EAppContrants.DATE_FORMAT)}
        </Typography.Text>
      </div>
    </div>
  );
};

export default TestOverview;

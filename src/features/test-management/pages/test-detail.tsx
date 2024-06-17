import testApi from "@/api/testApi";
import { useAppDispatch } from "@/app/hooks";
import { initialTestDetail } from "@/app/initial-states";
import { EQuestionType } from "@/enums/question";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { ITestDetail } from "@/models/test";
import { addLoading, removeLoading } from "@/redux/global-slice";
import { ArrowLeftOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Typography } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SingleQuestion from "../components/single-question";
import TestOverview from "../components/test-overview";
import MultipleQuestion from "../components/multiple-question";

interface TestDetailProps {}

const TestDetail: React.FunctionComponent<TestDetailProps> = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { headers, isHeadersEmpty } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const { testId } = useParams();

  const [test, setTest] = useState<ITestDetail>(initialTestDetail);

  const getTestDetail = useCallback(
    async (id: number) => {
      if (isHeadersEmpty) return;

      dispatch(addLoading());
      const { ok, body, error } = await testApi.getTestById(id, headers);
      dispatch(removeLoading());

      if (error) {
        handleResponseError(error, () => navigate("/tests"));
      }

      if (ok && body) {
        setTest(body);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [dispatch, isHeadersEmpty, headers, handleResponseError]
  );

  useEffect(() => {
    if (Number.isNaN(Number(testId))) {
      navigate("/tests");
    } else {
      getTestDetail(Number(testId));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId, getTestDetail]);

  return (
    <div className="px-10 pt-4 pb-8">
      <div className="flex items-center w-full">
        <button
          onClick={() => navigate("/tests")}
          className="flex items-center justify-center w-10 h-10 duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <ArrowLeftOutlined className="flex items-center justify-center text-lg font-semibold text-black" />
        </button>
        <h3 className="flex-1 text-xl font-semibold text-center text-c-blue-1">
          Test information
        </h3>
      </div>

      <TestOverview test={test} />

      <div className="flex items-center justify-between w-full mt-5">
        <Typography.Title level={3} className="m-0">
          Question list
        </Typography.Title>

        <Button
          type="primary"
          icon={<PlusOutlined />}
          className="text-base"
          onClick={() =>
            navigate("/questions/add", { state: { testId: test.id } })
          }
        >
          Add question
        </Button>
      </div>
      {test.questions.map((question) =>
        question.type === EQuestionType.SENTENCE_READING ||
        question.type === EQuestionType.SINGLE_LISTENING ? (
          <SingleQuestion
            key={`test-${test.id}-question-${question.id}`}
            question={question}
          />
        ) : (
          <MultipleQuestion
            key={`test-${test.id}-question-${question.id}`}
            question={question}
          />
        )
      )}
    </div>
  );
};

export default TestDetail;

import questionApi from "@/api/questionApi";
import TextEditor from "@/components/common/text-editor";
import { EQuestionType } from "@/enums/question";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import { QuestionTypeMapper } from "@/mappers";
import { IAddQuestionForm } from "@/models/form/add-question";
import {
  ArrowLeftOutlined,
  CloseOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Button,
  Card,
  Checkbox,
  Form,
  Input,
  Select,
  Space,
  Typography,
} from "antd";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

interface AddQuestionPageProps {}

const AddQuestionPage: React.FunctionComponent<AddQuestionPageProps> = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [form] = Form.useForm();
  const { accessToken } = useAccessToken();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();

  const [type, setType] = useState<EQuestionType>(
    EQuestionType.SENTENCE_READING
  );

  const testId = useMemo(() => location.state.testId, [location.state]);

  const initialFormValues = useMemo(
    (): IAddQuestionForm => ({
      type: EQuestionType.SENTENCE_READING,
      paragraph: "",
      questionDetails: [],
      description: "",
    }),
    []
  );

  const questionOptions = useMemo(
    () =>
      Object.values(EQuestionType).map((type) => ({
        label: QuestionTypeMapper[type],
        value: type,
      })),
    []
  );

  const onFieldsChange = useCallback(() => {
    setType(form.getFieldValue("type") as EQuestionType);
  }, [form]);

  const onSubmit = async (data: IAddQuestionForm) => {
    const formData = new FormData();
    formData.append("questionType", data.type);
    formData.append("testId", testId);
    formData.append("paragraph", data.paragraph || "");
    formData.append("description", data.description || "");
    data.questionDetails.forEach((question, index) => {
      formData.append(`questionDetails[${index}].content`, question.content);
      question.answers.forEach((answer, answerIndex) => {
        formData.append(
          `questionDetails[${index}].answers[${answerIndex}].content`,
          answer.content
        );
        formData.append(
          `questionDetails[${index}].answers[${answerIndex}].isCorrect`,
          String(answer.isCorrect ? true : false)
        );
      });
    });

    const { ok, error } = await questionApi.createQuestion(
      formData,
      accessToken
    );

    if (ok) {
      handleResponseSuccess("Create question successfully");
      navigate(`/tests/${testId}`);
    }

    if (error) {
      handleResponseError(error);
    }
  };

  useEffect(() => {
    form.setFieldValue("paragraph", "");
    form.setFieldValue("questionDetails", []);
  }, [type, form]);

  useEffect(() => {
    if (!testId || Number.isNaN(Number(testId))) {
      navigate("/tests");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [testId]);

  return (
    <div className="px-10 pt-4 pb-8">
      <div className="flex items-center w-full">
        <button
          onClick={() => navigate(`/tests/${testId}`)}
          className="flex items-center justify-center w-10 h-10 duration-200 bg-gray-200 rounded-md hover:bg-gray-300"
        >
          <ArrowLeftOutlined className="flex items-center justify-center text-lg font-semibold text-black" />
        </button>
        <h3 className="flex-1 text-xl font-semibold text-center text-c-blue-1">
          Add new question
        </h3>
      </div>

      <Form
        form={form}
        className="w-full"
        initialValues={initialFormValues}
        onFinish={onSubmit}
        layout="vertical"
        onFieldsChange={onFieldsChange}
      >
        <Form.Item
          className="w-full m-0 mt-5"
          label={
            <Typography.Text className="font-medium">Type</Typography.Text>
          }
          name="type"
        >
          <Select options={questionOptions} />
        </Form.Item>

        <Form.Item
          className="w-full m-0 mt-5"
          name="description"
          label={
            <Typography.Text className="font-medium">
              Description
            </Typography.Text>
          }
        >
          <TextEditor
            onChange={(value: string) =>
              form.setFieldValue("description", value)
            }
          />
        </Form.Item>

        {type === EQuestionType.PARAGRAPH_READING && (
          <Form.Item
            className="w-full m-0 mt-5"
            name="paragraph"
            label={
              <Typography.Text className="font-medium">
                Paragraph
              </Typography.Text>
            }
          >
            <TextEditor
              onChange={(value: string) =>
                form.setFieldValue("paragraph", value)
              }
            />
          </Form.Item>
        )}

        <div className="flex flex-col items-start w-full gap-2 mt-5">
          <Typography.Text className="font-medium">
            Question list
          </Typography.Text>
          <Form.List name="questionDetails" rules={[]}>
            {(fields, { add, remove }) => (
              <div className="flex flex-col w-full gap-y-4">
                {fields.map((field) => (
                  <Card
                    size="small"
                    title={`Question ${field.name + 1}`}
                    key={field.key}
                    extra={
                      <CloseOutlined
                        onClick={() => {
                          remove(field.name);
                        }}
                      />
                    }
                  >
                    <Form.Item
                      label="Content"
                      name={[field.name, "content"]}
                      className="m-0 mb-3"
                    >
                      <TextEditor
                        onChange={(value: string) =>
                          form.setFieldValue([field.name, "content"], value)
                        }
                      />
                    </Form.Item>
                    <Form.Item label="Answers" className="m-0">
                      <Form.List name={[field.name, "answers"]}>
                        {(subFields, subOpt) => (
                          <div className="flex flex-col gap-y-4">
                            {subFields.map((subField) => (
                              <Space key={subField.key}>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "content"]}
                                  rules={[
                                    { required: true, message: "Required" },
                                  ]}
                                >
                                  <Input placeholder="Content" />
                                </Form.Item>
                                <Form.Item
                                  noStyle
                                  name={[subField.name, "isCorrect"]}
                                  valuePropName="checked"
                                >
                                  <Checkbox>Is correct</Checkbox>
                                </Form.Item>
                                <CloseOutlined
                                  onClick={() => {
                                    subOpt.remove(subField.name);
                                  }}
                                />
                              </Space>
                            ))}
                            {subFields.length < 5 && (
                              <Button
                                type="dashed"
                                onClick={() => subOpt.add()}
                                block
                                icon={<PlusOutlined />}
                              >
                                Add answer
                              </Button>
                            )}
                          </div>
                        )}
                      </Form.List>
                    </Form.Item>
                  </Card>
                ))}
                {(type === EQuestionType.SENTENCE_READING ||
                  type === EQuestionType.SINGLE_LISTENING) &&
                  fields.length < 1 && (
                    <Button
                      type="dashed"
                      onClick={() => add()}
                      block
                      icon={<PlusOutlined />}
                    >
                      Add question
                    </Button>
                  )}
                {(type === EQuestionType.PARAGRAPH_READING ||
                  type === EQuestionType.MULTIPLE_LISTENING) && (
                  <Button
                    type="dashed"
                    onClick={() => add()}
                    block
                    icon={<PlusOutlined />}
                  >
                    Add question
                  </Button>
                )}
              </div>
            )}
          </Form.List>
        </div>

        <div className="flex items-center justify-center w-full gap-3 mt-5">
          <Button type="primary" htmlType="submit" className="w-40 font-medium">
            Save
          </Button>
          <Button className="w-40 font-medium">Cancel</Button>
        </div>
      </Form>
    </div>
  );
};

export default AddQuestionPage;

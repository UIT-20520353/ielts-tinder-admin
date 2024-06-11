import testApi from "@/api/testApi";
import { useAppDispatch } from "@/app/hooks";
import SelectField from "@/components/form/select-input-field";
import TextInputField from "@/components/form/text-input-field";
import { ETestLevel } from "@/enums/test";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import useHandleResponseSuccess from "@/hooks/useHandleResponseSuccess";
import { TestLevelMapper } from "@/mappers";
import { addLoading, removeLoading } from "@/redux/global-slice";
import { Button, Form, Modal } from "antd";
import clsx from "clsx";
import React, { useEffect, useMemo, useState } from "react";

interface AddTestProps {
  open: boolean;
  onClose: (refresh: boolean) => void;
}

interface FormFieldErrorProps {
  name: boolean;
  level: boolean;
}

const AddTest: React.FunctionComponent<AddTestProps> = ({ open, onClose }) => {
  const dispatch = useAppDispatch();
  const { headers, isHeadersEmpty } = useAccessToken();
  const [form] = Form.useForm();
  const handleResponseError = useHandleResponseError();
  const handleResponseSuccess = useHandleResponseSuccess();

  const [errors, setErrors] = useState<FormFieldErrorProps>({
    name: false,
    level: false,
  });

  const handleFormFieldsChange = () => {
    setErrors({
      name: !!form.getFieldError("name").length,
      level: !!form.getFieldError("level").length,
    });
  };

  const title = useMemo(
    () => (
      <div className="flex items-center justify-center w-full">
        <p className="text-base font-medium">Add new test</p>
      </div>
    ),
    []
  );

  const onSubmit = async (data: { name: string; level: ETestLevel }) => {
    if (isHeadersEmpty) return;

    dispatch(addLoading());
    const { ok, error } = await testApi.createTest(headers, data);
    dispatch(removeLoading());

    if (error) {
      handleResponseError(error);
    }

    if (ok) {
      handleResponseSuccess("Add test successfully", () => onClose(true));
    }
  };

  useEffect(() => {
    if (!open) {
      form.resetFields();
      setErrors({ name: false, level: false });
    }
  }, [open, form]);

  return (
    <Modal
      title={title}
      onCancel={() => onClose(false)}
      open={open}
      footer={null}
      maskClosable={false}
      destroyOnClose
      centered
    >
      <Form
        className="flex flex-col items-center w-full gap-4"
        form={form}
        layout="vertical"
        initialValues={{ name: "", level: ETestLevel.A1 }}
        onFieldsChange={handleFormFieldsChange}
        onFinish={onSubmit}
      >
        <TextInputField
          placeholder="Enter test name"
          autoComplete="off"
          name="name"
          label="Name"
          rules={[{ required: true, message: "Please enter your test name" }]}
          className={clsx("duration-300", {
            "mb-3": !errors.name,
            "mb-7": errors.name,
          })}
        />
        <SelectField
          placeholder="Select test level"
          name="level"
          label="Level"
          options={Object.values(ETestLevel)
            .filter((level) => level !== ETestLevel.ENTRY_TEST)
            .map((level) => ({
              label: TestLevelMapper[level],
              value: level,
            }))}
          rules={[{ required: true, message: "Please select test level" }]}
          className={clsx("duration-300", {
            "mb-3": !errors.level,
            "mb-7": errors.level,
          })}
        />
        <div className="flex items-center justify-center w-full gap-3 mt-2">
          <Button
            className="w-1/3 text-base font-medium"
            type="primary"
            htmlType="submit"
          >
            Save
          </Button>
          <Button
            className="w-1/3 text-base font-medium text-black"
            type="default"
            onClick={() => onClose(false)}
            htmlType="button"
          >
            Cancel
          </Button>
        </div>
      </Form>
    </Modal>
  );
};

export default AddTest;

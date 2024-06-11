import authApi from "@/api/authApi";
import TextInputField from "@/components/form/text-input-field";
import useAccessToken from "@/hooks/useAccessToken";
import useHandleResponseError from "@/hooks/useHandleResponseError";
import { LoginFormProps } from "@/models/form/login-form";
import {
  EyeInvisibleOutlined,
  EyeOutlined,
  LockOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Button, Form } from "antd";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginPageProps {}

interface FormFieldErrorProps {
  email: boolean;
  password: boolean;
}

const LoginPage: React.FunctionComponent<LoginPageProps> = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const handleReponseError = useHandleResponseError();

  const { setAccessToken, accessToken } = useAccessToken();
  const [isShowPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<FormFieldErrorProps>({
    email: false,
    password: false,
  });

  const handleFormFieldsChange = () => {
    setErrors({
      email: !!form.getFieldError("email").length,
      password: !!form.getFieldError("password").length,
    });
  };

  const onSubmit = async (data: LoginFormProps) => {
    setLoading(true);
    const { ok, error, body } = await authApi.login(data);
    setLoading(false);

    if (ok && body) {
      setAccessToken(body.accessToken);
      navigate("/");
    }

    if (error) {
      handleReponseError(error);
    }
  };

  useEffect(() => {
    if (accessToken) {
      navigate("/");
    }
  }, [accessToken, navigate]);

  return (
    <div className="flex items-center justify-center w-full h-screen bg-c-white-1">
      <Form
        name="login-form"
        className="flex flex-col items-center w-1/3 p-8 bg-white shadow rounded-3xl"
        form={form}
        onFinish={onSubmit}
        layout="vertical"
        onFieldsChange={handleFormFieldsChange}
      >
        <h2 className="mb-3 text-2xl font-bold">Đăng nhập</h2>
        <TextInputField
          name={"email"}
          placeholder="Nhập email"
          prefix={<UserOutlined className="mr-2 text-base" />}
          rules={[
            { required: true, message: "Vui lòng nhập email" },
            { type: "email", message: "Vui lòng nhập email hợp lệ" },
          ]}
          inputClassName="h-10"
          className={clsx("duration-300", {
            "mb-3": !errors.email,
            "mb-7": errors.email,
          })}
        />
        <TextInputField
          name={"password"}
          placeholder="Nhập mật khẩu"
          prefix={<LockOutlined className="mr-2 text-base" />}
          suffix={
            isShowPassword ? (
              <EyeOutlined
                className="ml-2 text-base cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <EyeInvisibleOutlined
                className="ml-2 text-base cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )
          }
          rules={[{ required: true, message: "Vui lòng mật khẩu" }]}
          inputClassName="h-10"
          type={isShowPassword ? "text" : "password"}
          className={clsx("duration-300", {
            "mb-3": !errors.password,
            "mb-7": errors.password,
          })}
        />
        <Button
          htmlType="submit"
          type="primary"
          className="w-1/2 h-10 m-0 text-base font-medium"
          loading={isLoading}
        >
          Đăng nhập
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;

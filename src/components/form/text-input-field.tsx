import { Form, Input } from "antd";
import { Rule } from "antd/es/form";
import clsx from "clsx";
import React, { ReactNode } from "react";

interface TextInputFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rules?: Rule[];
  autoComplete?: string;
  type?: string;
  prefix?: ReactNode;
  suffix?: ReactNode;
  inputClassName?: string;
}

const TextInputField: React.FunctionComponent<TextInputFieldProps> = ({
  name,
  label,
  placeholder,
  className,
  rules,
  autoComplete = "off",
  type = "text",
  prefix,
  suffix,
  inputClassName,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      className={clsx("w-full m-0 h-10", className)}
      rules={rules}
    >
      <Input
        autoComplete={autoComplete}
        type={type}
        placeholder={placeholder}
        prefix={prefix}
        suffix={suffix}
        className={inputClassName}
      />
    </Form.Item>
  );
};

export default TextInputField;

import { Form, Select } from "antd";
import { Rule } from "antd/es/form";
import clsx from "clsx";
import React from "react";

interface SelectFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  className?: string;
  rules?: Rule[];
  inputClassName?: string;
  options: { label: string; value: string }[];
}

const SelectField: React.FunctionComponent<SelectFieldProps> = ({
  name,
  label,
  placeholder,
  className,
  rules,
  inputClassName,
  options,
}) => {
  return (
    <Form.Item
      label={label}
      name={name}
      className={clsx("w-full m-0 h-10", className)}
      rules={rules}
    >
      <Select
        className={inputClassName}
        placeholder={placeholder}
        options={options}
      />
    </Form.Item>
  );
};

export default SelectField;

import type { ReactNode } from "react";
import { Form, Tooltip, type FormItemProps } from "antd";
import { filterDOMProps, type Override } from "uniforms";
import QuestionCircleOutlined from "@ant-design/icons/QuestionCircleOutlined";

type WrapperProps = Override<
  FormItemProps,
  {
    error?: unknown;
    errorMessage?: string;
    info?: string;
    showInlineError?: boolean;
    wrapperStyle?: object;
  }
>;

const defaultWrapperStyle = { marginBottom: "12px" };

export default function wrapField(
  {
    colon,
    error,
    errorMessage,
    extra,
    help,
    id,
    info,
    label,
    labelCol,
    required,
    showInlineError,
    validateStatus,
    wrapperCol,
    wrapperStyle = defaultWrapperStyle,
  }: WrapperProps,
  children: ReactNode
) {
  const labelNode = !!label && (
    <span>
      {label}
      {!!info && (
        <span>
          &nbsp;
          <Tooltip title={info}>
            <QuestionCircleOutlined />
          </Tooltip>
        </span>
      )}
    </span>
  );

  return (
    <Form.Item
      colon={colon}
      hasFeedback
      help={help || (showInlineError && !!error && errorMessage)}
      extra={extra}
      htmlFor={id}
      label={labelNode}
      labelCol={labelCol}
      required={required}
      style={wrapperStyle}
      validateStatus={error ? "error" : validateStatus}
      wrapperCol={wrapperCol}
    >
      {children}
    </Form.Item>
  );
}

declare module "uniforms" {
  interface FilterDOMProps {
    checkboxes: never;
    colon: never;
    disableItem: never;
    labelCol: never;
    validateStatus: never;
    wrapperCol: never;
    wrapperStyle: never;
    layout: never;
  }
}

filterDOMProps.register(
  "checkboxes",
  "colon",
  "disableItem",
  "labelCol",
  "validateStatus",
  "wrapperCol",
  "wrapperStyle",
  "layout"
);

import type { Ref } from "react";
import { Button, type ButtonProps } from "antd";
import { type Override, useForm } from "uniforms";

export type SubmitFieldProps = Override<
  ButtonProps,
  { inputRef?: Ref<HTMLButtonElement> }
>;

function SubmitField({
  disabled,
  inputRef,
  value = "Submit",
  ...props
}: SubmitFieldProps) {
  const { error, state } = useForm();

  return (
    <Button
      disabled={disabled === undefined ? !!(error || state.disabled) : disabled}
      htmlType="submit"
      ref={inputRef}
      type="primary"
      {...props}
    >
      {value}
    </Button>
  );
}

export default SubmitField;

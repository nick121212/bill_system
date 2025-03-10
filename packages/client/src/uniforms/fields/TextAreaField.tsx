import { Ref } from "react";
import { Input, InputRef } from "antd";
import { TextAreaProps } from "antd/es/input";
import { FieldProps, connectField, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

export type TextFieldProps = FieldProps<
  string,
  Omit<TextAreaProps, "onReset">,
  { inputRef?: Ref<InputRef> }
>;

function Text(props: TextFieldProps) {

  return wrapField(
    props,
    <Input.TextArea
      disabled={props.disabled}
      name={props.name}
      onChange={(event) => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      value={props.value ?? ""}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<TextFieldProps>(Text, { kind: "leaf" });

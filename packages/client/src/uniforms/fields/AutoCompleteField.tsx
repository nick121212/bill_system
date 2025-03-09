import { AutoComplete, AutoCompleteProps, GetRef } from "antd";
import { FieldProps, connectField, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

export type AutoCompleteFieldProps = FieldProps<
  string,
  // FIXME: Why `onReset` fails with `wrapField`?
  Omit<AutoCompleteProps, "onReset">,
  { autoRef?: GetRef<typeof AutoComplete> }
>;

function AutoCompleteField(props: AutoCompleteFieldProps) {
  return wrapField(
    props,
    <AutoComplete
      disabled={props.disabled}
      onChange={(value) => {
        props.onChange(value);
      }}
      placeholder={props.placeholder}
      ref={props.autoRef as any}
      style={{ width: "100%" }}
      value={props.value}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<AutoCompleteFieldProps>(AutoCompleteField, {
  kind: "leaf",
});

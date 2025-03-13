import type { Ref } from "react";
import { Slider as SliderD, type SliderSingleProps } from "antd";
import { type FieldProps, connectField, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

export type SliderFieldProps = FieldProps<
  number,
  Omit<SliderSingleProps, "onReset">,
  {
    loading?: boolean;
    inputRef?: Ref<typeof SliderD>;
    fieldNames?: { title: string; key: string; children: string };
  }
>;

function Slider(props: SliderFieldProps) {
  return wrapField(
    props,
    <SliderD
      loading={props.loading}
      fieldNames={props.fieldNames}
      disabled={props.disabled}
      value={props.value}
      style={{ minWidth: "164px" }}
      onChange={(value: number) => {
        props.onChange(value);
      }}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<SliderFieldProps>(Slider, { kind: "node" });

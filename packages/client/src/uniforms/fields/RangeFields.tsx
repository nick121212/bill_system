import type { Ref } from "react";
import { DatePicker, type TimeRangePickerProps } from "antd";
import dayjs from "dayjs";
import { connectField, type FieldProps, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

const { RangePicker } = DatePicker;

export type RangePickerFieldProps = FieldProps<
  [Date, Date],
  Omit<TimeRangePickerProps, "onReset">,
  { inputRef?: Ref<typeof RangePicker>; showTime?: boolean }
>;

const defaultStyle = { width: "100%" };

function RangePickerField({
  showTime = true,
  style = defaultStyle,
  ...props
}: RangePickerFieldProps) {
  return wrapField(
    props,
    <RangePicker
      disabled={props.disabled}
      inputReadOnly={props.readOnly}
      name={props.name}
      onChange={(dates) => {
        if (!props.readOnly) {
          props.onChange(
            dates && dates.length === 2
              ? [dates[0]!.toDate(), dates[1]!.toDate()]
              : undefined
          );
        }
      }}
      placeholder={props.placeholder}
      // @ts-expect-error
      ref={props.inputRef}
      showTime={showTime}
      style={style}
      value={
        props.value && props.value.length === 2
          ? [dayjs(props.value[0]), dayjs(props.value[1])]
          : undefined
      }
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<RangePickerFieldProps>(RangePickerField, { kind: "leaf" });

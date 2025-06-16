import type { Ref } from 'react';
import { DatePicker, type DatePickerProps } from 'antd';
import dayjs from 'dayjs';
import { connectField, type FieldProps, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type DateFieldProps = FieldProps<
  Date,
  Omit<DatePickerProps, 'onReset'>,
  // FIXME: Seems like DatePickerProps doesn't contain 'showTime'.
  { inputRef?: Ref<typeof DatePicker>; showTime?: boolean }
>;

const defaultStyle = { width: '100%' };

function DateD({
  showTime = true,
  style = defaultStyle,
  ...props
}: DateFieldProps) {
  console.log(props.value);

  return wrapField(
    props,
    <DatePicker
      disabled={props.disabled}
      inputReadOnly={props.readOnly}
      name={props.name}
      onChange={(value) => {
        if (!props.readOnly) {
          props.onChange(value ? (value.toDate().getTime() as any) : undefined);
        }
      }}
      placeholder={props.placeholder}
      // @ts-expect-error: `DatePicker` is an intersection.
      ref={props.inputRef}
      showTime={showTime}
      style={style}
      value={dayjs(props.value ? props.value : new Date())}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<DateFieldProps>(DateD, { kind: 'leaf' });

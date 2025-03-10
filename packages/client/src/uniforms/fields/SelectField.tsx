import React, { Ref } from "react";
import {
  Checkbox,
  Radio,
  Select as SelectAntD,
  SelectProps as SelectAntDProps,
} from "antd";
import { CheckboxGroupProps } from "antd/es/checkbox";
import { RadioGroupProps } from "antd/lib/radio";
import { FieldProps, connectField, filterDOMProps } from "uniforms";

import type { Option } from "./types";
import wrapField from "./wrapField";

const CheckboxGroup = Checkbox.Group;
const RadioGroup = Radio.Group;

type CheckboxesProps = FieldProps<
  SelectFieldValue,
  CheckboxGroupProps | RadioGroupProps,
  {
    options?: Option<string | number>[];
    checkboxes: true;
    inputRef?: Ref<typeof CheckboxGroup | typeof RadioGroup>;
    required?: boolean;
  }
>;

type SelectProps = FieldProps<
  SelectFieldValue,
  SelectAntDProps<string | number | number[] | string[]>,
  {
    options?: Option<string | number>[];
    checkboxes?: false;
    inputRef?: Ref<typeof SelectAntD>;
    required?: boolean;
  }
>;

// This type is needed for the `SelectFieldProps` union to be a proper subtype
// of `Partial<GuaranteedProps<Value>>` - otherwise `connectField` goes wild.
type SelectFieldValue = (string | undefined)[];

export type SelectFieldProps = CheckboxesProps | SelectProps;

function Select(props: SelectFieldProps) {
  const Group = props.fieldType === Array ? CheckboxGroup : RadioGroup;
  const filteredDOMProps = filterDOMProps(props);
  return wrapField(
    props,
    props.checkboxes ? (
      <span {...filteredDOMProps}>
        <Group
          {...filteredDOMProps}
          disabled={props.disabled}
          name={props.name}
          onChange={(eventOrValue: any) => {
            if (!props.readOnly) {
              props.onChange(
                // FIXME: Argument type depends on `props.fieldType`.
                // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
                props.fieldType === Array
                  ? eventOrValue
                  : eventOrValue.target.value
              );
            }
          }}
          options={props.options?.map((option) => ({
            ...option,
            label: option.label ?? option.value,
          }))}
          value={props.value}
        />
      </span>
    ) : (
      <SelectAntD<any>
        allowClear={!props.required}
        disabled={props.disabled}
        mode={props.fieldType === Array ? "multiple" : undefined}
        name={props.name}
        onChange={(value: SelectFieldValue) => {
          if (!props.readOnly) {
            props.onChange(value);
          }
        }}
        style={{ minWidth: "164px" }}
        placeholder={props.placeholder}
        // @ts-expect-error: Incorrect `inputRef` type.
        ref={props.inputRef}
        value={
          props.fieldType === Array
            ? Array.isArray(props.value)
              ? props.value.filter((value) => value !== undefined)
              : []
            : props.value
        }
        {...filteredDOMProps}
      >
        {props.options?.map((option) => (
          <SelectAntD.Option
            disabled={option.disabled}
            key={option.key ?? option.value}
            value={option.value}
            id={`${props.id}-${option.key ?? escape(option.value.toString())}`}
          >
            {option.label ?? option.value}
          </SelectAntD.Option>
        ))}
      </SelectAntD>
    )
  );
}

export default connectField<SelectFieldProps>(Select, { kind: "leaf" });

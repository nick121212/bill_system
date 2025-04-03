import type { Ref } from 'react';
import {
  Checkbox,
  Radio,
  Select as SelectAntD,
  type SelectProps as SelectAntDProps,
} from 'antd';
import type { CheckboxGroupProps } from 'antd/es/checkbox';
import type { RadioGroupProps } from 'antd/lib/radio';
import { type FieldProps, connectField, filterDOMProps } from 'uniforms';
import { ReloadOutlined } from '@ant-design/icons';

import type { Option } from './types';
import wrapField from './wrapField';

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
    onChangeData?: (value: SelectFieldValue, option: any) => void;
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
    onChangeData?: (value: SelectFieldValue, option: any) => void;
  }
>;

// This type is needed for the `SelectFieldProps` union to be a proper subtype
// of `Partial<GuaranteedProps<Value>>` - otherwise `connectField` goes wild.
type SelectFieldValue = (string | undefined)[];

export type SelectFieldProps = CheckboxesProps | SelectProps;

function Select({ onChangeData, ...props }: SelectFieldProps) {
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
                  : eventOrValue.target.value,
              );
              onChangeData?.(
                props.fieldType === Array
                  ? eventOrValue
                  : eventOrValue.target.value,
                eventOrValue,
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
      <SelectAntD<SelectFieldValue>
        allowClear={!props.required}
        disabled={props.disabled}
        mode={props.fieldType === Array ? 'multiple' : undefined}
        name={props.name}
        onChange={(value: SelectFieldValue, option: any) => {
          if (!props.readOnly) {
            onChangeData?.(value, option);
            props.onChange(value);
          }
        }}
        style={{ minWidth: '164px' }}
        placeholder={props.placeholder}
        suffixIcon={
          props.loading ? null : (
            <ReloadOutlined
              onClick={() => {
                props.onSearch?.('');
              }}
            />
          )
        }
        loading={props.loading}
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
        label={props.label}
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
    ),
  );
}

export default connectField<SelectFieldProps>(Select, { kind: 'leaf' });

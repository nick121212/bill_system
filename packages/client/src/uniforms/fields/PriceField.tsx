import type { Ref } from 'react';
import { InputNumber, type InputNumberProps } from 'antd';
import { type FieldProps, connectField, filterDOMProps } from 'uniforms';

import { convertPriceFromServer } from '@/utils';

import wrapField from './wrapField';

export type NumFieldProps = FieldProps<
  number,
  // FIXME: Why `onReset` fails with `wrapField`?
  Omit<InputNumberProps, 'onReset'>,
  { decimal?: boolean; inputRef?: Ref<HTMLInputElement> }
>;

function Price(props: NumFieldProps) {
  console.log(props);

  return wrapField(
    props,
    <InputNumber
      disabled={props.disabled}
      max={props.max}
      min={props.min}
      name={props.name}
      onChange={(event) => {
        const parse = props.decimal ? Number.parseFloat : Number.parseInt;
        const value = parse(`${event}`);
        props.onChange(Number.isNaN(value) ? undefined : value );


        console.log(value);
        
      }}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      step={props.step || (props.decimal ? 0.1 : 1)}
      style={{ width: '100%' }}
      type="number"
      value={(props.value || 0)}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<NumFieldProps>(Price, { kind: 'leaf' });

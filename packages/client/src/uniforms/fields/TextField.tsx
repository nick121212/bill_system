import type { Ref } from 'react';
import  { Input, type InputProps, type InputRef } from 'antd';
import { type FieldProps, connectField, filterDOMProps } from 'uniforms';

import wrapField from './wrapField';

export type TextFieldProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>,
  { inputRef?: Ref<InputRef> }
>;

function Text(props: TextFieldProps) {
  console.log(props);
  
  return wrapField(
    props,
    <Input
      disabled={props.disabled}
      name={props.name}
      onChange={event => props.onChange(event.target.value)}
      placeholder={props.placeholder}
      readOnly={props.readOnly}
      ref={props.inputRef}
      type={props.type ?? 'text'}
      value={props.value ?? ''}
      {...filterDOMProps(props)}
    />,
  );
}

export default connectField<TextFieldProps>(Text, { kind: 'leaf' });

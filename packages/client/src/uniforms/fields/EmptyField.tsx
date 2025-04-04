import type { Ref } from 'react';
import { type InputProps, type InputRef } from 'antd';
import { type FieldProps, connectField } from 'uniforms';

import wrapField from './wrapField';

export type EmptyFieldProps = FieldProps<
  string,
  Omit<InputProps, 'onReset'>,
  { inputRef?: Ref<InputRef> }
>;

function Empty(props: EmptyFieldProps) {
  return wrapField(props, <>{props.children}</>);
}

export default connectField<EmptyFieldProps>(Empty, { kind: 'leaf' });

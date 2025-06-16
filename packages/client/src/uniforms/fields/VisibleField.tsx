import { ReactNode } from 'react';
import { connectField, useField, useForm } from 'uniforms';

type VisibleFieldProps = {
  children: ReactNode;
  value?: any;
  condition?: (value: any, form: any) => boolean;
};

function Visible({
  children,
  condition,
}: VisibleFieldProps) {
  const form = useForm();
  let isVisible = true;

  // if (field) {
  //   const [{ value: fieldValue }] = useField(field, {});
  //   isVisible = value === undefined ? !!fieldValue : fieldValue === value;
  // }

  if (condition) {
    isVisible = condition(form.model, form);
  }

  return isVisible ? <>{children}</> : null;
}

export default connectField(Visible, {
  kind: 'leaf'
});

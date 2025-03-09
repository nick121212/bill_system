import { PropsWithChildren } from 'react';
import { Context, UnknownObject, useForm } from 'uniforms';

type DisplayIfProps<Model extends UnknownObject> = PropsWithChildren<{
  condition: (context: Context<Model>) => boolean;
}>;

export function DisplayIf<Model extends UnknownObject>({
  children,
  condition,
}: DisplayIfProps<Model>) {
  const uniforms = useForm<Model>();

  return condition(uniforms) ? children : null;
}
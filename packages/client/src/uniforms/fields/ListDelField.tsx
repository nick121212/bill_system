import { Button, type ButtonProps } from "antd";
import {
  type ConnectedField,
  connectField,
  type FieldProps,
  filterDOMProps,
  joinName,
  useField,
} from 'uniforms';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

export type ListDelFieldProps = FieldProps<unknown, ButtonProps>;

function ListDel({
  disabled,
  icon = <DeleteOutlined />,
  name,
  readOnly,
  shape = 'circle',
  size = 'small',
  type = 'default',
  ...props
}: ListDelFieldProps) {
  const nameParts = joinName(null, name);
  const nameIndex = +nameParts[nameParts.length - 1];
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ minCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true },
  )[0];

  // biome-ignore lint/style/noNonNullAssertion: <explanation>
  disabled ||= readOnly || parent.minCount! >= parent.value!.length;

  return (
    <Button
      {...filterDOMProps(props)}
      disabled={disabled}
      icon={icon}
      onClick={() => {
        // biome-ignore lint/style/noNonNullAssertion: <explanation>
        const value = parent.value!.slice();
        value.splice(nameIndex, 1);
        parent.onChange(value);
      }}
      shape={shape}
      size={size}
      type={type}
    />
  );
}

// There's no way to tell TypeScript NOT TO expand the type alias. Creating a
// local type helps, at least in the current version.
// https://github.com/microsoft/TypeScript/issues/34556
type ListDelFieldType = ConnectedField<ListDelFieldProps>;

export default connectField<ListDelFieldProps>(ListDel, {
  initialValue: false,
  kind: 'leaf',
}) as ListDelFieldType;

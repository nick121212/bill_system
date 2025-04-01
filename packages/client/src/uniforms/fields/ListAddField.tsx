import { Button, type ButtonProps } from "antd";
import cloneDeep from "lodash/cloneDeep";
import {
  type ConnectedField,
  type FieldProps,
  connectField,
  filterDOMProps,
  joinName,
  useField,
} from "uniforms";
import { PlusOutlined } from "@ant-design/icons";


export type ListAddFieldProps = FieldProps<unknown, ButtonProps>;

const defaultStyle = { width: "100%" };

function ListAdd({
  disabled,
  icon = <PlusOutlined />,
  name,
  readOnly,
  size = "small",
  style = defaultStyle,
  type = "default",
  value,
  ...props
}: ListAddFieldProps) {
  const nameParts = joinName(null, name);
  const parentName = joinName(nameParts.slice(0, -1));
  const parent = useField<{ maxCount?: number }, unknown[]>(
    parentName,
    {},
    { absoluteName: true }
  )[0];

  const limitNotReached =
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    !disabled && !(parent.maxCount! <= parent.value!.length);

  return (
    <Button
    shape="circle"
      {...filterDOMProps(props)}
      disabled={!limitNotReached}
      icon={icon}
      onClick={() => {
        if (!readOnly) {
          // biome-ignore lint/style/noNonNullAssertion: <explanation>
          parent.onChange(parent.value!.concat([cloneDeep(value)]));
        }
      }}
      size={size}
      style={style}
      type={type}
    />
  );
}

// There's no way to tell TypeScript NOT TO expand the type alias. Creating a
// local type helps, at least in the current version.
// https://github.com/microsoft/TypeScript/issues/34556
type ListAddFieldType = ConnectedField<ListAddFieldProps>;

export default connectField<ListAddFieldProps>(ListAdd, {
  initialValue: false,
  kind: "leaf",
}) as ListAddFieldType;

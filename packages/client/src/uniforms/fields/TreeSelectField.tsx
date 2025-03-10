import { Ref } from "react";
import { TreeSelect as TreeSelectD, TreeSelectProps } from "antd";
import { FieldProps, connectField, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

export type TreeSelectFieldProps = FieldProps<
  string | string[],
  Omit<TreeSelectProps, "onReset">,
  {
    inputRef?: Ref<typeof TreeSelectD>;
    treeData: any;
    fieldNames?: { label: string; value: string; children: string };
  }
>;

function TreeSelect(props: TreeSelectFieldProps) {
  return wrapField(
    props,
    <TreeSelectD
      fieldNames={props.fieldNames}
      value={props.value}
      disabled={props.disabled}
      allowClear
      style={{ minWidth: "164px" }}
      onChange={(_value: any, _labelList: any) => {
        props.onChange(_value);
      }}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<TreeSelectFieldProps>(TreeSelect, { kind: "node" });

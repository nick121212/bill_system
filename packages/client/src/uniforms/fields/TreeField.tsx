import { Ref } from "react";
import { Tree as TreeD, TreeProps } from "antd";
import { FieldProps, connectField, filterDOMProps } from "uniforms";

import wrapField from "./wrapField";

export type TreeSelectFieldProps = FieldProps<
  number[] | string[],
  Omit<TreeProps, "onReset">,
  {
    loading?: boolean;
    inputRef?: Ref<typeof TreeD>;
    treeData: any;
    fieldNames?: { title: string; key: string; children: string };
  }
>;

function Tree(props: TreeSelectFieldProps) {
  return wrapField(
    props,
    <TreeD
      checkable
      loading={props.loading}
      fieldNames={props.fieldNames}
      checkedKeys={props.value}
      disabled={props.disabled}
      style={{ minWidth: "164px" }}
      onCheck={(checked, val) => {
        console.log(checked, val);

        props.onChange([...(checked as any)] as any);
      }}
      {...filterDOMProps(props)}
    />
  );
}

export default connectField<TreeSelectFieldProps>(Tree, { kind: "node" });

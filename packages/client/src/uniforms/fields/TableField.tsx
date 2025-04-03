import { Ref } from 'react';
import { Table, TableProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import classNames from 'classnames';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';

export type TableFieldProps = FieldProps<
  AnyObject[],
  Omit<TableProps, 'onReset'>,
  { inputRef?: Ref<typeof Table> }
>;

function TableField({
  className,
  error,
  errorMessage,
  label,
  columns,
  showInlineError,
  value,
  ...props
}: TableFieldProps) {
  return (
    <>
      <Table {...filterDOMProps(props)} columns={columns} dataSource={value} />
      <ListAddField name="$" />
      {!!(error && showInlineError) && <div>{errorMessage}</div>}
    </>
  );
}

export default connectField<TableFieldProps>(TableField);

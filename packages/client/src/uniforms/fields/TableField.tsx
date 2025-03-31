import { Ref, type ReactNode } from 'react';
import { Space, Table, TableProps } from 'antd';
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
  showInlineError,
  value,
  ...props
}: TableFieldProps) {
  const columns: TableProps<any>['columns'] = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a>Invite {record.name}</a>
          <a>Delete</a>
        </Space>
      ),
    },
  ];

  return (
    <div className={classNames([className, 'ant-list', 'ant-list-bordered'])}>
      {/* {!!label && (
        <div>
          {label}
          {!!info && (
            <span>
              &nbsp;
              <Tooltip title={info}>
                <QuestionCircleOutlined />
              </Tooltip>
            </span>
          )}
        </div>
      )} */}

      <Table {...filterDOMProps(props)} columns={columns} dataSource={value} />
      <ListAddField name="$" />
      {!!(error && showInlineError) && <div>{errorMessage}</div>}
      {/* {value?.map((_item, itemIndex) =>
        Children.map(children, (child, childIndex) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement, {
                key: `${itemIndex}-${childIndex.toString()}`,
                name: child.props.name?.replace('$', `${itemIndex}`),
                labelCol,
                wrapperCol,
                ...itemProps,
              })
            : child,
        ),
      )} */}
    </div>
  );
}

export default connectField<TableFieldProps>(TableField);

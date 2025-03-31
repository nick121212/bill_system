import {
  Children,
  cloneElement,
  isValidElement,
  ReactElement,
  Ref,
} from 'react';
import { Space, List, ListProps } from 'antd';
import { AnyObject } from 'antd/es/_util/type';
import classNames from 'classnames';
import { connectField, FieldProps, filterDOMProps } from 'uniforms';

import ListAddField from './ListAddField';
import ListDelField from './ListDelField';
import wrapField from './wrapField';

export type ListViewFieldProps<T> = FieldProps<
  AnyObject[],
  Omit<ListProps<T>, 'onReset'>,
  { inputRef?: Ref<typeof List>; labelCol?: any; wrapperCol?: any }
>;

function ListViewField<T>(props: ListViewFieldProps<T>) {
  const {
    className,
    error,
    errorMessage,
    label,
    children,
    showInlineError,
    labelCol,
    wrapperCol,
    value,
    ...extraProps
  } = props;

  return wrapField(
    props,
    <div>
      <List
        {...filterDOMProps(props)}
        dataSource={value}
        renderItem={(item, itemIndex) => (
          <List.Item>
            {Children.map(children, (child, childIndex) =>
              isValidElement(child)
                ? cloneElement(child as ReactElement, {
                    key: `${itemIndex}-${childIndex.toString()}`,
                    name: child.props.name?.replace('$', `${itemIndex}`),
                    labelCol,
                    wrapperCol,
                  })
                : child,
            )}
          </List.Item>
        )}
      />
      <ListAddField shape="default" name="$">
        添加
      </ListAddField>
    </div>,
  );
}

export default connectField<ListViewFieldProps<any>>(ListViewField, {
  kind: 'node',
});

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

export type ListViewFieldProps<T> = FieldProps<
  AnyObject[],
  Omit<ListProps<T>, 'onReset'>,
  {
    inputRef?: Ref<typeof List>;
    labelCol?: any;
    wrapperCol?: any;
    addButton?: any;
  }
>;

function ListViewField<T>({
  className,
  error,
  errorMessage,
  label,
  children,
  addButton,
  showInlineError,
  labelCol,
  wrapperCol,
  value,
  ...props
}: ListViewFieldProps<T>) {
  return (
    <div className={classNames([className, 'ant-list', 'ant-list-bordered'])}>
      {!!label && <div>{label}</div>}
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
      {addButton || (
        <ListAddField type="link" shape="default" name="$">
          添加
        </ListAddField>
      )}

      {!!(error && showInlineError) && <div>{errorMessage}</div>}
    </div>
  );
}

export default connectField<ListViewFieldProps<any>>(ListViewField);

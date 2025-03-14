import  {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import {Tooltip} from 'antd';
import classNames from 'classnames';
import { connectField, filterDOMProps, type HTMLFieldProps } from 'uniforms';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';

import ListAddField from './ListAddField';
import ListItemField from './ListItemField';

export type ListFieldProps = HTMLFieldProps<
  unknown[],
  HTMLDivElement,
  {
    addIcon?: ReactNode;
    children?: ReactNode;
    info?: string;
    itemProps?: object;
    labelCol?: any;
    wrapperCol?: any;
  }
>;

const defaultStyle = {
  marginBottom: '5px',
  marginTop: '5px',
  padding: '10px',
};

const errorStyle = { borderColor: 'rgb(255, 85, 0)' };

function List({
  children = <ListItemField name="$" />,
  className,
  error,
  errorMessage,
  info,
  itemProps,
  label,
  labelCol,
  showInlineError,
  style = defaultStyle,
  value,
  wrapperCol,
  ...props
}: ListFieldProps) {
  const wrapperStyle = error
    ? style
      ? { ...errorStyle, ...style }
      : errorStyle
    : style;

  return (
    <div
      {...filterDOMProps(props)}
      style={wrapperStyle}
      className={classNames([className, 'ant-list', 'ant-list-bordered'])}
    >
      {!!label && (
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
      )}

      {!!(error && showInlineError) && <div>{errorMessage}</div>}

      {value?.map((_item, itemIndex) =>
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
      )}

      <ListAddField name="$" />
    </div>
  );
}

export default connectField<ListFieldProps>(List);

import type { HTMLProps } from 'react';
import { type Override, connectField, filterDOMProps } from 'uniforms';

export type ErrorFieldProps = Override<
  Omit<HTMLProps<HTMLDivElement>, 'onChange'>,
  { error?: unknown; errorMessage?: string }
>;

const defaultStyle = {
  backgroundColor: 'rgba(255, 85, 0, 0.2)',
  border: '1px solid rgb(255, 85, 0)',
  borderRadius: '2px',
  margin: '20px 0px',
  padding: '10px',
};

const messageStyle = { margin: '3px' };

function ErrorD({
  children,
  error,
  errorMessage,
  style = defaultStyle,
  ...props
}: ErrorFieldProps) {
  return !error ? null : (
    <div style={style} {...filterDOMProps(props)}>
      {children || <div style={messageStyle}>{errorMessage}</div>}
    </div>
  );
}

export default connectField<ErrorFieldProps>(ErrorD, {
  initialValue: false,
  kind: 'leaf',
});

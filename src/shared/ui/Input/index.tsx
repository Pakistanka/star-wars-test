import { forwardRef, InputHTMLAttributes, ReactElement, ReactNode, useState } from 'react';
import cx from 'clsx';
import { FaEye, FaEyeSlash, FaXmark } from 'react-icons/fa6';

import './Input.scss';
import { Label } from '../Label';
import { Button } from '../Button';
import { Hint } from '../Hint';

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  hintText?: string;
  errorMsg?: string;
  hideError?: boolean;
  small?: boolean;
  disabled?: boolean;
  reserveSpaceForError?: boolean;
  startAdornment?: string | ReactElement;
  endAdornment?: string | ReactElement;
  labelEndAdornment?: ReactNode;
  passwordToggle?: boolean;
  passwordToggleTooltip?: string;
  onClear?: () => void;
}

export const Input = forwardRef<HTMLInputElement, IInputProps>(
  (
    {
      name,
      type,
      label,
      small,
      disabled,
      hintText,
      errorMsg,
      hideError,
      placeholder,
      reserveSpaceForError,
      startAdornment,
      endAdornment,
      labelEndAdornment,
      passwordToggle,
      passwordToggleTooltip,
      required,
      onClear,
      value,
      ...rest
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => setShowPassword((prev) => !prev);
    const shouldShowValidationWrapper = Boolean(reserveSpaceForError || (errorMsg && !hideError) || hintText);
    const placeholderText = `${placeholder}${required ? ' *' : ''}`;
    const iconSize = small ? 14 : 18;

    return (
      <div
        className={cx('ui-input', {
          'ui-input--error': errorMsg,
          'ui-input--disabled': disabled,
        })}
      >
        {label && (
          <Label
            htmlFor={name}
            required={required}
            disabled={disabled}
            isError={!!errorMsg}
            endAdornment={labelEndAdornment}
            className="ui-input__label"
            small={small}
          >
            {label}
          </Label>
        )}
        <div
          className={cx('ui-input__wrapper', {
            'ui-input__wrapper--small': small,
            'ui-input__wrapper--error': errorMsg,
            'ui-input__wrapper--disabled': disabled,
          })}
        >
          {startAdornment && <div className="ui-input__start-adornment">{startAdornment}</div>}
          <input
            ref={ref}
            name={name}
            type={showPassword ? 'text' : type}
            placeholder={placeholderText}
            disabled={disabled}
            value={value}
            {...rest}
          />
          {type === 'password'
            ? (endAdornment || passwordToggle) && (
                <div className="ui-input__end-adornment">
                  {endAdornment}
                  {passwordToggle && (
                    <Button
                      variant="ghost"
                      title={passwordToggleTooltip}
                      icon={showPassword ? <FaEye size={iconSize} /> : <FaEyeSlash size={iconSize} />}
                      onClick={toggleShowPassword}
                    />
                  )}
                </div>
              )
            : (endAdornment || onClear) && (
                <div className="ui-input__end-adornment">
                  {onClear && value && <Button variant="ghost" onClick={onClear} icon={<FaXmark size={16} />} />}
                  {endAdornment}
                </div>
              )}
        </div>
        {shouldShowValidationWrapper && (
          <div className="ui-input__validation-wrapper">
            <div className="ui-input__validation-messages">
              {errorMsg && (
                <Hint className="ui-input__error-msg" variant="error">
                  {errorMsg}
                </Hint>
              )}
              {!errorMsg && hintText && <Hint className="ui-input__hint-text">{hintText}</Hint>}
            </div>
          </div>
        )}
      </div>
    );
  },
);

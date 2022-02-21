import { ChangeEvent, forwardRef, useCallback, useEffect, useRef, useState } from 'react';

export type ValidationStatus = {
  [name: string]: boolean,
};

type InputParams = {
  children: string,
  name: string,
  type: string,
  autoComplete?: 'on' | 'off',
};

type ValidationParams = {
  required?: boolean,
  minLength?: number,
  maxLength?: number,
  customCheck?: (input: HTMLInputElement) => boolean,
  invalidMessage?: string,
  isValidCheck?: boolean,
  onValidCheck?: (status: ValidationStatus) => void,
};

type InputValueReplacer = (value: string)=> string;
type ExtraCallbackParams = {
  onInputBlur?: (evt: ChangeEvent<HTMLInputElement>) => void,
  onChangeValueReplacer?: InputValueReplacer,
  onFocusValueReplacer?: InputValueReplacer,
  onBlurValueReplacer?: InputValueReplacer,
};

type InputProps = InputParams & ValidationParams & ExtraCallbackParams;

const Input = forwardRef<HTMLInputElement, InputProps>((props, forwardedRef) => {
  const [value, setValue] = useState('');
  const [isValid, setIsValid] = useState(true);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const { isValidCheck, onValidCheck, customCheck, minLength, maxLength, invalidMessage } = props;
  const { children, name, type, autoComplete, required } = props;
  const { onInputBlur, onChangeValueReplacer, onFocusValueReplacer, onBlurValueReplacer } = props;

  const errorMessage = invalidMessage || 'Поле обязательно к заполнению';

  const checkValidity = useCallback((input: HTMLInputElement) => {
    const min = (minLength || required) ? (minLength || 1) : 0;
    const isLesserThanMin = input.value.length < min;
    const isGreaterThanMax = maxLength && input.value.length > maxLength;
    const isInputValid = customCheck ? customCheck(input) : !(isLesserThanMin || isGreaterThanMax);

    setIsValid(isInputValid);

    if (onValidCheck) {
      onValidCheck({ [name]: isInputValid });
    }
  }, [required, customCheck, minLength, maxLength, onValidCheck, name]);

  useEffect(() => {
    const ref = forwardedRef || inputRef;

    if (!required || !isValidCheck || typeof (ref) === 'function' || !ref.current) {
      return;
    }

    checkValidity(ref.current);
  }, [required, forwardedRef, inputRef, isValidCheck, checkValidity]);

  const handleInputChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const inputValue = onChangeValueReplacer ? onChangeValueReplacer(input.value) : input.value;
    setValue(inputValue);
  };

  const handleInputFocus = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const label = input.parentElement;

    label?.classList.add('form-label--focused');

    if (onFocusValueReplacer) {
      setValue(onFocusValueReplacer(value));
    }
  };

  const handleInputBlur = (evt: ChangeEvent<HTMLInputElement>) => {
    const input = evt.target;
    const label = evt.target.parentElement;
    const inputValue = onBlurValueReplacer ? onBlurValueReplacer(input.value) : input.value.trim();
    const isInputFilled = Boolean(inputValue);

    if (isInputFilled) {
      label?.classList.add('form-label--filled');
    } else {
      label?.classList.remove('form-label--filled');
    }

    label?.classList.remove('form-label--focused');

    if (onInputBlur) {
      onInputBlur(evt);
    }

    setValue(inputValue);
  };

  return (
    <label className="form-label" htmlFor={name}>
      <span className="form-label__text">{children}</span>
      <input
        className="form-label__input"
        ref={forwardedRef || inputRef}
        id={name}
        name={name}
        type={type}
        value={value}
        autoComplete={autoComplete || 'off'}
        required={required}
        minLength={minLength}
        maxLength={maxLength}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
      {!isValid && (
        <p className="form-label__invalid-text">{`* ${errorMessage}`}</p>
      )}
    </label>
  );
});

export default Input;

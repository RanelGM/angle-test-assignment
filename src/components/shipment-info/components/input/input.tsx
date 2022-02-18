import { ChangeEvent, forwardRef, useState } from 'react';

type InputValueReplacer = (value: string)=> string;

type InputProps = {
  children: string,
  name: string,
  type: string,
  autoComplete?: 'on' | 'off',
  required?: boolean,
  onInputBlur?: (evt: ChangeEvent<HTMLInputElement>) => void,
  onChangeValueReplacer?: InputValueReplacer,
  onFocusValueReplacer?: InputValueReplacer,
  onBlurValueReplacer?: InputValueReplacer,
};

const Input = forwardRef<HTMLInputElement, InputProps>((props, ref) => {
  const [value, setValue] = useState('');
  const { children, name, type, autoComplete, required } = props;
  const { onInputBlur, onChangeValueReplacer, onFocusValueReplacer, onBlurValueReplacer } = props;

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
        id={name}
        name={name}
        type={type}
        ref={ref}
        className="form-label__input"
        autoComplete={autoComplete || 'off'}
        required={required}
        value={value}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </label>
  );
});

export default Input;

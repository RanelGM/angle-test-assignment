import { ChangeEvent, useState } from 'react';

const COUNTRY_CODE = '+7';

function PhoneInput() {
  const [inputValue, setInputValue] = useState('');

  const replaceValueByMask = (value: string) => {
    const matrix = `${COUNTRY_CODE} (___) ___ __ __`;
    const matrixNumericString = matrix.replace(/\D/g, '');
    let inputNumericString = value.replace(/\D/g, '');
    let inputCharCounter = 0;

    if (matrixNumericString.length >= inputNumericString.length) {
      inputNumericString = matrixNumericString;
    }

    const replacer = (matrixChar: string) => {
      const isDigitOrUnderscope = /[_\d]/.test(matrixChar);
      const isCountryCode = isDigitOrUnderscope && inputNumericString.length > inputCharCounter;
      const isNewDigitValue = inputNumericString.length <= inputCharCounter;
      let char = matrixChar;

      switch (true) {
        case isCountryCode:
          char = inputNumericString.charAt(inputCharCounter);
          inputCharCounter += 1;
          return char;
        case isNewDigitValue:
          return '';
        default:
          return matrixChar;
      }
    };

    return matrix.replace(/./g, replacer);
  };

  const handleInputChange = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const value = replaceValueByMask(input.value);
    setInputValue(value);
  };

  const handleInputFocus = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const parent = input.parentElement;

    if (input.value.length < COUNTRY_CODE.length) {
      setInputValue(COUNTRY_CODE);
      parent?.classList.add('phone-input--filled');
    }

    parent?.classList.add('phone-input--focused');
  };

  const handleInputBlur = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
    const parent = input.parentElement;

    if (input.value.length === COUNTRY_CODE.length) {
      setInputValue('');
      parent?.classList.remove('phone-input--filled');
    }

    parent?.classList.remove('phone-input--focused');
  };

  return (
    <label className="phone-input" htmlFor="phone">
      <span className="phone-input__text">Ваш Телефон</span>
      <input
        id="phone"
        className="phone-input__input"
        type="tel"
        autoComplete="off"
        // required
        value={inputValue}
        onChange={handleInputChange}
        onFocus={handleInputFocus}
        onBlur={handleInputBlur}
      />
    </label>
  );
}

export default PhoneInput;

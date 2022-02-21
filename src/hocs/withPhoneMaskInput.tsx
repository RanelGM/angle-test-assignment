import { ComponentType } from 'react';

const COUNTRY_CODE = '+7';
const MATRIX = `${COUNTRY_CODE} (___) ___ __ __`;

function withPhoneMaskInput<T>(Component: ComponentType<T>) {
  function WithPhoneMaskInput(props: T) {
    const invalidMessage = `Введите в формате: ${COUNTRY_CODE} (123) 456 78 90`;

    const replaceValueByMask = (value: string) => {
      const matrixNumericString = MATRIX.replace(/\D/g, '');
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

      return MATRIX.replace(/./g, replacer);
    };

    const replaceValueOnFocus = (value: string) => {
      if (value.length < COUNTRY_CODE.length) {
        return COUNTRY_CODE;
      }

      return value;
    };

    const replaceValueOnBlur = (value: string) => {
      if (value.length === COUNTRY_CODE.length) {
        return '';
      }

      return value;
    };

    return (
      <Component
        {...props}
        minLength={MATRIX.length}
        invalidMessage={invalidMessage}
        onChangeValueReplacer={replaceValueByMask}
        onFocusValueReplacer={replaceValueOnFocus}
        onBlurValueReplacer={replaceValueOnBlur}
      />
    );
  }

  return WithPhoneMaskInput;
}

export default withPhoneMaskInput;

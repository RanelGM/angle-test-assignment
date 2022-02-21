import { ComponentType } from 'react';

function withEmailValidationInput<T>(Component: ComponentType<T>) {
  function WithEmailValidationInput(props: T) {
    const invalidMessage = 'Введите в формате example@email.com';

    const checkValidity = (input: HTMLInputElement) => {
      const pattern = /[a-zA-Zа-яёА-ЯЁ0-9]{1}([a-zA-Zа-яёА-ЯЁ0-9\-_.]{1,})?@[a-zA-Zа-яёА-ЯЁ0-9-]{1}([a-zA-Zа-яёА-ЯЁ0-9.-]{1,})?[a-zA-Zа-яёА-ЯЁ0-9-]{1}\.[a-zA-Zа-яёА-ЯЁ]{2,6}/;
      const emailRegex = new RegExp(pattern, '');
      return emailRegex.test(input.value);
    };

    return (
      <Component
        {...props}
        customCheck={checkValidity}
        invalidMessage={invalidMessage}
      />
    );
  }

  return WithEmailValidationInput;
}

export default withEmailValidationInput;

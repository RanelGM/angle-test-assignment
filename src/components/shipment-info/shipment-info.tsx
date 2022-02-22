import { FormEvent, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

import withEmailValidationInput from 'hocs/withEmailValidationInput';
import withPhoneMaskInput from 'hocs/withPhoneMaskInput';
import withMapConnectedInput from 'hocs/withMapConnectedInput';
import { getProducts } from 'store/selectors';
import Map from 'components/map/map';
import { CustomSelect, Input, ProductList } from './components/components';
import { ValidationStatus } from './components/input/input';

const WithEmailValidationInput = withEmailValidationInput(Input);
const WithPhoneMaskInput = withPhoneMaskInput(Input);
const WithMapConnectedInput = withMapConnectedInput(Input);

function ShipmentInfo(): JSX.Element {
  const [isValidationCheck, setIsValidationCheck] = useState(false);
  const [isFormSubmitting, setIsFormSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement | null>(null);
  const validationStatus = useRef<ValidationStatus | null>(null);
  const products = useSelector(getProducts);
  const isButtonShow = Boolean(products?.length);

  const submitForm = () => {
    setIsFormSubmitting(false);
    const statuses = validationStatus.current ? Object.values(validationStatus.current) : [false];
    const isInputsValid = statuses.every((status) => status);

    if (!isInputsValid || !formRef.current) {
      return;
    }

    const formData = new FormData(formRef.current);
    const inputsData = Object.fromEntries(formData);
    const isCoords = Boolean(inputsData.coords);

    if (!isCoords || !products) {
      return;
    }

    const cartData = products.map((product) => {
      const { id, name, price, amount } = product;

      return ({
        id,
        name,
        price,
        amount,
      });
    });

    const resultData = { ...inputsData, cart: cartData };
    const jsonData = JSON.stringify(resultData);

    // eslint-disable-next-line no-alert
    alert(jsonData);
    // eslint-disable-next-line no-console
    console.log(jsonData);
  };

  useEffect(() => {
    if (!isFormSubmitting || isValidationCheck) {
      return;
    }

    submitForm();
  });

  const handleFormSubmit = (evt: FormEvent) => {
    evt.preventDefault();
    setIsFormSubmitting(true);
    setIsValidationCheck(true);
  };

  const onValidationCheck = (status: ValidationStatus) => {
    setIsValidationCheck(false);

    const [key, value] = Object.entries(status)[0];

    validationStatus.current = {
      ...validationStatus.current,
      [key]: value,
    };
  };

  return (
    <section className="shipment-info">
      <h1 className="main-heading">Корзина</h1>

      <div className="shipment-info__login">
        <p className="shipment-info__text">Есть аккаунт?</p>
        <a className="shipment-info__link" href="#work-in-progress">
          Войти
        </a>
      </div>

      <form
        className="shipment-info__form shipment-form"
        ref={formRef}
        onSubmit={handleFormSubmit}
        noValidate
      >
        <WithMapConnectedInput
          name="address"
          type="text"
          required
          isValidCheck={isValidationCheck}
          onValidCheck={onValidationCheck}
        >
          Адрес
        </WithMapConnectedInput>

        <Map />

        <div className="shipment-form__half-wrapper">
          <Input
            name="name"
            type="text"
            required
            isValidCheck={isValidationCheck}
            onValidCheck={onValidationCheck}
          >
            Ваше имя
          </Input>

          <WithPhoneMaskInput
            name="phone"
            type="tel"
            required
            isValidCheck={isValidationCheck}
            onValidCheck={onValidationCheck}
          >
            Ваш Телефон
          </WithPhoneMaskInput>
        </div>

        <WithEmailValidationInput
          name="email"
          type="email"
          required
          isValidCheck={isValidationCheck}
          onValidCheck={onValidationCheck}
        >
          Ваш Email
        </WithEmailValidationInput>

        <CustomSelect
          isValidCheck={isValidationCheck}
          onValidCheck={onValidationCheck}
        />

        <Input name="comment" type="text">Введите комментарий</Input>

        <ProductList />

        {isButtonShow && (
        <button className="shipment-form__button-submit" type="submit">
          Купить
        </button>
        )}

      </form>
    </section>
  );
}

export default ShipmentInfo;

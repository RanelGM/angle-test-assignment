import withPhoneMaskInput from 'hocs/withPhoneMaskInput';
import withMapConnectedInput from 'hocs/withMapConnectedInput';
import Map from 'components/map/map';
import { useSelector } from 'react-redux';
import { getProducts } from 'store/selectors';
import { CustomSelect, Input, ProductList } from './components/components';

const WithPhoneMaskInput = withPhoneMaskInput(Input);
const WithMapConnectedInput = withMapConnectedInput(Input);

function ShipmentInfo(): JSX.Element {
  const products = useSelector(getProducts);
  const isButtonShow = Boolean(products);

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
      >
        <WithMapConnectedInput name="address" type="text">Адрес</WithMapConnectedInput>
        <Map />

        <div className="shipment-form__half-wrapper">
          <Input name="name" type="text">Ваше имя</Input>
          <WithPhoneMaskInput name="phone" type="tel">Ваш Телефон</WithPhoneMaskInput>
        </div>

        <Input name="email" type="email">Ваш Email</Input>
        <CustomSelect />
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

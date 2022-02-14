import { useState } from 'react';
import { HeaderNavGroup } from 'utils/const';

const navLinks = Object.values(HeaderNavGroup);

function Header(): JSX.Element {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const onMenuBtnClick = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header__control-wrapper control-wrapper">
        <button
          className={`control-wrapper__nav-button nav-button ${isMenuOpen ? 'nav-button--open' : ''}`}
          type="button"
          onClick={onMenuBtnClick}
        >
          <span className="visually-hidden">Переключение отображения меню</span>
          <span className="nav-button__menu" />
        </button>

        <form className="control-wrapper__search-form search-form">
          <button className="search-form__button button" type="submit">
            <span className="visually-hidden">Начать поиск</span>
            <img
              className="control-wrapper__icon control-wrapper__icon--search"
              src="assets/img/icon-search.svg"
              alt="Начать поиск"
              width={27}
              height={27}
            />
            <img
              className="control-wrapper__icon control-wrapper__icon--320vp"
              src="assets/img/icon-search-320vp.svg"
              alt="Начать поиск"
              width={24}
              height={24}
            />
          </button>
          <label className="search-form__label" htmlFor="search">
            <span className="visually-hidden">Поиск</span>

            <input
              id="search"
              className="search-form__input"
              type="search"
              placeholder="Поиск"
            />
          </label>
        </form>

        <img
          className="control-wrapper__logo"
          src="assets/img/logo.svg"
          alt="Логотип компании"
          width={160}
          height={50}
        />

        <ul className="control-wrapper__list">
          <li className="control-wrapper__item control-wrapper__item--profile">
            <a className="control-wrapper__link" href="#work-in-progress">
              <span className="visually-hidden">
                Переход на страницу профиля
              </span>
              <img
                className="control-wrapper__icon"
                src="assets/img/icon-profile.svg"
                alt="Переход на страницу профиля"
                width={24}
                height={27}
              />
            </a>
          </li>
          <li className="control-wrapper__item control-wrapper__item">
            <a className="control-wrapper__link" href="#work-in-progress">
              <span className="visually-hidden">
                Переход на страницу избранного
              </span>
              <img
                className="control-wrapper__icon control-wrapper__icon--favorite"
                src="assets/img/icon-favorite.svg"
                alt="Переход на страницу избранного"
                width={30}
                height={27}
              />
              <img
                className="control-wrapper__icon control-wrapper__icon--320vp"
                src="assets/img/icon-favorite-320vp.svg"
                alt="Переход на страницу избранного"
                width={26}
                height={24}
              />
            </a>
          </li>
          <li className="control-wrapper__item">
            <a className="control-wrapper__link" href="#work-in-progress">
              <span className="visually-hidden">
                Переход на страницу корзины
              </span>
              <img
                className="control-wrapper__icon control-wrapper__icon--cart"
                src="assets/img/icon-cart.svg"
                alt="Переход на страницу корзины"
                width={32}
                height={30}
              />
              <img
                className="control-wrapper__icon control-wrapper__icon--320vp"
                src="assets/img/icon-cart-320vp.svg"
                alt="Переход на страницу корзины"
                width={32}
                height={27}
              />
              <span className="control-wrapper__cart-count">4</span>
            </a>
          </li>
        </ul>
      </div>

      <nav className={`nav-list ${isMenuOpen ? 'nav-list--open' : ''}`}>
        <ul className="nav-list__list">
          {navLinks.map((link) => (
            <li className="nav-list__item" key={link.label}>
              <a className="nav-list__link" href={link.ref}>
                {link.label}
                <span className="visually-hidden">
                  Ссылка на
                  {' '}
                  {link.label}
                </span>
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;

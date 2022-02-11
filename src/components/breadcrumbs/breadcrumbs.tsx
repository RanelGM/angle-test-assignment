function Breadcrumbs(): JSX.Element {
  return (
    <section className="breadcrumbs">
      <h2 className="visually-hidden">Навигация: хлебные крошки</h2>
      <ul className="breadcrumbs__list">
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="#work-in-progress">
            Главная
          </a>
        </li>
        <li className="breadcrumbs__item">
          <a className="breadcrumbs__link" href="#work-in-progress">
            Корзина
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Breadcrumbs;

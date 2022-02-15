function LoadError() {
  return (
    <div className="load-error">
      <p className="load-error__text">Возникла ошибка при загрузке списка товаров</p>
      <p className="load-error__text">Попробуйте позднее</p>
    </div>
  );
}

export default LoadError;

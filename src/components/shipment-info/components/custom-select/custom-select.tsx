import { PackageTypeGroup } from "utils/const";

const options = Object.values(PackageTypeGroup);

function CustomSelect(): JSX.Element {
  return (
    <div className="custom-select" data-select="custom-select">
      <span className="custom-select__placeholder">Тип упаковки</span>
      <span className="custom-select__error">Выберите тип упаковки</span>
      <button className="custom-select__button" type="button">
        <span className="visually-hidden">Выбрать тип упаковки</span>
        <span className="custom-select__icon" />
      </button>
      <ul className="custom-select__list" role="listbox">
        {options.map((option) => (
          <li
            className="custom-select__item"
            tabIndex={0}
            key={`key-${option.value}`}
            data-select-value={`id-${option.value}`}
            aria-selected="false"
            role="option"
          >
            {option.label}
          </li>
        ))}

        <select className="custom-select__select">
          {options.map((option) => (
            <option key={`key-${option.value}`} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </ul>
    </div>
  );
}

export default CustomSelect;

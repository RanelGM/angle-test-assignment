import { FocusEvent, KeyboardEvent as ReactKeyboardEvent, MouseEvent as ReactMouseEvent, useEffect, useState } from 'react';
import { PackageLabel } from 'types/product';
import { PackageGroup } from 'utils/const';

type ValidationStatus = {
  [name: string]: boolean,
};

type CustomSelectProps = {
  isValidCheck?: boolean,
  onValidCheck?: (status: ValidationStatus) => void,
};

const options = Object.values(PackageGroup);

const getValueFromLabel = (label: PackageLabel | null) => {
  if (label === null) {
    return undefined;
  }

  const option = options.find((item) => item.label === label);
  const value = option ? option.value : option;
  return value;
};

function CustomSelect({ isValidCheck, onValidCheck }: CustomSelectProps): JSX.Element {
  const [isValid, setIsValid] = useState(true);
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedLabel, setSelectedLabel] = useState<PackageLabel | null>(null);
  const isOptionSelected = selectedLabel !== null;
  const selectedValue = getValueFromLabel(selectedLabel);

  const checkValidity = () => {
    const isSelectValid = Boolean(selectedLabel);
    setIsValid(isSelectValid);

    if (onValidCheck) {
      onValidCheck({ 'custom-select': isSelectValid });
    }
  };

  useEffect(() => {
    if (!isValidCheck) {
      return;
    }

    checkValidity();
  });

  const handleDocumentClick = (evt: MouseEvent) => {
    const target = evt.target as HTMLElement;
    const isCustomSelectElement = target.closest('.custom-select');

    if (!isCustomSelectElement) {
      setIsSelectOpen(false);
    }
  };

  const handleEscKeydown = (evt: KeyboardEvent) => {
    if (evt.key === 'Escape' && isSelectOpen) {
      setIsSelectOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleDocumentClick);
    document.addEventListener('keydown', handleEscKeydown);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
      document.removeEventListener('keydown', handleEscKeydown);
    };
  });

  const handleButtonMouseDown = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleButtonFocus = () => {
    setIsSelectOpen(true);
  };

  const handleButtonBlur = (evt: FocusEvent) => {
    const isSelectItem = evt.relatedTarget?.closest('.custom-select__item');

    if (!isSelectItem) {
      setIsSelectOpen(false);
    }
  };

  const handleSelectClick = (evt: ReactMouseEvent) => {
    const itemElement = evt.target as HTMLLIElement;
    const option = itemElement.getAttribute(
      'data-select-label',
    ) as typeof selectedLabel;

    if (!option) {
      return;
    }

    setSelectedLabel(option);
    setIsSelectOpen(false);

    if (!isValid) {
      setIsValid(true);
    }
  };

  const handleSelectKeydown = (evt: ReactKeyboardEvent) => {
    const itemElement = evt.target as HTMLLIElement;
    const isEnterKeydown = evt.key === 'Enter';
    const isTabKeydown = evt.key === 'Tab';
    const isTabReturn = evt.shiftKey && evt.key === 'Tab';

    const option = itemElement.getAttribute(
      'data-select-label',
    ) as typeof selectedLabel;

    if (!option || (!isEnterKeydown && !isTabKeydown)) {
      return;
    }

    if (isEnterKeydown) {
      setSelectedLabel(option);
      setIsSelectOpen(false);
      setIsValid(true);
      return;
    }

    const isFirstOption = options.slice(0, 1).shift()?.label === option;
    const isLastOption = options.slice(-1).pop()?.label === option;

    if ((isFirstOption && isTabReturn) || (isLastOption && !isTabReturn)) {
      setIsSelectOpen(false);
    }
  };

  return (
    <div
      className={`custom-select ${isSelectOpen ? 'custom-select--opened' : ''
      } ${isOptionSelected ? 'custom-select--selected' : ''
      } ${isValid ? '' : 'custom-select--error'}`}
      data-select="custom-select"
    >
      <button
        className="custom-select__button"
        type="button"
        onMouseDown={handleButtonMouseDown}
        onFocus={handleButtonFocus}
        onBlur={handleButtonBlur}
      >
        <span className="custom-select__placeholder">?????? ????????????????</span>
        <span className="custom-select__icon" />
        <span className="custom-select__text">{selectedLabel}</span>
      </button>
      <ul className="custom-select__list" role="listbox">
        {options.map((option) => {
          const isSelected = option.label === selectedLabel;

          return (
            <li
              className={`custom-select__item ${isSelected ? 'custom-select__item--selected' : ''}`}
              tabIndex={0}
              key={`key-${option.value}`}
              data-select-label={option.label}
              aria-selected={isSelected}
              role="option"
              onClick={handleSelectClick}
              onKeyDown={handleSelectKeydown}
            >
              {option.label}
            </li>
          );
        })}
      </ul>

      <select
        className="custom-select__select visually-hidden"
        name="package-type"
        value={selectedValue}
      >
        {options.map((option) => (
          <option key={`key-${option.value}`} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {!isValid && (
        <p className="custom-select__invalid-text">* ???????????????? ?????? ????????????????</p>
      )}
    </div>
  );
}

export default CustomSelect;

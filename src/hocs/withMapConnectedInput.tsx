import { ChangeEvent, ComponentType, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkActionDispatch } from 'types/store';
import { setAddress, setIsMarkUpdateRequired } from 'store/action';
import { getAddress } from 'store/selectors';

function withMapConnectedInput <T>(Component: ComponentType<T>) {
  function WithMapConnectedInput(props: T) {
    const address = useSelector(getAddress);
    const dispatch = useDispatch<ThunkActionDispatch>();
    const addressRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      if (!address || !addressRef.current || address === addressRef.current.value) {
        return;
      }

      addressRef.current.value = address;
      addressRef.current.parentElement?.classList.add('form-label--filled');
    });

    const onInputBlur = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
      const value = input.value.trim();
      const isInputFilled = Boolean(value);

      if (!isInputFilled) {
        return;
      }

      dispatch(setAddress(value));
      dispatch(setIsMarkUpdateRequired(true));
    };

    return (
      <Component
        {...props}
        ref={addressRef}
        onInputBlur={onInputBlur}
      />
    );
  }

  return WithMapConnectedInput;
}

export default withMapConnectedInput;

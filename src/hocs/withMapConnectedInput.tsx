import { ChangeEvent, ComponentType } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { ThunkActionDispatch } from 'types/store';
import { setAddress, setIsMarkUpdateRequired } from 'store/action';
import { getAddress } from 'store/selectors';

function withMapConnectedInput <T>(Component: ComponentType<T>) {
  function WithMapConnectedInput(props: T) {
    const address = useSelector(getAddress);
    const dispatch = useDispatch<ThunkActionDispatch>();

    const onInputBlur = ({ target: input }: ChangeEvent<HTMLInputElement>) => {
      const value = input.value.trim();

      dispatch(setAddress(value));
      dispatch(setIsMarkUpdateRequired(true));
    };

    return (
      <Component
        {...props}
        forwardValue={address}
        onInputBlur={onInputBlur}
      />
    );
  }

  return WithMapConnectedInput;
}

export default withMapConnectedInput;

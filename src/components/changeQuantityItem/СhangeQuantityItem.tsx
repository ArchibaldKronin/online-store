import { FC } from 'react';
import Button from '../button/Button';

const СhangeQuantityItem: FC<{
  children: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
  isLoading: boolean;
  disablePlusBtn?: boolean;
  disableMinusBtn?: boolean;
}> = ({
  children,
  onClickPlus,
  onClickMinus,
  isLoading = false,
  disablePlusBtn = false,
  disableMinusBtn = false,
}) => {
  return (
    <>
      <Button onClick={onClickMinus} disabled={isLoading || disableMinusBtn}>
        -
      </Button>
      {children}
      <Button onClick={onClickPlus} disabled={isLoading || disablePlusBtn}>
        +
      </Button>
    </>
  );
};

export default СhangeQuantityItem;

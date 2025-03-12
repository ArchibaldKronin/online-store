import { FC } from 'react';
import Button from '../button/Button';

const СhangeQuantityItem: FC<{
  children: number;
  onClickPlus: () => void;
  onClickMinus: () => void;
  isLoading: boolean;
}> = ({ children, onClickPlus, onClickMinus, isLoading }) => {
  return (
    <>
      <Button onClick={onClickMinus} isActive={!isLoading}>
        -
      </Button>
      {children}
      <Button onClick={onClickPlus} isActive={!isLoading}>
        +
      </Button>
    </>
  );
};

export default СhangeQuantityItem;

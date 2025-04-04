import { FC } from 'react';
import Button from '../button/Button';
import classNames from 'classnames';
import styles from './ChangeQuantityItem.module.scss';

const ChangeQuantityItem: FC<{
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
    <div className={classNames(styles.container)}>
      <Button
        ariaLabel="Уменьшить количество в корзине"
        onClick={onClickMinus}
        disabled={isLoading || disableMinusBtn}
      >
        -
      </Button>
      <span className={classNames(styles.quantity)}>{children}</span>
      <Button
        ariaLabel="Увеличить количество в корзине"
        onClick={onClickPlus}
        disabled={isLoading || disablePlusBtn}
      >
        +
      </Button>
    </div>
  );
};

export default ChangeQuantityItem;

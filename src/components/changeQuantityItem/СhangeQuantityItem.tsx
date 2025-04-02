import { FC } from 'react';
import Button from '../button/Button';
import classNames from 'classnames';
import styles from './СhangeQuantityItem.module.scss';

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
    <div className={classNames(styles.container)}>
      <Button onClick={onClickMinus} disabled={isLoading || disableMinusBtn}>
        -
      </Button>
      <span className={classNames(styles.quantity)}>{children}</span>
      <Button onClick={onClickPlus} disabled={isLoading || disablePlusBtn}>
        +
      </Button>
    </div>
  );
};

export default СhangeQuantityItem;

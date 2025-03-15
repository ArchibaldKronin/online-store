import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      // className={classNames(styles.greenBg)}
    >
      {children}
    </button>
  );
};

export default Button;

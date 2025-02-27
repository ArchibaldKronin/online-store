import { FC, ReactNode } from 'react';
import styles from './Button.module.scss';
import classNames from 'classnames';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
};

const Button: FC<ButtonProps> = ({ children, onClick }) => {
  return (
    <button onClick={onClick} className={classNames(styles.greenBg)}>
      {children}
    </button>
  );
};

export default Button;

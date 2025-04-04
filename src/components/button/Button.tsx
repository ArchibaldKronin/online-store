import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  ariaLabel?: string | undefined;
};

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false, ariaLabel }) => {
  return (
    <button aria-label={ariaLabel} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

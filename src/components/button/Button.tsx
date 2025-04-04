import { FC, ReactNode } from 'react';

type ButtonProps = {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
};

const Button: FC<ButtonProps> = ({ children, onClick, disabled = false }) => {
  return (
    <button onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

export default Button;

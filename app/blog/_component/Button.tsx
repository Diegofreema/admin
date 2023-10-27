import { cn } from '@/lib/utils';
import React, { FC, MouseEventHandler, ReactNode, useCallback } from 'react';

interface Props {
  children: ReactNode;
  active?: boolean;
  disabled?: boolean;
  onMouseDown?: MouseEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}

const Button: FC<Props> = ({
  children,
  active,
  disabled,
  onMouseDown,
  onClick,
}): JSX.Element => {
  const getActiveStyle = useCallback((): string => {
    if (active) return 'bg-black text-white ';
    else return 'text-white bg-gray-400';
  }, [active]);

  const commonClasses =
    'p-2 rounded text-lg hover:scale-110 hover:shadow-md transition ';

  return (
    <button
      type="button"
      onMouseDown={onMouseDown}
      onClick={onClick}
      className={cn(commonClasses, getActiveStyle())}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;

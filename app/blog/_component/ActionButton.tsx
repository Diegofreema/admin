'use client';
import { cn } from '@/lib/utils';
import { IconLoader2 } from '@tabler/icons-react';
import { FC, MouseEventHandler } from 'react';

interface Props {
  title: string;
  busy?: boolean;
  disabled?: boolean;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  blog?: boolean;
}

const ActionButton: FC<Props> = ({
  disabled,
  busy = false,
  title,
  onClick,
  blog = false,
}): JSX.Element => {
  return (
    <button
      className={cn(
        'text-white bg-blue-600 px-6 py-2 font-semibold hover:scale-[0.97] duration-100 rounded  flex items-center justify-center space-x-2 transition',
        blog ? 'w-[300px]' : 'w-full'
      )}
      onClick={onClick}
      disabled={disabled}
    >
      <span>{title}</span>
      {busy && <IconLoader2 className="animate-spin" size={20} />}
    </button>
  );
};

export default ActionButton;

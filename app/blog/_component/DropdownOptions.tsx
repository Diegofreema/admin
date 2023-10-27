'use client';
import { FC, ReactNode, useState } from 'react';

interface Props {
  options: { label: string; onClick(): void }[];
  head: ReactNode;
}

const DropdownOptions: FC<Props> = ({ head, options }): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <button
      onBlur={() => setShowOptions(false)}
      onMouseDown={() => setShowOptions(!showOptions)}
      className="relative text-black"
    >
      {head}
      {showOptions && (
        <div className="min-w-max absolute top-full mt-4 right-2 z-10 border-2 border-primary-dark dark:border-primary rounded text-left ">
          <ul className="p-2 bg-purple-900">
            {options.map(({ label, onClick }, i) => (
              <li className="text-white" key={i} onMouseDown={onClick}>
                {label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </button>
  );
};

export default DropdownOptions;

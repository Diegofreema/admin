'use client';
import { validateUrl } from '@/utils/utils';
import { FC, useEffect, useState } from 'react';

interface Props {
  visible?: boolean;
  initialState?: linkOptions;
  onSubmit(link: linkOptions): void;
  onRemove?(): void;
}
export type linkOptions = {
  url: string;
  openInNewTab: boolean;
};
const LinkForm: FC<Props> = ({
  visible,
  initialState,
  onRemove,
  onSubmit,
}): JSX.Element | null => {
  const [link, setLink] = useState<linkOptions>({
    url: '',
    openInNewTab: false,
  });
  const handleLink = () => {
    onSubmit({ ...link, url: validateUrl(link.url) });
    setLink({ url: '', openInNewTab: false });
  };

  // useEffect(() => {
  //   if (initialState) {
  //     setLink({ ...initialState });
  //   }
  // }, [initialState]);

  if (!visible) return null;

  return (
    <div className="rounded text-left   transition z-50  shadow-md p-2">
      <div className="flex items-center space-x-2">
        <input
          autoFocus
          type="text"
          className="rounded bg-transparent focus:ring-0 focus:border-primary-dark dark:focus:border-primary transition dark:text-primary text-primary-dark"
          placeholder="https://example.com"
          value={link.url}
          onChange={({ target }) => setLink({ ...link, url: target.value })}
        />
      </div>

      <div className="mt-2 flex items-center space-x-1 text-sm select-none text-secondary-dark dark:text-secondary-light">
        <input
          type="checkbox"
          id="checkbox"
          className="focus:ring-0 rounded-sm w-3 h-3 outline-none"
          checked={link.openInNewTab}
          onChange={({ target }) =>
            setLink({ ...link, openInNewTab: target.checked })
          }
        />
        <label htmlFor="checkbox">open in new tab</label>

        <div className="text-right flex-1">
          <button
            onClick={handleLink}
            className="bg-purple-900 text-white text-sm px-2 py-1 rounded"
          >
            Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LinkForm;

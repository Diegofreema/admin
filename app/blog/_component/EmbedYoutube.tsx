'use client';
import { IconLink } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import { FC, useState } from 'react';
import Button from './Button';
import { IconBrandYoutube } from '@tabler/icons-react';

interface Props {
  onSubmit(link: string): void;
}

const EmbedYoutube: FC<Props> = ({ onSubmit }): JSX.Element | null => {
  const [visible, setVisible] = useState(false);
  const [link, setLink] = useState('');

  const handleSubmit = () => {
    if (!link.trim()) return setVisible(false);
    onSubmit(link);
    setVisible(false);
    setLink('');
  };

  return (
    <div
      onKeyDown={({ key }) => {
        if (key === 'Escape') {
          setVisible(false);
        }
      }}
      className="relative"
    >
      <Button onClick={() => setVisible((prevState) => !prevState)}>
        <IconBrandYoutube />
      </Button>
      {visible && (
        <div className="absolute top-full mt-4 right-0 z-50">
          <div className="flex items-center space-x-2">
            <input
              autoFocus
              type="text"
              className="rounded bg-transparent focus:ring-0 focus:border-primary-dark dark:focus:border-primary transition dark:text-primary text-primary-dark"
              placeholder="https://youtube.com"
              value={link}
              onChange={({ target }) => setLink(target.value)}
            />
            <button
              onClick={handleSubmit}
              className="bg-purple-900 text-white text-sm p-2 py-1 rounded"
            >
              Embed
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default EmbedYoutube;

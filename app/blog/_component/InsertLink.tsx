'use client';
import { IconLink } from '@tabler/icons-react';
import { Editor } from '@tiptap/react';
import { FC, useState } from 'react';
import Button from './Button';
import LinkForm, { linkOptions } from './LinkForm';

interface Props {
  onSubmit(link: linkOptions): void;
}

const InsertLink: FC<Props> = ({ onSubmit }): JSX.Element | null => {
  const [visible, setVisible] = useState(false);

  const handleSubmit = (link: linkOptions) => {
    if (!link.url) return setVisible(false);
    onSubmit(link);
    setVisible(false);
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
        <IconLink />
      </Button>
      <div className="absolute top-full mt-4 right-0 z-50">
        <LinkForm visible={visible} onSubmit={handleSubmit} />
      </div>
    </div>
  );
};

export default InsertLink;

'use client';
import Image from 'next/image';
import { FC } from 'react';
import CheckMark from './CheckMark';

interface Props {
  src: string;
  selected?: boolean;
  onClick?: () => void;
}

const ImageComponent: FC<Props> = ({ src, onClick, selected }): JSX.Element => {
  return (
    <div
      onClick={onClick}
      className="rounded relative overflow-hidden cursor-pointer"
    >
      <Image
        src={src}
        width={200}
        height={200}
        alt="gallery"
        className="bg-white hover:scale-110 transition object-cover"
      />
      <div className="absolute top-2 left-2">
        <CheckMark visible={selected || false} />
      </div>
    </div>
  );
};

export default ImageComponent;

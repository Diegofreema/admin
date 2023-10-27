import { images } from '@/utils/utils';
import Image from 'next/image';
import { FC } from 'react';
import ImageComponent from './ImageComponent';
import { ImageIcon } from 'lucide-react';

interface Props {
  images: { src: string }[];
  onSelected: (src: string) => void;
  uploading?: boolean;
  selectedImage?: string;
}

const Gallery: FC<Props> = ({
  images,
  onSelected,
  uploading = false,
  selectedImage = '',
}): JSX.Element => {
  return (
    <div className="flex flex-wrap">
      {uploading && (
        <div className="basis-1/4 p-2 aspect-square flex flex-col animate-pulse items-center justify-center bg-white text-black rounded">
          <ImageIcon />
          <p>Uploading</p>
        </div>
      )}
      {images.map(({ src }, i) => (
        <div key={i} className="basis-1/4 p-2">
          <ImageComponent
            key={i}
            src={src}
            selected={selectedImage === src}
            onClick={() => onSelected(src)}
          />
        </div>
      ))}
    </div>
  );
};

export default Gallery;

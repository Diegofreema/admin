'use client';
import { ChangeEventHandler, FC, useState } from 'react';
import ModalContainer, { ModalProps } from './ModalContainer';

import UploadComponent from '@/components/Upload';
import ActionButton from './ActionButton';
export interface ImageResult {
  src: string;
}
interface Props extends ModalProps {
  onImageSelect: (image: File) => void;
  onSelection: (result: ImageResult) => void;
}

const GalleryModal: FC<Props> = ({
  onClose,
  visible,
  onImageSelect,
  onSelection,
}): JSX.Element => {
  const [selectedImage, setSelectedImage] = useState<any>('');

  // const handleOnImageChange: ChangeEventHandler<HTMLInputElement> = ({
  //   target,
  // }) => {
  //   const { files } = target;
  //   if (!files) {
  //     return;
  //   }

  //   const file = files[0];
  //   if (!file.type.startsWith('image')) {
  //     return onClose && onClose();
  //   }

  //   onImageSelect(file);
  // };
  const handleSelection = () => {
    if (!selectedImage) {
      return onClose && onClose();
    }
    onSelection({ src: selectedImage });
    onClose && onClose();
  };

  return (
    <ModalContainer visible={visible} onClose={onClose}>
      <div className="max-w-4xl p-2 bg-yellow-400  rounded flex space-y-4 flex-col-reverse ">
        {selectedImage.trim() !== '' && (
          <ActionButton onClick={handleSelection} title="Select" />
        )}

        <UploadComponent
          endpoint="blogImage"
          onChange={(url) => setSelectedImage(url)}
          value={selectedImage}
          blog
        />
      </div>
    </ModalContainer>
  );
};

export default GalleryModal;

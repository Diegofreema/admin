import { IconCheck } from '@tabler/icons-react';
import { FC } from 'react';

interface Props {
  visible: boolean;
}

const CheckMark: FC<Props> = ({ visible }): JSX.Element | null => {
  if (!visible) return null;
  return (
    <div className="bg-blue-600 p-2 text-white rounded-full">
      <IconCheck />
    </div>
  );
};

export default CheckMark;

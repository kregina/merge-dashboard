import { Item } from '@/services/board';
import { FC } from 'react';

interface BoardItemEditProps {
  item: Item | null;
}

export const BoardItemEdit: FC<BoardItemEditProps> = ({ item }) => {
  return <div>edit</div>;
};

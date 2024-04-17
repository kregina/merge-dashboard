import { Item } from '@/services/board';
import { FC } from 'react';

interface BoardItemAddProps {
  item: Item | null;
}

export const BoardItemAdd: FC<BoardItemAddProps> = ({ item }) => {
  return <div>add</div>;
};

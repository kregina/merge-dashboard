import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { PlusSquare } from 'lucide-react';
import { FC } from 'react';
import { BoardItemBadge } from './BoardItemBadge';
import { BoardItemImage } from './BoardItemImage';

interface BoardItemProps {
  item: Item;
  onClick: () => void;
}

export const BoardItem: FC<BoardItemProps> = ({ item, onClick }) => {
  return (
    <div className="h-full w-full " onClick={onClick}>
      {item.itemType ? (
        <>
          <BoardItemBadge
            pausedUntil={item.pausedUntil}
            itemLevel={item.itemLevel}
          />
          <BoardItemImage item={item} />
        </>
      ) : (
        <div
          className={cn(
            'flex justify-center items-center text-zinc-800 w-full h-full',
          )}
        >
          <PlusSquare size={32} />
        </div>
      )}
    </div>
  );
};

import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { PlusSquare } from 'lucide-react';
import { FC } from 'react';
import { BoardItemBadge } from './BoardItemBadge';
import { BoardItemImage } from './BoardItemImage';

interface BoardItemProps {
  item: Item;
}

export const BoardItem: FC<BoardItemProps> = ({ item }) => {
  // const isActive = activeChainId === item?.chainId;

  return (
    <>
      {item.itemType ? (
        <>
          <BoardItemBadge
            pausedUntil={item.pausedUntil}
            itemLevel={item.itemLevel}
          />
          <BoardItemImage
            icon={item.icon || ''}
            chainId={item.chainId}
            isInsideBubble={item.isInsideBubble}
          />
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
    </>
  );
};

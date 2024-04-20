import { Dialog, DialogContent, DialogTrigger } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { motion } from 'framer-motion';
import { PlusSquare } from 'lucide-react';
import { FC, useMemo } from 'react';
import { BoardItemAdd } from './BoardItemAdd';
import { BoardItemBadge } from './BoardItemBadge';
import { BoardItemEdit } from './BoardItemEdit';
import { BoardItemImage } from './BoardItemImage';
import { useBoardItem } from './useBoardItem';

interface BoardItemProps {
  item: Item;
  index: number;
  activeChainId: string | null;
  setDragStartIndex: (index: number) => void;
  setActiveChainId: (chainId: string | null) => void;
  handleDrop: (dropIndex: number) => void;
}

export const BoardItem: FC<BoardItemProps> = ({
  item,
  index,
  activeChainId,
  setDragStartIndex,
  setActiveChainId,
  handleDrop,
}) => {
  const {
    hoveredId,
    handleOnDragOver,
    handleOnDragLeave,
    onHandleOnDrop,
    handleOnDragStart,
  } = useBoardItem({
    chainId: item?.chainId || null,
    setDragStartIndex,
    setActiveChainId,
    handleDrop,
    index,
  });

  const isActive = activeChainId === item?.chainId;
  const isHovered = hoveredId === item?.chainId;

  const itemClasses = useMemo(
    () =>
      cn(
        'rounded cursor-grab transition-colors duration-100 ease-in-out relative overflow-hidden',
        isActive && 'bg-emerald-600 dark:bg-emerald-800',
        isHovered && 'bg-orange-500 dark:bg-orange-700',
      ),
    [isActive, isHovered],
  );

  return (
    <div className="col-span-1 p-1 even:bg-[#e4dccc] odd:bg-[#cec6af] rounded lg:w-[90px]">
      <Dialog>
        <motion.div
          draggable={!!item?.itemType}
          layout
          onDragStart={handleOnDragStart}
          onDragOver={(e) => handleOnDragOver(e, item.chainId)}
          onDragLeave={handleOnDragLeave}
          onDrop={onHandleOnDrop}
          className={itemClasses}
        >
          <DialogTrigger>
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
              <div className={cn('flex justify-center')}>
                <PlusSquare size={32} />
              </div>
            )}
          </DialogTrigger>
        </motion.div>

        <DialogContent>
          {item.itemType ? (
            <BoardItemEdit item={item} />
          ) : (
            <BoardItemAdd index={index} />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

import { Button } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services';
import { motion } from 'framer-motion';
import { PlusSquare } from 'lucide-react';
import { FC, useMemo } from 'react';
import { BoardItemBadge } from './BoardItemBadge';
import { BoardItemImage } from './BoardItemImage';
import { BoardItemSelected } from './BoardItemSelected';
import { useBoardItem } from './useBoardItem';

interface BoardItemProps {
  item: Item | null;
  index: number;
  activeChainId: string | null;
  setDragStartIndex: (index: number) => void;
  setActiveChainId: (chainId: string | null) => void;
  handleDrop: (dropIndex: number) => void;
  handleClick: (card: Item) => void;
  selected: Item | null;
  lastSelected: Item | null;
}

export const BoardItem: FC<BoardItemProps> = ({
  item,
  index,
  activeChainId,
  setActiveChainId,
  setDragStartIndex,
  handleDrop,
  handleClick,
  selected,
  lastSelected,
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
  const isSelected = selected?.itemId === item?.itemId;
  const isLastSelected = lastSelected?.itemId === item?.itemId;

  const itemClasses = useMemo(
    () =>
      cn(
        'rounded cursor-grab transition-colors duration-100 ease-in-out relative overflow-hidden',
        isActive && 'bg-emerald-600 dark:bg-emerald-800',
        isHovered && 'bg-orange-500 dark:bg-orange-700',
        isSelected
          ? 'rounded-lg cursor-default absolute inset-0 h-full lg:max-h-[40%] w-full md:w-[40%] m-auto z-50 flex justify-center items-center flex-wrap flex-col'
          : 'rounded-xl h-full w-full',
        isLastSelected && 'z-40',
      ),
    [isActive, isHovered, isSelected, isLastSelected],
  );

  return (
    <div className="col-span-1 p-1 even:bg-[#e4dccc] odd:bg-[#cec6af] rounded max-w-[80px]">
      <motion.div
        draggable={!!item?.itemType}
        layout
        onClick={() => handleClick(item as Item)}
        onDragStart={handleOnDragStart}
        onDragOver={(e) => item && handleOnDragOver(e, item.chainId)}
        onDragLeave={handleOnDragLeave}
        onDrop={onHandleOnDrop}
        className={itemClasses}
      >
        {item?.itemType ? (
          <div className="relative">
            {!isSelected && (
              <BoardItemBadge
                pausedUntil={item?.pausedUntil}
                itemLevel={item?.itemLevel}
              />
            )}

            <BoardItemImage
              icon={item.icon}
              isSelected={isSelected}
              chainId={item.chainId}
              isInsideBubble={item.isInsideBubble}
            />
          </div>
        ) : (
          <Button
            variant="ghost"
            className={cn(
              !isSelected
                ? 'w-full h-full bg-transparent text-background text-zinc-800'
                : '',
            )}
          >
            <PlusSquare size={32} />
          </Button>
        )}
        {isSelected && <BoardItemSelected item={selected} index={index} />}
      </motion.div>
    </div>
  );
};

import { generateItemClasses } from '@/lib/generateItemClasses';
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
  handleClick: (card: Item) => void;
  selected: Item | null;
  lastSelected: Item | null;
}

export const BoardItem: FC<BoardItemProps> = ({
  item,
  index,
  activeChainId,
  setDragStartIndex,
  setActiveChainId,
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
    () => generateItemClasses(isActive, isHovered, isSelected, isLastSelected),
    [hoveredId, activeChainId, selected, lastSelected],
  );

  return (
    <div className="col-span-1 p-1 even:bg-[#e4dccc] odd:bg-[#cec6af] rounded max-w-[80px]">
      <motion.div
        draggable={!!item?.itemType}
        layout
        onClick={() => handleClick(item)}
        onDragStart={handleOnDragStart}
        onDragOver={(e) => handleOnDragOver(e, item.chainId)}
        onDragLeave={handleOnDragLeave}
        onDrop={onHandleOnDrop}
        className={itemClasses}
      >
        {item.itemType ? (
          <div className="relative">
            {!isSelected && (
              <BoardItemBadge
                pausedUntil={item.pausedUntil}
                itemLevel={item.itemLevel}
              />
            )}
            <BoardItemImage
              icon={item.icon || ''}
              isSelected={isSelected}
              chainId={item.chainId}
              isInsideBubble={item.isInsideBubble}
            />
          </div>
        ) : (
          <div
            className={cn(
              'flex justify-center',
              !isSelected
                ? ` items-center w-full h-full bg-transparent
                    text-background text-zinc-800 hover:opacity-45 transition-opacity duration-300`
                : '',
            )}
          >
            <PlusSquare size={32} />
          </div>
        )}

        {isSelected &&
          (item.itemType ? (
            <BoardItemEdit item={item} />
          ) : (
            <BoardItemAdd index={index} />
          ))}
      </motion.div>
    </div>
  );
};

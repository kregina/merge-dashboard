import { Badge, Button } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services/board';
import { motion } from 'framer-motion';
import { PlusSquare } from 'lucide-react';
import { FC } from 'react';
import { BoardSelectedItem } from './BoardSelectedItem';
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

export const BoardItem: FC<BoardItemProps> = (props) => {
  const {
    item,
    index,
    activeChainId,
    setActiveChainId,
    setDragStartIndex,
    handleDrop,
    handleClick,
    selected,
    lastSelected,
  } = props;

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

  // Class management
  const isActive = activeChainId === item?.chainId;
  const isHovered = hoveredId === item?.chainId;
  const isSelected = selected?.itemId === item?.itemId;
  const isLastSelected = lastSelected?.itemId === item?.itemId;

  const itemClasses = cn(
    'rounded cursor-grab bg-background transition-colors duration-100 ease-in-out border relative overflow-hidden drop-shadow',
    isActive ? 'bg-emerald-600 dark:bg-emerald-800' : '',
    isHovered ? 'bg-orange-500 dark:bg-orange-700' : '',
    isSelected
      ? `rounded-lg cursor-default absolute inset-0 h-1/2 w-full 
        md:w-1/2 m-auto z-50 flex justify-center items-center flex-wrap flex-col`
      : isLastSelected
        ? 'z-40 rounded-xl h-full w-full'
        : 'rounded-xl h-full w-full',
  );

  return (
    <div className="col-span-1">
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
        {item?.icon ? (
          <div className="flex flex-col p-2">
            <div className="m-auto mt-2 bg-background relative">
              <Badge className="bg-teal-600 dark:bg-teal-300 absolute -right-4 -top-2">
                {item?.itemLevel}
              </Badge>
              <img
                width={36}
                className="mx-4"
                src={`src/assets/images/board-icons/${item?.icon}`}
                alt={`${item?.chainId} Icon`}
              />
            </div>
            <small className="inline-block truncate text-center">
              {item?.chainId}
            </small>
          </div>
        ) : (
          <Button
            variant="ghost"
            className={cn(!isSelected ? 'w-full h-full bg-secondary' : '')}
          >
            <PlusSquare size={24} />
          </Button>
        )}
        {isSelected && <BoardSelectedItem item={selected} />}
      </motion.div>
    </div>
  );
};

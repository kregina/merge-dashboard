import { Badge, Button } from '@/components';
import { cn } from '@/lib/utils';
import { Item, ItemVisibility } from '@/services';
import { motion } from 'framer-motion';
import { Eye, EyeOff, PlusSquare } from 'lucide-react';
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
      ? `rounded-lg cursor-default absolute inset-0 h-full lg:max-h-[40%] w-full 
        md:w-[40%] m-auto z-50 flex justify-center items-center flex-wrap flex-col`
      : isLastSelected
        ? 'z-40 rounded-xl h-full w-full'
        : 'rounded-xl h-full w-full',
  );

  return (
    <div className="col-span-1 p-1">
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
          <div
            className={cn(
              'flex flex-col p-2',
              `${!isSelected ? 'h-full justify-between' : 'lg:pl-8'}`,
            )}
          >
            <div className="relative">
              {!isSelected && (
                <div className="absolute flex flex-col gap-1 right-0 items-center w-auto">
                  <Badge className="bg-teal-600 dark:bg-teal-300 size-4 p-0 justify-center">
                    {item?.itemLevel}
                  </Badge>
                  <span className="text-orange-500">
                    {item.visibility === ItemVisibility.VISIBLE ? (
                      <Eye />
                    ) : (
                      <EyeOff />
                    )}
                  </span>
                </div>
              )}

              <img
                width={`${isSelected ? '64' : '36'}`}
                className="m-auto"
                src={`src/assets/images/board-icons/${item?.icon}`}
                alt={`${item?.chainId} Icon`}
              />
            </div>

            {!isSelected && (
              <small className="inline-block truncate text-center max-w-[7rem]">
                {item?.chainId}
              </small>
            )}
          </div>
        ) : (
          <Button
            variant="ghost"
            className={cn(!isSelected ? 'w-full h-full bg-secondary' : '')}
          >
            <PlusSquare size={24} />
          </Button>
        )}
        {isSelected && <BoardSelectedItem item={selected} index={index} />}
      </motion.div>
    </div>
  );
};

import { Badge } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services/board';
import { motion } from 'framer-motion';
import { FC } from 'react';
import { BoardItemAdd } from './BoardItemAdd';
import { useBoardItem } from './useBoardItem';

interface BoardItemProps {
  item: Item | null;
  index: number;
  activeChainId: string | null;
  setDragStartIndex: (index: number) => void;
  setActiveChainId: (chainId: string | null) => void;
  handleDrop: (dropIndex: number) => void;
}

export const BoardItem: FC<BoardItemProps> = (props) => {
  const {
    item,
    index,
    activeChainId,
    setActiveChainId,
    setDragStartIndex,
    handleDrop,
  } = props;

  const {
    hoveredId,
    handleOnDragOver,
    handleOnDragLeave,
    onHandleOnDrop,
    defaultClassName,
    handleOnDragStart,
  } = useBoardItem({
    chainId: item?.chainId || null,
    setDragStartIndex,
    setActiveChainId,
    handleDrop,
    index,
  });

  if (!item?.itemType) {
    return (
      <BoardItemAdd
        index={index}
        hoveredId={hoveredId}
        handleOnDragOver={handleOnDragOver}
        handleOnDragLeave={handleOnDragLeave}
        onHandleOnDrop={onHandleOnDrop}
        defaultClassName={defaultClassName}
      />
    );
  }

  return (
    <motion.div
      draggable
      layout
      onDragStart={handleOnDragStart}
      onDragOver={(e) => handleOnDragOver(e, item.chainId)}
      onDragLeave={handleOnDragLeave}
      onDrop={onHandleOnDrop}
      className={cn(
        defaultClassName,
        `${activeChainId === item.chainId ? 'bg-emerald-600 dark:bg-emerald-800' : ''}`,
        `${hoveredId === item.chainId ? 'bg-orange-500 dark:bg-orange-700' : ''}`,
      )}
      whileTap={{
        scale: 1.12,
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
      }}
      whileHover={{
        scale: 1.12,
        boxShadow: '0px 5px 5px rgba(249,115,22,0.1)',
      }}
    >
      <div className="flex flex-col p-2 relative">
        <Badge className="bg-teal-600 dark:bg-teal-300 absolute right-2">
          {item.itemLevel}
        </Badge>

        <img
          className="m-auto mt-2"
          width={36}
          src={`src/assets/images/board-icons/${item?.icon}`}
          alt={`${item?.chainId} Icon`}
        />
        <small className="inline-block truncate text-center">
          {item?.chainId}
        </small>
      </div>
    </motion.div>
  );
};

import { cn } from '@/lib/utils';
import { Item } from '@/services/board';
import { motion } from 'framer-motion';
import { FC } from 'react';

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

  const handleDragStart = (index: number, chainId: string | null) => {
    setDragStartIndex(index);
    setActiveChainId(chainId);
  };

  return (
    <motion.div
      draggable={!!item?.itemType}
      layout={!!item?.itemType}
      onDragStart={() => handleDragStart(index, item?.chainId || null)}
      onDragOver={(e) => {
        e.preventDefault();
        setActiveChainId(item?.chainId || null);
      }}
      onDrop={() => handleDrop(index)}
      className={cn(
        'p-4 rounded cursor-grab',
        'bg-orange-300 dark:bg-orange-900',
        `${item?.itemType ? 'cursor-grab' : 'opacity-40'}`,
        `${activeChainId === item?.chainId ? 'bg-emerald-600 dark:bg-emerald-800' : ''}`,
      )}
      whileTap={{
        scale: 1.12,
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
      }}
    >
      <p className="truncate">{item?.itemType}</p>
    </motion.div>
  );
};

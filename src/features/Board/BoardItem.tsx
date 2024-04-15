import { Button } from '@/components';
import { cn } from '@/lib/utils';
import { Item } from '@/services/board';
import { motion } from 'framer-motion';
import { PlusSquare } from 'lucide-react';
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

  if (!item?.itemType) {
    return (
      <motion.div
        layout
        onDragOver={(e) => {
          e.preventDefault();
        }}
        onDrop={() => handleDrop(index)}
        className="py-2 rounded opacity-40"
      >
        <Button variant="ghost">
          <PlusSquare size={24} />
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div
      draggable
      layout
      onDragStart={() => handleDragStart(index, item?.chainId || null)}
      onDragOver={(e) => {
        e.preventDefault();
        setActiveChainId(item?.chainId || null);
      }}
      onDrop={() => handleDrop(index)}
      className={cn(
        'p-4 rounded cursor-grab',
        'bg-orange-300 dark:bg-orange-900',
        `${activeChainId === item?.chainId ? 'bg-emerald-600 dark:bg-emerald-800' : ''}`,
      )}
      whileTap={{
        scale: 1.12,
        boxShadow: '0px 5px 5px rgba(0,0,0,0.1)',
      }}
    >
      <p className="">{item?.itemType}</p>
    </motion.div>
  );
};
